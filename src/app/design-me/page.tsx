"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { HiArrowRight, HiArrowDownTray, HiBars3, HiOutlineXMark, HiShare } from "react-icons/hi2";
import { FaInstagram } from "react-icons/fa";
import Footer from "@/components/Footer";
import { posthog } from "@/posthog";

// Simple markdown-like formatting for personalized descriptions
function formatDescription(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />');
}

// Extract Instagram username from URL or clean up input
function extractInstagramUsername(input: string): string {
  const trimmed = input.trim();
  
  // Handle URLs like https://instagram.com/username or https://www.instagram.com/username/
  const urlMatch = trimmed.match(/(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9._]+)\/?/);
  if (urlMatch) {
    return urlMatch[1];
  }
  
  // Remove @ prefix if present
  return trimmed.replace(/^@/, '');
}
import { Transition } from "@headlessui/react";

import Container from "@/components/Container";
import { siteDetails } from "@/data/siteDetails";

// API URL matches ui-components/src/api/api.ts pattern
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const IMAGE_BASE = "https://storage.googleapis.com/plain-public/web/img";

// Showcase example
const SHOWCASE_EXAMPLE = {
  src: `${IMAGE_BASE}/use_case_edit_materials_2.webp`,
  label: "Warm Contemporary",
  message: "Your feed is full of earthy tones and natural textures. I designed a space with warm wood accents and cozy textiles that mirrors your aesthetic.",
};

interface AestheticSummary {
  colors: string[];
  style: string;
  mood: string;
}

interface DesignResult {
  visualization_url: string;
  description: string;
  aesthetic_summary: AestheticSummary;
}

type LoadingStep = {
  label: string;
  duration: number; // in ms
};

const LOADING_STEPS: LoadingStep[] = [
  { label: "Finding your Instagram posts...", duration: 10000 },
  { label: "Analyzing your unique aesthetic...", duration: 10000 },
  { label: "Crafting your personalized design...", duration: 15000 },
];

const DesignMePage: React.FC = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<DesignResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startLoadingSteps = () => {
    let stepIndex = 0;
    setCurrentStep(0);

    const advanceStep = () => {
      stepIndex++;
      if (stepIndex < LOADING_STEPS.length) {
        setCurrentStep(stepIndex);
        stepTimerRef.current = setTimeout(advanceStep, LOADING_STEPS[stepIndex].duration);
      }
    };

    stepTimerRef.current = setTimeout(advanceStep, LOADING_STEPS[0].duration);
  };

  const stopLoadingSteps = () => {
    if (stepTimerRef.current) {
      clearTimeout(stepTimerRef.current);
      stepTimerRef.current = null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Extract username from URL or clean input
    const instagramUsername = extractInstagramUsername(input);
    if (!instagramUsername) return;

    // Track PostHog event
    if (posthog.__loaded) {
      posthog.capture("DESIGN_ME_SUBMIT", {
        instagram_handle: instagramUsername,
        raw_input: input,
      });
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    startLoadingSteps();

    try {
      // Get PostHog distinct_id to propagate analytics identity to backend
      const analyticsId = posthog.__loaded ? posthog.get_distinct_id() : undefined;

      const response = await fetch(`${API_URL}/furnisher/v1/public/design-me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instagram_handle: instagramUsername,
          analytics_id: analyticsId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          visualization_url: data.visualization_url,
          description: data.description,
          aesthetic_summary: data.aesthetic_summary,
        });
        // Track success
        if (posthog.__loaded) {
          posthog.capture("DESIGN_ME_SUCCESS", {
            instagram_handle: instagramUsername,
            style: data.aesthetic_summary?.style,
          });
        }
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        // Track failure
        if (posthog.__loaded) {
          posthog.capture("DESIGN_ME_ERROR", {
            instagram_handle: instagramUsername,
            error: data.error,
          });
        }
      }
    } catch (err) {
      console.error("API error:", err);
      setError("Could not connect to the server. Please try again.");
      // Track network error
      if (posthog.__loaded) {
        posthog.capture("DESIGN_ME_ERROR", {
          instagram_handle: instagramUsername,
          error: "network_error",
        });
      }
    } finally {
      setIsLoading(false);
      stopLoadingSteps();
    }
  };

  const handleDownload = async () => {
    if (!result?.visualization_url) return;

    try {
      const response = await fetch(result.visualization_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my-design.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      // Fallback: open in new tab
      window.open(result.visualization_url, "_blank");
    }
  };

  const handleShareInstagram = async () => {
    if (!result?.visualization_url) return;

    // Try native share API first (works on mobile)
    if (navigator.share) {
      try {
        const response = await fetch(result.visualization_url);
        const blob = await response.blob();
        const file = new File([blob], "my-design.png", { type: "image/png" });
        
        await navigator.share({
          title: "My AI-designed room",
          text: "AI designed this room based on my aesthetic! ✨ Try it at therenderai.com/design-me",
          files: [file],
        });
        return;
      } catch (err) {
        console.log("Native share failed, falling back");
      }
    }

    // Fallback: download image and copy caption
    await handleDownload();
    const caption = "AI designed this room based on my aesthetic! ✨\n\nTry it yourself: therenderai.com/design-me";
    try {
      await navigator.clipboard.writeText(caption);
      alert("Image downloaded! Caption copied to clipboard - paste it when sharing to Instagram.");
    } catch {
      alert("Image downloaded! Share it to Instagram with: " + caption);
    }
  };

  const progressPercent = isLoading
    ? Math.min(((currentStep + 1) / LOADING_STEPS.length) * 100, 95)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header - matching main landing header style */}
      <header className="bg-transparent fixed top-0 left-0 right-0 md:absolute z-50 mx-auto w-full">
        <Container className="!px-0">
          <nav className="shadow-md md:shadow-none bg-white md:bg-transparent mx-auto flex justify-between items-center py-2 px-5 md:py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="w-8 h-8" />
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center space-x-4">
              <li>
                <Link
                  href="mailto:hello@plain-service.com"
                  className="text-foreground border border-foreground hover:bg-foreground hover:text-white px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  Contact us
                </Link>
              </li>
              <li>
                <Link
                  href={siteDetails.appUrl}
                  className="text-foreground bg-primary hover:bg-primary-accent px-8 py-3 rounded-full font-semibold transition-colors"
                >
                  Start designing
                </Link>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="bg-primary text-foreground focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
              >
                {mobileMenuOpen ? (
                  <HiOutlineXMark className="h-6 w-6" />
                ) : (
                  <HiBars3 className="h-6 w-6" />
                )}
              </button>
            </div>
          </nav>
        </Container>

        {/* Mobile Menu */}
        <Transition
          show={mobileMenuOpen}
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="md:hidden bg-white shadow-lg">
            <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
              <li>
                <Link
                  href={siteDetails.appUrl}
                  className="text-foreground bg-primary hover:bg-primary-accent px-5 py-3 rounded-full block w-fit font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start designing
                </Link>
              </li>
            </ul>
          </div>
        </Transition>
      </header>

      {/* Main Content */}
      <main className="pt-16 md:pt-24 pb-16">
        <Container className="max-w-2xl">
          {/* Hero Section - compact */}
          <div className="text-center mt-4 md:mt-8 mb-5">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-2">
              Your Instagram, <span className="text-primary">Your Room</span>
            </h1>
            <p className="text-foreground-accent text-base max-w-md mx-auto">
              We analyze your aesthetic and design a room that matches your vibe.
            </p>
          </div>

          {/* Showcase Example */}
          {!result && !isLoading && (
            <div className="mb-5 mx-auto" style={{ maxWidth: "700px" }}>
              <div className="relative rounded-xl overflow-hidden aspect-[16/10] shadow-md">
                <img
                  src={SHOWCASE_EXAMPLE.src}
                  alt={SHOWCASE_EXAMPLE.label}
                  className="w-full h-full object-cover"
                />
                {/* Overlay with message */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="text-primary-light text-xs font-semibold uppercase tracking-wider">
                    {SHOWCASE_EXAMPLE.label}
                  </span>
                  <p className="text-white text-xs md:text-sm mt-0.5 leading-snug">
                    &ldquo;{SHOWCASE_EXAMPLE.message}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Result Display */}
          {result && (
            <div className="mb-10 animate-fade-in mx-auto" style={{ maxWidth: "800px" }}>
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6">
                <img
                  src={result.visualization_url}
                  alt="Your personalized room design"
                  className="w-full h-auto"
                />
                
                {/* Aesthetic Badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                  <span className="font-medium">{result.aesthetic_summary.style}</span>
                </div>
              </div>

              {/* Personalized Description */}
              <div className="bg-card-background rounded-xl p-5 shadow-sm border border-border-color mb-6 mx-auto" style={{ maxWidth: "800px" }}>
                <div 
                  className="text-foreground text-sm md:text-base leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatDescription(result.description) }}
                />
                
                {/* Style tags */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-foreground-accent">Your style:</span>
                  {result.aesthetic_summary.colors.map((color, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-hero-background rounded-full text-xs text-foreground-accent"
                    >
                      {color}
                    </span>
                  ))}
                  <span className="px-2.5 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium">
                    {result.aesthetic_summary.style}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-white rounded-full font-semibold hover:bg-foreground/90 transition-colors"
                >
                  <HiArrowDownTray className="w-5 h-5" />
                  Download
                </button>
                <button
                  onClick={handleShareInstagram}
                  className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-foreground text-foreground rounded-full font-semibold hover:bg-foreground hover:text-white transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                  Share
                </button>
              </div>

              {/* CTA */}
              <div className="mt-10 text-center">
                <p className="text-foreground-accent mb-4">
                  Love it? Create unlimited designs with full control.
                </p>
                <Link
                  href={siteDetails.appUrl}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-accent text-foreground rounded-full font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  Start designing for free
                  <HiArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="mb-10 animate-fade-in">
              <div className="bg-card-background rounded-2xl p-8 shadow-sm border border-border-color">
                {/* Progress bar */}
                <div className="h-2 bg-hero-background rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full bg-primary transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Current step */}
                <div className="text-center">
                  <p className="text-foreground font-medium text-lg mb-2">
                    {LOADING_STEPS[currentStep]?.label || "Processing..."}
                  </p>
                  <p className="text-foreground-accent text-sm">
                    Creating your personalized design (~30 seconds)
                  </p>
                </div>

                {/* Step indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {LOADING_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i <= currentStep ? "bg-primary" : "bg-border-color"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Input Form */}
          {!result && !isLoading && (
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Main Input */}
              <div className="relative mx-auto" style={{ maxWidth: "800px" }}>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-accent">
                  <FaInstagram className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="username or instagram.com/username"
                  className="w-full pl-12 pr-32 py-3 text-base rounded-full border-2 border-border-color focus:border-primary focus:outline-none transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !extractInstagramUsername(input)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-primary hover:bg-primary-accent text-foreground rounded-full font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Get Design
                </button>
              </div>

              {/* Hint */}
              <p className="text-center text-foreground-accent text-xs">
                Works with public profiles only
              </p>
            </form>
          )}

          {/* Bottom CTA (always visible when no result) */}
          {!result && !isLoading && (
            <div className="mt-8 text-center border-t border-border-color pt-6">
              <p className="text-foreground-accent text-sm mb-3">
                Want full control? Design rooms with your own photos.
              </p>
              <Link
                href={siteDetails.appUrl}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-foreground hover:bg-foreground/90 text-white rounded-full font-semibold text-sm transition-colors"
              >
                Try the full app
                <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </Container>
      </main>

      {/* Footer - reuse main landing footer */}
      <Footer />
    </div>
  );
};

export default DesignMePage;

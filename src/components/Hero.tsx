import React from "react";
import Link from "next/link";

import BeforeAfterSlider from "./BeforeAfterSlider";
import { heroDetails } from "@/data/hero";

const IMAGE_BASE = "https://storage.googleapis.com/plain-public/web/img";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center pb-0 pt-24 md:pt-28 px-5"
    >
      {/* Background pattern */}
      <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
        <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute left-0 right-0 bottom-0 backdrop-blur-[2px] h-40 bg-gradient-to-b from-transparent via-[rgba(250,248,245,0.5)] to-[rgba(250,248,245,0.8)]"></div>

      {/* Content */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
          {heroDetails.heading}
        </h1>
        <p className="mt-3 text-foreground-accent text-base md:text-lg max-w-xl mx-auto">
          {heroDetails.subheading}
        </p>

        {/* CTA Button */}
        <div className="mt-5">
          <Link
            href={heroDetails.ctaUrl}
            className="inline-block px-8 py-3 bg-primary hover:bg-primary-accent text-foreground font-semibold rounded-full transition-colors shadow-lg hover:shadow-xl"
          >
            {heroDetails.ctaText}
          </Link>
        </div>

        {/* Before/After Slider */}
        <div className="mt-8 md:mt-12 relative z-10 w-full max-w-4xl mx-auto">
          <BeforeAfterSlider
            beforeImage={`${IMAGE_BASE}/main_1.webp`}
            afterImage={`${IMAGE_BASE}/main_2.webp`}
            beforeLabel="Before"
            afterLabel="After"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

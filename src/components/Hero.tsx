import React from "react";
import Link from "next/link";

import BeforeAfterCarousel from "./BeforeAfterCarousel";
import { heroDetails } from "@/data/hero";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center pb-0 pt-32 md:pt-40 px-5"
    >
      {/* Background pattern */}
      <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
        <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute left-0 right-0 bottom-0 backdrop-blur-[2px] h-40 bg-gradient-to-b from-transparent via-[rgba(250,248,245,0.5)] to-[rgba(250,248,245,0.8)]"></div>

      {/* Content */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-tight">
          {heroDetails.heading}
        </h1>
        <p className="mt-6 text-foreground-accent text-lg md:text-xl max-w-2xl mx-auto">
          {heroDetails.subheading}
        </p>

        {/* Credibility badge */}
        <p className="mt-3 text-sm text-foreground-accent/70">
          Created by Interior Design industry professionals
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <Link
            href={heroDetails.ctaUrl}
            className="inline-block px-10 py-4 bg-primary hover:bg-primary-accent text-foreground font-semibold text-lg rounded-full transition-colors shadow-lg hover:shadow-xl"
          >
            {heroDetails.ctaText}
          </Link>
        </div>

        {/* Before/After Carousel */}
        <div className="mt-12 md:mt-16 relative z-10">
          <BeforeAfterCarousel images={[]} />
        </div>
      </div>
    </section>
  );
};

export default Hero;

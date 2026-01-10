"use client";

import React, { useState } from "react";
import { useCases } from "@/data/benefits";
import BeforeAfterSlider from "./BeforeAfterSlider";

const UseCases: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeUseCase = useCases[activeIndex];

  return (
    <section id="use-cases" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
        You can do anything:
      </h2>
      <p className="text-foreground-accent text-center mb-8 max-w-2xl mx-auto">
        Drag the slider to see the transformation
      </p>

      {/* Mobile: Horizontal scrollable pills */}
      <div className="lg:hidden mb-6 -mx-5 px-5 overflow-x-auto">
        <div className="flex gap-2 pb-2 min-w-max">
          {useCases.map((useCase, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeIndex === index
                  ? "bg-primary text-foreground"
                  : "bg-white border border-border-color text-foreground-accent"
              }`}
            >
              {useCase.title}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: Image and description */}
      <div className="lg:hidden">
        <BeforeAfterSlider
          beforeImage={activeUseCase.imageSrc}
          afterImage={activeUseCase.afterImageSrc || ""}
          beforeLabel="Before"
          afterLabel="After"
        />
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold text-foreground">
            {activeUseCase.title}
          </h3>
          <p className="text-foreground-accent mt-1 text-sm">
            {activeUseCase.description}
          </p>
        </div>
      </div>

      {/* Desktop: Two column layout */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_300px] gap-8 items-start">
        {/* Before/After Slider with description */}
        <div>
          <BeforeAfterSlider
            beforeImage={activeUseCase.imageSrc}
            afterImage={activeUseCase.afterImageSrc || ""}
            beforeLabel="Before"
            afterLabel="After"
          />
          <div className="mt-4">
            <h3 className="text-xl font-bold text-foreground">
              {activeUseCase.title}
            </h3>
            <p className="text-foreground-accent mt-1">
              {activeUseCase.description}
            </p>
          </div>
        </div>

        {/* Use Case List - single column */}
        <div className="flex flex-col gap-2">
          {useCases.map((useCase, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                activeIndex === index
                  ? "bg-primary/15 border-l-4 border-primary"
                  : "bg-white border-l-4 border-transparent hover:bg-primary/5 hover:border-primary/30"
              }`}
            >
              <span
                className={`font-medium ${
                  activeIndex === index
                    ? "text-foreground"
                    : "text-foreground-accent"
                }`}
              >
                {useCase.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;

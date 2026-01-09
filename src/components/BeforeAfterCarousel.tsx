"use client";

import React, { useState, useEffect } from "react";

interface BeforeAfterImage {
  before: string;
  after: string;
  prompt?: string;
}

interface BeforeAfterCarouselProps {
  images: BeforeAfterImage[];
  autoPlayInterval?: number;
}

// TODO: Replace with more before/after images
const placeholderImages: BeforeAfterImage[] = [
  {
    before: "https://storage.googleapis.com/plain-public/web/img/before.jpg",
    after: "https://storage.googleapis.com/plain-public/web/img/after_2.JPG",
    prompt: "Modern minimalist kitchen with white marble countertops",
  },
];

const BeforeAfterCarousel: React.FC<BeforeAfterCarouselProps> = ({
  images,
  autoPlayInterval = 5000,
}) => {
  // Use placeholder images if empty array provided
  const displayImages =
    images && images.length > 0 ? images : placeholderImages;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAfter((prev) => {
        if (prev) {
          // After showing "after", move to next image
          setCurrentIndex((idx) => (idx + 1) % displayImages.length);
        }
        return !prev;
      });
    }, autoPlayInterval / 2);

    return () => clearInterval(interval);
  }, [displayImages.length, autoPlayInterval]);

  const currentImage = displayImages[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main carousel container */}
      <div className="relative aspect-[16/10] bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Placeholder when no images */}
        {!currentImage.before && !currentImage.after ? (
          <div className="absolute inset-0 flex items-center justify-center text-white/60">
            <div className="text-center">
              <p className="text-xl font-medium mb-2">Before/After + Prompt</p>
              <p className="text-sm">TODO: Add visualization images</p>
            </div>
          </div>
        ) : (
          <>
            {/* Before image */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${
                showAfter ? "opacity-0" : "opacity-100"
              }`}
            >
              {currentImage.before && (
                <img
                  src={currentImage.before}
                  alt="Before"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* After image */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${
                showAfter ? "opacity-100" : "opacity-0"
              }`}
            >
              {currentImage.after && (
                <img
                  src={currentImage.after}
                  alt="After"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </>
        )}

        {/* Before/After indicator */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium">
          {showAfter ? "After" : "Before"}
        </div>
      </div>

      {/* Prompt display */}
      {currentImage.prompt && (
        <div className="mt-4 text-center">
          <p className="text-foreground-accent italic">
            &quot;{currentImage.prompt}&quot;
          </p>
        </div>
      )}

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {displayImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setShowAfter(false);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BeforeAfterCarousel;

"use client";

import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
  objectPosition?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  aspectRatio = "4/3",
  objectPosition = "center center",
}) => {
  const hasImages = beforeImage && afterImage;

  if (!hasImages) {
    return (
      <div
        className="relative w-full overflow-hidden rounded-xl bg-gray-800 flex items-center justify-center text-white/40"
        style={{ aspectRatio }}
      >
        <span className="text-sm">TODO: Add before/after images</span>
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{ aspectRatio }}
    >
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={beforeImage}
            alt={beforeLabel}
            style={{ objectPosition }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={afterImage}
            alt={afterLabel}
            style={{ objectPosition }}
          />
        }
        position={50}
        className="w-full h-full"
      />
      {/* Labels */}
      <span className="absolute top-3 left-3 px-2 py-1 bg-black/60 rounded text-white text-xs font-medium pointer-events-none z-10">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 px-2 py-1 bg-black/60 rounded text-white text-xs font-medium pointer-events-none z-10">
        {afterLabel}
      </span>
    </div>
  );
};

export default BeforeAfterSlider;

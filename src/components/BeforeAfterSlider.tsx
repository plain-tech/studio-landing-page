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
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}) => {
  const hasImages = beforeImage && afterImage;

  if (!hasImages) {
    return (
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-gray-800 flex items-center justify-center text-white/40">
        <span className="text-sm">TODO: Add before/after images</span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl">
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage src={beforeImage} alt={beforeLabel} />
        }
        itemTwo={<ReactCompareSliderImage src={afterImage} alt={afterLabel} />}
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

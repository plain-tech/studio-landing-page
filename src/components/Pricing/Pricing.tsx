"use client";

import { useState } from "react";
import PricingColumn from "./PricingColumn";
import { tiers } from "@/data/pricing";

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="w-full">
      {/* Billing toggle */}
      <div className="flex flex-col items-center mb-8">
        <div className="inline-flex items-center bg-background-dark rounded-full p-1 mb-4">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              !isYearly
                ? "bg-white text-foreground"
                : "text-white/70 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              isYearly
                ? "bg-white text-foreground"
                : "text-white/70 hover:text-white"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tiers.map((tier) => (
          <PricingColumn key={tier.name} tier={tier} isYearly={isYearly} />
        ))}
      </div>

      {/* Yearly savings note */}
      {isYearly && (
        <p className="text-center mt-6 text-primary font-medium">
          Save 20% with yearly billing
        </p>
      )}
    </div>
  );
};

export default Pricing;

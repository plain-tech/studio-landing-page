"use client";

import { useState } from "react";
import PricingColumn from "./PricingColumn";
import { tiers, creditInfo } from "@/data/pricing";
import { FiInfo } from "react-icons/fi";

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

        {/* Credit info notice */}
        <div className="flex items-center gap-2 text-foreground-accent text-sm">
          <FiInfo className="w-4 h-4" />
          <span>
            Unused credits never expire as long as your subscription stays
            active
          </span>
        </div>
      </div>

      {/* Credit system explanation */}
      <div className="text-center mb-8 p-4 bg-primary/10 rounded-xl max-w-2xl mx-auto">
        <p className="text-sm text-foreground">
          <strong>How credits work:</strong> 1 standard generation ={" "}
          {creditInfo.standardGeneration} credit • Pro model generation ={" "}
          {creditInfo.proModelGeneration} credits
        </p>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier) => (
          <PricingColumn key={tier.name} tier={tier} isYearly={isYearly} />
        ))}
      </div>

      {/* Yearly savings note */}
      {isYearly && (
        <p className="text-center mt-6 text-primary font-medium">
          Save {creditInfo.yearlyDiscount}% with yearly billing
        </p>
      )}
    </div>
  );
};

export default Pricing;

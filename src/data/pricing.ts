import { IPricing } from "@/types";

// Credit info: 1 generation = 1 credit, Pro model generation = 3 credits
export const creditInfo = {
  standardGeneration: 1,
  proModelGeneration: 3,
  yearlyDiscount: 20,
};

export const tiers: IPricing[] = [
  {
    name: "AI Explorer",
    subtitle: "Perfect for trying out AI design",
    monthlyPrice: 5,
    yearlyPrice: 4,
    credits: 200,
    features: [
      { text: "200 credits per month", included: true },
      { text: "Unlimited text to image", included: true },
      {
        text: "~200 Image generations",
        included: true,
        tooltip: "Standard model: 1 credit per generation",
      },
      {
        text: "~66 Pro generations",
        included: true,
        tooltip: "Pro model: 3 credits per generation",
      },
      { text: "Email support", included: true },
      { text: "Private mode", included: false },
    ],
    ctaText: "Get Started",
  },
  {
    name: "AI Designer",
    subtitle: "For regular design work",
    monthlyPrice: 15,
    yearlyPrice: 12,
    credits: 500,
    features: [
      { text: "500 credits per month", included: true },
      { text: "Unlimited text to image", included: true },
      {
        text: "~500 Image generations",
        included: true,
        tooltip: "Standard model: 1 credit per generation",
      },
      {
        text: "~166 Pro generations",
        included: true,
        tooltip: "Pro model: 3 credits per generation",
      },
      { text: "Chat support", included: true },
      { text: "Private mode", included: false },
    ],
    ctaText: "Get Started",
  },
  {
    name: "AI Pro",
    subtitle: "For professional designers",
    monthlyPrice: 45,
    yearlyPrice: 36,
    credits: 1500,
    highlighted: true,
    badge: "BEST VALUE",
    features: [
      { text: "1500 credits per month", included: true },
      { text: "Unlimited text to image", included: true },
      {
        text: "~1500 Image generations",
        included: true,
        tooltip: "Standard model: 1 credit per generation",
      },
      {
        text: "~500 Pro generations",
        included: true,
        tooltip: "Pro model: 3 credits per generation",
      },
      { text: "Skip the queue", included: true },
      { text: "x4 Generations at once", included: true },
      { text: "Private mode", included: true },
      { text: "AI Interior Designer support", included: true },
      { text: "Priority support", included: true },
    ],
    ctaText: "Get Started",
  },
  {
    name: "Team",
    subtitle: "For design studios & teams",
    monthlyPrice: "contact",
    credits: "custom",
    features: [
      { text: "Custom credits allocation", included: true },
      { text: "Unlimited text to image", included: true },
      { text: "Unlimited generations", included: true },
      { text: "Skip the queue", included: true },
      { text: "x4 Generations at once", included: true },
      { text: "Private mode", included: true },
      { text: "AI Interior Designer support", included: true },
      { text: "Team member management", included: true },
      { text: "Dedicated support", included: true },
    ],
    ctaText: "Contact Sales",
  },
];

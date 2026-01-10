import { IPricing } from "@/types";

// Credit info: 1 generation = 1 credit, Pro model generation = 3 credits
export const creditInfo = {
  standardGeneration: 1,
  proModelGeneration: 3,
  yearlyDiscount: 20,
};

export const appUrl = "https://app.plain-service.com/#/studio";

export const tiers: IPricing[] = [
  {
    name: "AI Designer",
    slug: "ai_designer",
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
    ],
    ctaText: "Get Started",
  },
  {
    name: "AI Pro",
    slug: "ai_pro",
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

      { text: "AI Interior Designer support", included: true },
      { text: "Priority support", included: true },
    ],
    ctaText: "Get Started",
  },
  {
    name: "Team",
    slug: "team",
    subtitle: "For design studios & teams",
    monthlyPrice: "contact",
    credits: "custom",
    features: [
      { text: "Custom credits allocation", included: true },
      { text: "Unlimited text to image", included: true },
      { text: "Unlimited generations", included: true },
      { text: "Skip the queue", included: true },
      { text: "AI Interior Designer support", included: true },
      { text: "Project management tools", included: true },
    ],
    ctaText: "Contact Us",
    ctaUrl:
      "mailto:hello@plain-service.com?subject=Team%20Plan%20Inquiry&body=Hi%2C%0A%0AI%27m%20interested%20in%20the%20Team%20plan%20for%20my%20design%20studio.%0A%0ATeam%20size%3A%20%0AExpected%20usage%3A%20%0A%0AThanks!",
  },
];

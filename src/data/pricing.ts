import { IPricing } from "@/types";

export const appUrl = "https://app.plain-service.com/#/studio";

export const tiers: IPricing[] = [
  {
    name: "AI Designer",
    slug: "ai_designer",
    subtitle: "For regular design work",
    monthlyPrice: 4.99,
    yearlyPrice: 3.99,
    credits: 100,
    features: [
      { text: "100 image generations per month", included: true },
      { text: "Chat support", included: true },
      { text: "Private Mode", included: false },
    ],
    ctaText: "Get Started",
  },
  {
    name: "AI Designer Pro",
    slug: "ai_designer_pro",
    subtitle: "For professional designers",
    monthlyPrice: 24.99,
    yearlyPrice: 19.99,
    credits: 500,
    highlighted: true,
    badge: "BEST VALUE",
    features: [
      { text: "500 image generations per month", included: true },
      { text: "AI Interior Designer support", included: true },
      { text: "Priority support", included: true },
      { text: "Private Mode", included: true },
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
      { text: "Custom image generations", included: true },
      { text: "Unlimited team members", included: true },
      { text: "AI Interior Designer support", included: true },
      { text: "Personal support & training", included: true },
      { text: "Private Mode", included: true },
    ],
    ctaText: "Contact Us",
    ctaUrl:
      "mailto:hello@plain-service.com?subject=Team%20Plan%20Inquiry&body=Hi%2C%0A%0AI%27m%20interested%20in%20the%20Team%20plan%20for%20my%20design%20studio.%0A%0ATeam%20size%3A%20%0AExpected%20usage%3A%20%0A%0AThanks!",
  },
];

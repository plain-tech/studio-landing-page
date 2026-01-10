import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
  subheading: string;
  quickLinks: IMenuItem[];
  email: string;
  telephone: string;
  socials: ISocials;
} = {
  subheading:
    "AI-powered interior design visualisation. Generate & edit client-ready renders in seconds.",
  quickLinks: [
    { text: "Features", url: "#features" },
    { text: "Pricing", url: "#pricing" },
    { text: "Testimonials", url: "#testimonials" },
    { text: "FAQ", url: "#faq" },
  ],
  email: "hello@plain-service.com",
  telephone: "",
  socials: {
    instagram: "https://www.instagram.com/therenderai/",
  },
};

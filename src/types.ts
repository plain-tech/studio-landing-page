export interface IMenuItem {
  text: string;
  url: string;
}

export interface IBenefit {
  title: string;
  description: string;
  imageSrc: string;
  bullets: IBenefitBullet[];
}

export interface IBenefitBullet {
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface IPricingFeature {
  text: string;
  included: boolean;
  tooltip?: string;
}

export interface IPricing {
  name: string;
  subtitle?: string;
  monthlyPrice: number | "contact";
  yearlyPrice?: number | "contact";
  credits: number | "custom";
  features: IPricingFeature[];
  highlighted?: boolean;
  badge?: string;
  ctaText?: string;
}

export interface IFAQ {
  question: string;
  answer: string;
}

export interface ITestimonial {
  name: string;
  role: string;
  message: string;
  avatar: string;
}

export interface IStats {
  title: string;
  icon: JSX.Element;
  description: string;
}

export interface ISocials {
  facebook?: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
  threads?: string;
  twitter?: string;
  youtube?: string;
  x?: string;
  [key: string]: string | undefined;
}

export interface IUseCase {
  title: string;
  description: string;
  imageSrc: string; // Before image
  afterImageSrc?: string; // After image for slider
}

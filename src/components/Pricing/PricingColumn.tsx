import clsx from "clsx";
import Link from "next/link";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { FiInfo } from "react-icons/fi";

import { IPricing } from "@/types";
import { appUrl } from "@/data/pricing";

interface Props {
  tier: IPricing;
  isYearly: boolean;
}

const PricingColumn: React.FC<Props> = ({ tier, isYearly }: Props) => {
  const {
    name,
    slug,
    subtitle,
    monthlyPrice,
    yearlyPrice,
    credits,
    features,
    highlighted,
    badge,
    ctaText,
    ctaUrl,
  } = tier;

  const displayPrice =
    isYearly && yearlyPrice !== undefined ? yearlyPrice : monthlyPrice;
  const isContactPricing = displayPrice === "contact";

  // Build CTA URL with payment_plan parameter
  const billingPeriod = isYearly ? "yearly" : "monthly";
  const defaultCtaUrl = `${appUrl}?payment_plan=${slug}&billing=${billingPeriod}`;
  const finalCtaUrl = ctaUrl || defaultCtaUrl;

  return (
    <div
      className={clsx(
        "w-full bg-white rounded-2xl border transition-all duration-200",
        highlighted
          ? "border-primary border-2 shadow-xl scale-[1.02]"
          : "border-border-color hover:shadow-lg"
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-border-color">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          {badge && (
            <span className="px-2 py-1 bg-primary text-xs font-bold rounded-md text-foreground">
              {badge}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-sm text-foreground-accent mb-4">{subtitle}</p>
        )}

        {/* Price */}
        <div className="mb-4">
          {isContactPricing ? (
            <p className="text-2xl font-bold text-foreground">Contact us</p>
          ) : (
            <>
              <p className="text-4xl font-bold text-foreground">
                ${displayPrice}
                <span className="text-lg font-normal text-foreground-accent">
                  /month
                </span>
              </p>
              {isYearly && yearlyPrice && (
                <p className="text-sm text-foreground-accent mt-1">
                  Billed annually (${(yearlyPrice as number) * 12}/year)
                </p>
              )}
            </>
          )}
        </div>

        {/* Credits badge - maintain consistent height */}
        <div className="h-9 mb-4">
          {credits !== "custom" && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
              <span className="text-sm font-semibold text-foreground">
                {credits.toLocaleString()} credits/month
              </span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Link
          href={finalCtaUrl}
          className={clsx(
            "block w-full py-3 px-4 rounded-full font-semibold transition-colors text-center",
            highlighted
              ? "bg-primary hover:bg-primary-accent text-foreground"
              : "bg-background-dark hover:bg-foreground text-white"
          )}
        >
          {ctaText || "Get Started"}
        </Link>
      </div>

      {/* Features */}
      <div className="p-6">
        <p className="text-sm font-semibold text-foreground-accent uppercase tracking-wide mb-4">
          What&apos;s included
        </p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              {feature.included ? (
                <BsFillCheckCircleFill className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              ) : (
                <BsXCircleFill className="h-5 w-5 text-foreground-accent/40 flex-shrink-0 mt-0.5" />
              )}
              <span
                className={clsx(
                  "text-sm",
                  feature.included
                    ? "text-foreground"
                    : "text-foreground-accent/60"
                )}
              >
                {feature.text}
              </span>
              {feature.tooltip && (
                <span className="group relative">
                  <FiInfo className="h-4 w-4 text-foreground-accent cursor-help" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {feature.tooltip}
                  </span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingColumn;

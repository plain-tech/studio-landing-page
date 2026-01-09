import Link from "next/link";
import { ctaDetails } from "@/data/cta";

const CTA: React.FC = () => {
  return (
    <section id="cta" className="mt-10 mb-5 lg:my-20">
      <div className="relative h-full w-full z-10 mx-auto py-12 sm:py-20">
        <div className="h-full w-full">
          {/* Dark background with pattern */}
          <div className="rounded-3xl opacity-95 absolute inset-0 -z-10 h-full w-full bg-background-dark bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="rounded-3xl absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_50%_500px,rgba(212,165,55,0.15),transparent)]"></div>
          </div>

          <div className="h-full flex flex-col items-center justify-center text-white text-center px-5">
            <h2 className="text-2xl sm:text-3xl md:text-5xl md:leading-tight font-semibold mb-4 max-w-2xl">
              {ctaDetails.heading}
            </h2>

            <p className="mx-auto max-w-xl md:px-5 text-white/80">
              {ctaDetails.subheading}
            </p>

            <div className="mt-8">
              <Link
                href={ctaDetails.ctaUrl}
                className="inline-block px-10 py-4 bg-primary hover:bg-primary-accent text-foreground font-semibold text-lg rounded-full transition-colors"
              >
                {ctaDetails.ctaText}
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-white/60 text-sm">
              <span>✓ Free to start</span>
              <span>✓ Created by Interior Design professionals</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

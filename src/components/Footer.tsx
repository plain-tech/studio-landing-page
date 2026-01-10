import Link from "next/link";
import React from "react";

import { footerDetails } from "@/data/footer";
import { getPlatformIconByName } from "@/utils";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-dark text-white py-12">
      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="text-white/70">{footerDetails.subheading}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="text-white/70">
            {footerDetails.quickLinks.map((link) => (
              <li key={link.text} className="mb-2">
                <Link
                  href={link.url}
                  className="hover:text-white transition-colors"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          {footerDetails.email && (
            <a
              href={`mailto:${footerDetails.email}`}
              className="block text-white/70 hover:text-white transition-colors"
            >
              {footerDetails.email}
            </a>
          )}
          {footerDetails.socials && (
            <div className="mt-5 flex items-center gap-5 flex-wrap">
              {Object.keys(footerDetails.socials).map((platformName) => {
                if (platformName && footerDetails.socials[platformName]) {
                  return (
                    <Link
                      href={footerDetails.socials[platformName]}
                      key={platformName}
                      aria-label={platformName}
                      className="text-white/70 hover:text-primary transition-colors"
                    >
                      {getPlatformIconByName(platformName)}
                    </Link>
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 pt-8 border-t border-white/10 text-center text-white/50 px-6">
        <p>
          Copyright &copy; {new Date().getFullYear()} Plain Service Inc. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

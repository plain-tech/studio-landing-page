"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { HiOutlineXMark, HiBars3 } from "react-icons/hi2";

import Container from "./Container";
import { siteDetails } from "@/data/siteDetails";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-transparent fixed top-0 left-0 right-0 md:absolute z-50 mx-auto w-full">
      <Container className="!px-0">
        <nav className="shadow-md md:shadow-none bg-white md:bg-transparent mx-auto flex justify-between items-center py-2 px-5 md:py-4">
          {/* Logo - empty spacer for layout */}
          <Link href="/" className="flex items-center">
            <span className="w-8 h-8" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-4">
            <li>
              <Link
                href="mailto:hello@plain-service.com"
                className="text-foreground border border-foreground hover:bg-foreground hover:text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link
                href={siteDetails.appUrl}
                className="text-foreground bg-primary hover:bg-primary-accent px-8 py-3 rounded-full font-semibold transition-colors"
              >
                Start designing
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-primary text-foreground focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
              ) : (
                <HiBars3 className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
            <li>
              <Link
                href={siteDetails.appUrl}
                className="text-foreground bg-primary hover:bg-primary-accent px-5 py-3 rounded-full block w-fit font-semibold"
                onClick={toggleMenu}
              >
                Start designing
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </header>
  );
};

export default Header;

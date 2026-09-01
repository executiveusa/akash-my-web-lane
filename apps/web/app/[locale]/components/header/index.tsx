"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "What we measure", href: "/#evidence" },
  { label: "Talk to Akash", href: "/contact" },
];

export const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky left-0 top-0 z-40 w-full border-b border-black/10 bg-[#f3f1ea]/95 text-[#181817] backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          href="/"
          onClick={closeMenu}
          className="flex min-h-11 min-w-0 flex-1 items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          aria-label="MyWebLane home"
        >
          <span className="font-semibold tracking-[-0.02em]">MyWebLane</span>
          <span className="hidden text-xs text-black/40 sm:inline">by Akash Engine</span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm md:flex" aria-label="Primary navigation">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center px-4 text-black/60 transition hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-black/15 bg-white md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-site-navigation"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {isOpen ? (
        <nav
          id="mobile-site-navigation"
          aria-label="Mobile navigation"
          className="border-t border-black/10 bg-[#f3f1ea] px-4 py-4 sm:px-6 md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col divide-y divide-black/10">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="flex min-h-12 items-center justify-between py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                {item.label}
                <span aria-hidden="true" className="text-black/35">↗</span>
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
};

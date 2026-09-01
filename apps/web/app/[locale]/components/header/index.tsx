"use client";

import { ModeToggle } from "@repo/design-system/components/mode-toggle";
import { Button } from "@repo/design-system/components/ui/button";
import type { Dictionary } from "@repo/internationalization";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "./language-switcher";

type HeaderProps = {
  dictionary: Dictionary;
};

const links = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "What we measure", href: "/#evidence" },
  { label: "Talk to Akash", href: "/contact" },
];

export const Header = ({ dictionary: _dictionary }: HeaderProps) => {
  const [isOpen, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 left-0 z-40 w-full border-b border-black/10 bg-[#f5f5f1]/95 text-[#171717] backdrop-blur dark:border-white/10 dark:bg-[#111]/95 dark:text-white">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          href="/"
          onClick={closeMenu}
          className="flex min-w-0 flex-1 items-baseline gap-2"
          aria-label="MyWebLane home"
        >
          <span className="font-semibold tracking-[-0.02em]">MyWebLane</span>
          <span className="hidden text-xs text-black/40 dark:text-white/40 sm:inline">by Akash Engine</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="Primary navigation">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="text-black/60 transition hover:text-black dark:text-white/60 dark:hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <ModeToggle />
        </div>

        <Button
          onClick={() => setOpen(!isOpen)}
          variant="ghost"
          size="icon"
          className="h-11 w-11 shrink-0 md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-site-navigation"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isOpen ? (
        <div id="mobile-site-navigation" className="border-t border-black/10 bg-[#f5f5f1] px-4 py-4 dark:border-white/10 dark:bg-[#111] md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col" aria-label="Mobile navigation">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="flex min-h-12 items-center border-b border-black/8 text-base last:border-b-0 dark:border-white/8"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex min-h-12 items-center justify-between">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
};

"use client";

import { ModeToggle } from "@repo/design-system/components/mode-toggle";
import { Button } from "@repo/design-system/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@repo/design-system/components/ui/navigation-menu";
import type { Dictionary } from "@repo/internationalization";
import { Menu, MoveRight, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { env } from "@/env";
import { LanguageSwitcher } from "./language-switcher";

type HeaderProps = {
  dictionary: Dictionary;
};

export const Header = ({ dictionary }: HeaderProps) => {
  const navigationItems = [
    {
      title: dictionary.web.header.home,
      href: "/",
      description: "",
    },
    {
      title: dictionary.web.header.product.title,
      description: dictionary.web.header.product.description,
      items: [
        {
          title: dictionary.web.header.product.pricing,
          href: "/pricing",
        },
      ],
    },
    {
      title: dictionary.web.header.blog,
      href: "/blog",
      description: "",
    },
  ];

  if (env.NEXT_PUBLIC_DOCS_URL) {
    navigationItems.push({
      title: dictionary.web.header.docs,
      href: env.NEXT_PUBLIC_DOCS_URL,
      description: "",
    });
  }

  const [isOpen, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 left-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container relative mx-auto flex min-h-16 items-center gap-3 px-4 sm:min-h-20 sm:px-6 lg:grid lg:grid-cols-3">
        <div className="hidden flex-row items-center justify-start gap-4 lg:flex">
          <NavigationMenu className="flex items-start justify-start">
            <NavigationMenuList className="flex flex-row justify-start gap-4">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <NavigationMenuLink asChild>
                      <Button asChild variant="ghost">
                        <Link href={item.href}>{item.title}</Link>
                      </Button>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex grid-cols-2 flex-col gap-4 lg:grid">
                          <div className="flex h-full flex-col justify-between">
                            <div className="flex flex-col">
                              <p className="text-base">{item.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {item.description}
                              </p>
                            </div>
                            <Button asChild className="mt-10" size="sm">
                              <Link href="/contact">
                                {dictionary.web.global.primaryCta}
                              </Link>
                            </Button>
                          </div>
                          <div className="flex h-full flex-col justify-end text-sm">
                            {item.items?.map((subItem, idx) => (
                              <NavigationMenuLink
                                className="flex flex-row items-center justify-between rounded px-4 py-2 hover:bg-muted"
                                href={subItem.href}
                                key={idx}
                              >
                                <span>{subItem.title}</span>
                                <MoveRight className="h-4 w-4 text-muted-foreground" />
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Link
          href="/"
          onClick={closeMenu}
          className="flex min-w-0 flex-1 items-center gap-2 lg:justify-center"
          aria-label="Akash Engine home"
        >
          <svg
            className="h-5 w-5 shrink-0 text-[#c9a84c]"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Akash Engine</title>
            <path
              d="M13 2L4.09 12.11a1 1 0 0 0-.09 1.1L9 22h6l5-8.79a1 1 0 0 0-.09-1.1L13 2Z"
              fill="currentColor"
            />
          </svg>
          <p className="truncate whitespace-nowrap font-semibold text-[#c9a84c]">
            Akash Engine™
          </p>
        </Link>

        <div className="hidden w-full justify-end gap-3 md:flex">
          <Button asChild variant="ghost">
            <Link href="/contact">{dictionary.web.header.contact}</Link>
          </Button>
          <div className="border-r" />
          <LanguageSwitcher />
          <ModeToggle />
          <Button asChild variant="outline">
            <Link href={`${env.NEXT_PUBLIC_APP_URL}/sign-in`}>
              {dictionary.web.header.signIn}
            </Link>
          </Button>
          <Button asChild>
            <Link href={`${env.NEXT_PUBLIC_APP_URL}/sign-up`}>
              {dictionary.web.header.signUp}
            </Link>
          </Button>
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

        {isOpen && (
          <div
            id="mobile-site-navigation"
            className="absolute top-16 right-0 left-0 flex max-h-[calc(100dvh-4rem)] w-full flex-col gap-5 overflow-y-auto border-t bg-background px-4 py-5 shadow-lg sm:top-20 sm:px-6 md:hidden"
          >
            {navigationItems.map((item) => (
              <div key={item.title}>
                <div className="flex flex-col gap-2">
                  {item.href ? (
                    <Link
                      className="flex min-h-11 items-center justify-between rounded-md px-2"
                      href={item.href}
                      onClick={closeMenu}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                    >
                      <span className="text-lg">{item.title}</span>
                      <MoveRight className="h-4 w-4 stroke-1 text-muted-foreground" />
                    </Link>
                  ) : (
                    <p className="px-2 text-lg font-medium">{item.title}</p>
                  )}
                  {item.items?.map((subItem) => (
                    <Link
                      className="flex min-h-11 items-center justify-between rounded-md px-2"
                      href={subItem.href}
                      key={subItem.title}
                      onClick={closeMenu}
                    >
                      <span className="text-muted-foreground">{subItem.title}</span>
                      <MoveRight className="h-4 w-4 stroke-1" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="grid gap-2 border-t pt-4">
              <Button asChild variant="ghost" className="min-h-11 justify-start">
                <Link href="/contact" onClick={closeMenu}>
                  {dictionary.web.header.contact}
                </Link>
              </Button>
              <div className="flex min-h-11 items-center justify-between gap-3 px-2">
                <LanguageSwitcher />
                <ModeToggle />
              </div>
              <Button asChild variant="outline" className="min-h-11">
                <Link href={`${env.NEXT_PUBLIC_APP_URL}/sign-in`} onClick={closeMenu}>
                  {dictionary.web.header.signIn}
                </Link>
              </Button>
              <Button asChild className="min-h-11">
                <Link href={`${env.NEXT_PUBLIC_APP_URL}/sign-up`} onClick={closeMenu}>
                  {dictionary.web.header.signUp}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

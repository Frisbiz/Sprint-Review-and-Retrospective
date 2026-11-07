"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { brand, clinics } from "@/lib/data";
import { Button } from "./Button";

const links = [
  { href: "/conditions/pelvic-floor", label: "Pelvic" },
  { href: "/conditions/spine-back-pain", label: "Spine" },
  { href: "/conditions/sports-golf", label: "Sports" },
  { href: "/locations/south-okc", label: "Locations" },
  { href: "/team", label: "Team" },
  { href: "/insurance", label: "Insurance" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-fog/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group min-w-0">
          <div className="font-display text-lg font-semibold leading-tight text-brand-deep sm:text-xl">
            {brand.name}
          </div>
          <div className="hidden text-[11px] tracking-wide text-muted sm:block">
            South OKC · Norman · Noble · No referral needed
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = pathname.startsWith(link.href.replace(/\/[^/]+$/, "")) || pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-brand-soft text-brand-deep" : "text-ink/80 hover:bg-mist hover:text-brand"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${clinics[0].phone.replace(/\./g, "")}`}
            className="hidden text-sm font-semibold text-brand md:inline"
          >
            {clinics[0].phone}
          </a>
          <Button href="/book" className="!py-2.5 !px-4">
            Book
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-3 bg-ink" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-fog px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-mist"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="mt-2 rounded-md bg-amber px-3 py-3 text-center font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Book appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

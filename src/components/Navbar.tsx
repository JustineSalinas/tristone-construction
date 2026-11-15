"use client";

import { useState } from "react";
import Image from "next/image";
import { siteInfo } from "@/lib/content";

const primaryLink = { href: "#top", label: "Home" };

const links = [
  { href: "#projects", label: "Our Builds" },
  { href: "#financing", label: "Financing" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ember-dim/15 bg-molave-deep">
      <div className="flex w-full items-center justify-between gap-8 px-5 py-4 sm:px-8 lg:px-12 xl:px-16">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="leading-none">
            <span className="block font-display text-lg font-bold tracking-tight text-capiz">
              TRISTONE
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-capiz-dim/70">
              Construction
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href={primaryLink.href}
            className="text-sm font-medium text-ember-light"
          >
            {primaryLink.label}
          </a>
          <span className="h-4 w-px bg-ember-dim/40" />
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-capiz-dim transition-colors hover:text-ember-light"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full bg-ember px-5 py-2.5 font-display text-sm font-bold text-molave-deep transition-colors hover:bg-ember-light md:inline-flex"
        >
          Free Consultation &rarr;
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className="h-0.5 w-6 bg-capiz" />
          <span className="h-0.5 w-6 bg-capiz" />
          <span className="h-0.5 w-6 bg-capiz" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ember-dim/40 bg-molave-deep px-5 pb-4 md:hidden">
          <a
            href={primaryLink.href}
            onClick={() => setOpen(false)}
            className="py-2 text-sm font-medium text-ember-light"
          >
            {primaryLink.label}
          </a>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-capiz-dim hover:text-ember-light"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-ember px-5 py-2.5 text-center font-display text-sm font-bold text-molave-deep"
          >
            Free Consultation &rarr;
          </a>
          <a
            href={`tel:${siteInfo.phone.replace(/-/g, "")}`}
            className="mt-1 py-2 text-center text-sm text-capiz-dim hover:text-ember-light"
          >
            Or call {siteInfo.phone}
          </a>
        </nav>
      )}
    </header>
  );
}

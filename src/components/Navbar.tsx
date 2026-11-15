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
    <header className="sticky top-0 z-50 border-b border-iron/10 bg-capiz/95 backdrop-blur-md">
      <div className="flex w-full items-center justify-between gap-8 px-5 py-3 sm:px-8 lg:px-12 xl:px-16">
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="leading-none">
            <span className="block font-display text-base font-bold tracking-tight text-iron">
              TRISTONE
            </span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.3em] text-iron/50">
              Construction
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full bg-iron/5 p-1 md:flex">
          <a
            href={primaryLink.href}
            className="rounded-full bg-iron px-4 py-2 text-sm font-medium text-capiz"
          >
            {primaryLink.label}
          </a>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-iron/60 transition-colors hover:text-iron"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full bg-iron py-1.5 pl-4 pr-1.5 text-sm font-medium text-capiz transition-colors hover:bg-iron/90 md:inline-flex"
        >
          Free Consultation
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ember">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </span>
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className="h-0.5 w-6 bg-iron" />
          <span className="h-0.5 w-6 bg-iron" />
          <span className="h-0.5 w-6 bg-iron" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-iron/10 bg-capiz px-5 pb-4 md:hidden">
          <a
            href={primaryLink.href}
            onClick={() => setOpen(false)}
            className="py-2 text-sm font-medium text-ember"
          >
            {primaryLink.label}
          </a>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-iron/60 hover:text-iron"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-ember px-5 py-2.5 text-center text-sm font-bold text-white"
          >
            Free Consultation &rarr;
          </a>
          <a
            href={`tel:${siteInfo.phone.replace(/-/g, "")}`}
            className="mt-1 py-2 text-center text-sm text-iron/60 hover:text-iron"
          >
            Or call {siteInfo.phone}
          </a>
        </nav>
      )}
    </header>
  );
}

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Vercel. Already scaffolded and building.

## Users

Primary: homeowners and families in Bacolod City, Negros Occidental, and Iloilo City (Philippines) who are ready to build a custom home but are often blocked on upfront cash. Includes overseas clients (e.g. OFWs / balikbayans, such as the Canada-based client in Project Bria Faith) who manage the build remotely and need to trust the team without being on-site.

Job to be done: decide which local contractor to trust with a large, high-stakes, multi-month home build, and take the first contact step (call/message).

## Product Purpose

Tristone Construction is a residential and commercial construction company. The site's purpose is lead generation and trust-building: convert a visitor evaluating contractors into a phone call or message inquiry.

## Positioning

"Build Now, Pay Later" plus PAG-IBIG financing and bank loan application assistance — affordable financing access that most local competing builders do not offer. This is the primary differentiator, not just craftsmanship. Faith/trust framing (scripture verses accompany major project milestones) is a genuine part of the brand voice, not decoration — it should be treated as authentic brand personality, not removed or sanitized.

## Operating Context

- Projects are custom-designed and built per client, spanning both modest standard-finish homes and large luxury builds (pools, multiple ensuites, premium stone finishes).
- Sales/relationship process happens over phone, Viber, WhatsApp, Messenger, and in-person site visits; remote/overseas clients are managed via video calls.
- Company posts heavily on Facebook (8.1K followers): project reveals with full spec sheets, turnover ceremony photos, site-progress videos, and client testimonials are the core content types already produced and available.
- Key staff named repeatedly by clients in testimonials: Engineer Judy Ann Parreñas Ardeña, Cathyza Amolar Villaruz, Donna May Yatco, and Sir Ryan — these are real trust signals, not placeholder names.

## Capabilities and Constraints

- Offers: residential & commercial construction, renovation, extension, fencing, interior design, condo fit-outs, repairs, consultancy/estimates, permit processing assistance.
- Financing: Build Now Pay Later, PAG-IBIG Financing, bank loan application assistance.
- Service area: Bacolod City, Negros Occidental, and Iloilo City only — do not imply wider Philippine coverage.
- Languages: English, Tagalog, Hiligaynon.
- No e-commerce/checkout — the entire site funnels to contact (call/message), not online payment or booking.

## Brand Commitments

- Name: Tristone Construction. Tagline: "Quality Beyond Promises."
- Logo: real brand file supplied at `public/brand/logo.jpg` (sourced from `Tristone Pictures/LOGO.jpg`), icon-only crop at `public/brand/logo-mark.png` (transparent). Monogram is a "TRH" lettermark built from orange bars forming a stylized house/roofline, with a white gabled house glyph inset into the right column. The logo's own orange is a real brand asset and is never recolored, but it is used sparingly on the site now that the palette below has superseded the earlier all-orange accent scheme.
- Site palette (2026-11 update, by explicit user request to match https://tier-one-architects.vercel.app/): an ivory/espresso/timber-gold architectural palette, not the earlier saturated construction-orange scheme. Tokens live in `src/app/globals.css`: `--molave`/`--molave-deep`/`--molave-raised` are near-black espresso grounds (~#1b1611/#120e0a/#2a211a), `--capiz`/`--capiz-dim` are warm ivory/stone panel tones (~#f5f1eb/#ddd4c7), `--iron` is the dark ink text color (~#1b1611), and `--ember`/`--ember-light`/`--ember-dim` are the muted timber/gold accent (~#a07a55/#c9a47a/#6e5138) replacing the old bright orange accent everywhere except the real logo asset and genuine third-party brand-color icons (Facebook blue, WhatsApp green, Viber purple, Gmail red) in the floating contact dock, which stay at their authentic brand hexes.
- Voice: warm, grateful, faith-forward (scripture verses genuinely used in project announcements — e.g. Psalm 127:1, Ecclesiastes 3:11, James 1:17), proud but humble, Hiligaynon/Taglish code-switching appears in real client testimonials and should not be flattened to generic English.
- Contact: 0907-653-0668 (Smart/WhatsApp/Viber), tristoneconstruction123@gmail.com, Barangay Vista Alegre, Bacolod City.

## Evidence on Hand

- Real client testimonials (10, with names and dates) — see `src/lib/content.ts`.
- Real project photography and renders for: Project Cleo, Project Adam, Project Eli Caleb, Project Gamboa, Project Blessed, Project Bria Faith (Canada client), plus interior-finish photos — `public/images/`.
- Real site-progress and turnover videos (4) — `public/videos/`.
- Full architectural spec sheets (lot area, floor area breakdown, room lists, upgrades, freebies) for Project Gamboa and Project Blessed, sourced directly from the company's own Facebook captions.
- No case-study metrics, awards, or press exist — do not fabricate any.

## Product Principles

1. Financing access (Build Now Pay Later / PAG-IBIG) is the lead differentiator and must be impossible to miss, not buried as one more feature bullet.
2. Every claim on the page must trace to real content already gathered (testimonials, captions, spec sheets) — no invented stats, no stock-photo-style generic claims.
3. The faith/gratitude voice in the source material is genuine brand personality and should read as such, not be sanded down into generic corporate tone.
4. Photography of real, named, completed and in-progress projects is the primary trust mechanism — the design should foreground real photos over decorative UI chrome.
5. The visitor's end goal is always a phone call or message; every section should plausibly move toward that, not just inform.

## Accessibility & Inclusion

No formal accessibility requirement established by the user; follow standard web accessibility baseline (contrast, alt text, keyboard nav) as general craft floor.

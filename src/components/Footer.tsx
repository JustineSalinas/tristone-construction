import Image from "next/image";
import { siteInfo } from "@/lib/content";
import { FretworkDivider } from "./Fretwork";
import { FacebookIcon } from "./icons";
import FooterWordmark from "./FooterWordmark";
import Reveal from "./Reveal";

const columns = [
  {
    heading: "Studio",
    content: (
      <>
        <p>{siteInfo.address}</p>
        <a
          href={siteInfo.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block border-b border-capiz-dim/30 pb-0.5 text-capiz hover:border-ember-light hover:text-ember-light"
        >
          Open in Maps
        </a>
      </>
    ),
  },
  {
    heading: "Talk to Us",
    content: (
      <>
        <a href={`tel:${siteInfo.phone.replace(/-/g, "")}`} className="block hover:text-ember-light">
          {siteInfo.phone}
        </a>
        <a href={`mailto:${siteInfo.email}`} className="mt-1 block break-all hover:text-ember-light">
          {siteInfo.email}
        </a>
      </>
    ),
  },
  {
    heading: "Follow the Work",
    content: (
      <a
        href={siteInfo.facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 hover:text-ember-light"
      >
        <FacebookIcon className="h-4 w-4 text-ember-light" />
        <span>Facebook</span>
        <span className="text-xs text-capiz-dim/50">{siteInfo.followers}</span>
      </a>
    ),
  },
  {
    heading: "Explore",
    content: (
      <div className="flex flex-col gap-1.5">
        <a href="#projects" className="hover:text-ember-light">Our Builds</a>
        <a href="#financing" className="hover:text-ember-light">Financing</a>
        <a href="#testimonials" className="hover:text-ember-light">Reviews</a>
        <a href="#careers" className="hover:text-ember-light">We&apos;re Hiring</a>
        <a href="#contact" className="hover:text-ember-light">Contact</a>
      </div>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ember-dim/40 bg-iron">
      {/* Dramatic banner: pure-black zone up top, photo only revealed lower down */}
      <div className="relative flex min-h-[80vh] w-full flex-col justify-between overflow-hidden bg-iron py-14">
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(180deg, transparent 0%, transparent 32%, rgba(0,0,0,0.6) 48%, #000 62%, #000 78%, rgba(0,0,0,0.5) 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, transparent 32%, rgba(0,0,0,0.6) 48%, #000 62%, #000 78%, rgba(0,0,0,0.5) 90%, transparent 100%)",
          }}
        >
          <Image
            src="/images/herosection.jpg"
            alt=""
            fill
            quality={100}
            sizes="100vw"
            className="object-cover object-[50%_40%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-iron/5 via-transparent to-iron/55" />

        <Reveal as="div" className="relative z-10 w-full px-5">
          <FooterWordmark />
        </Reveal>

        <div className="relative z-10 flex justify-center">
          <a
            href={`tel:${siteInfo.phone.replace(/-/g, "")}`}
            className="inline-flex items-center gap-2 border border-ember bg-ember px-8 py-3.5 font-display text-base font-bold text-white shadow-[0_15px_35px_-10px_rgba(217,83,31,0.5)] transition-colors hover:bg-ember-light"
          >
            Call {siteInfo.phone}
          </a>
        </div>
      </div>

      {/* Link directory */}
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-ember-dim/20 pb-14 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ember-light/80">
                {col.heading}
              </h3>
              <div className="mt-4 text-sm text-capiz-dim/80">{col.content}</div>
            </div>
          ))}
        </div>

        <FretworkDivider className="mx-auto mt-10 max-w-xs text-ember-dim" />

        <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <div className="text-center sm:text-left">
              <p className="font-display text-lg font-bold leading-none text-capiz">
                TRISTONE
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-capiz-dim/60">
                Construction
              </p>
            </div>
          </div>
          <p className="text-center text-xs text-capiz-dim/40 sm:text-right">
            &copy; 2026 Tristone Construction. Quality Beyond Promises.
          </p>
        </div>
      </div>
    </footer>
  );
}

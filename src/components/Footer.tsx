import Image from "next/image";
import { siteInfo } from "@/lib/content";
import { FretworkDivider } from "./Fretwork";
import { FacebookIcon } from "./icons";
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
        <a href={`mailto:${siteInfo.email}`} className="mt-1 block hover:text-ember-light">
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
    <footer className="border-t border-ember-dim/40 bg-molave-deep">
      {/* Dramatic banner */}
      <div className="relative flex min-h-[70vh] w-full flex-col justify-between overflow-hidden bg-molave-deep py-14">
        <Image
          src="/images/projects/673759551_122164078016708590_8331368798484395051_n.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-molave-deep via-molave-deep/60 to-molave-deep/80" />

        <Reveal
          as="div"
          className="relative z-10 mx-auto max-w-2xl px-5 text-center"
        >
          <p className="font-display text-lg italic leading-snug text-capiz/90 sm:text-xl">
            &ldquo;Unless the Lord builds the house, those who build it labor
            in vain.&rdquo;
          </p>
          <cite className="mt-2 block text-xs font-semibold not-italic tracking-[0.2em] text-ember-light">
            PSALM 127:1
          </cite>
        </Reveal>

        <h2
          aria-hidden="true"
          className="relative z-10 w-full select-none text-center font-display text-[15vw] font-extrabold italic leading-none tracking-tight text-capiz/90 sm:text-[10vw]"
        >
          TRISTONE
        </h2>

        <div className="relative z-10 flex justify-center">
          <a
            href={`tel:${siteInfo.phone.replace(/-/g, "")}`}
            className="inline-flex items-center gap-2 border border-ember bg-ember px-8 py-3.5 font-display text-base font-bold text-molave-deep shadow-[0_15px_35px_-10px_rgba(160,122,85,0.5)] transition-colors hover:bg-ember-light"
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
          <div className="text-center sm:text-left">
            <p className="font-display text-lg font-bold leading-none text-capiz">
              TRISTONE
            </p>
            <p className="text-xs uppercase tracking-[0.25em] text-capiz-dim/60">
              Construction
            </p>
          </div>
          <p className="text-center text-xs text-capiz-dim/40 sm:text-right">
            &copy; 2026 Tristone Construction. Quality Beyond Promises.
          </p>
        </div>
      </div>
    </footer>
  );
}

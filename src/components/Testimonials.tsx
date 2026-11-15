import { testimonials } from "@/lib/content";
import { FretworkDivider } from "./Fretwork";
import DragMarquee from "./DragMarquee";
import Reveal from "./Reveal";
import { StarIcon } from "./icons";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function TestimonialPlaque({
  name,
  date,
  text,
}: {
  name: string;
  date: string;
  text: string;
}) {
  return (
    <div className="group relative flex w-[340px] shrink-0 flex-col gap-3 overflow-hidden border border-iron/15 bg-capiz p-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out select-none hover:-translate-y-1 hover:border-ember/40 hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.25)] sm:w-[400px]">
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="pointer-events-none absolute -right-1 -top-1 h-14 w-14 text-ember/[0.08] transition-colors duration-300 group-hover:text-ember/[0.14]"
        fill="currentColor"
      >
        <path d="M3 18c0-6 4-10 10-11l1 3c-4 1-6 3-6 6h5v8H3v-6Zm15 0c0-6 4-10 10-11l1 3c-4 1-6 3-6 6h5v8H18v-6Z" />
      </svg>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ember/40 bg-iron font-display text-sm font-bold text-capiz">
          {initials(name)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold text-iron">
            {name}
          </p>
          <p className="text-xs text-iron/50">{date}</p>
        </div>
      </div>

      <div className="flex gap-0.5 text-ember">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className="h-3.5 w-3.5" />
        ))}
      </div>

      <p className="relative line-clamp-6 text-sm leading-relaxed text-iron/85">
        {text}
      </p>
    </div>
  );
}

export default function Testimonials() {
  const rowA = testimonials.slice(0, 5);
  const rowB = testimonials.slice(5, 10);

  return (
    <section id="testimonials" className="overflow-hidden bg-molave py-20">
      <Reveal className="mx-auto mb-12 max-w-6xl px-5 sm:px-8">
        <h2 className="max-w-2xl font-display text-3xl font-extrabold text-iron sm:text-4xl">
          Families We&apos;ve Built For
        </h2>
        <p className="mt-3 max-w-2xl text-iron/80">
          8.1K followers and counting, real words from families who trusted
          Tristone with their dream homes.
        </p>
      </Reveal>

      <div className="flex flex-col gap-6">
        <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <DragMarquee direction={-1} speed={32}>
            {[...rowA, ...rowA].map((t, i) => (
              <TestimonialPlaque key={`a-${i}-${t.name}`} {...t} />
            ))}
          </DragMarquee>
        </div>

        <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <DragMarquee direction={1} speed={32}>
            {[...rowB, ...rowB].map((t, i) => (
              <TestimonialPlaque key={`b-${i}-${t.name}`} {...t} />
            ))}
          </DragMarquee>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl px-5 sm:px-8">
        <FretworkDivider className="text-ember-dim" />
      </div>
    </section>
  );
}

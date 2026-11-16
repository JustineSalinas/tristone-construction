import { siteInfo, videoCaptions } from "@/lib/content";
import { FretworkDivider } from "./Fretwork";
import { FacebookIcon } from "./icons";
import PhoneVideo from "./PhoneVideo";
import Reveal from "./Reveal";
import StaggerReveal from "./StaggerReveal";

const videoFiles = [
  "/videos/AQMcgjOLwmqwAxu9GJwxyIqbfQxLLB5fH4-qbqeC4SwgryDuPO7qFLFB7jBfPgLmxN0iCd2T5Tbuo2kC-yBsGAdTyT5cJ4fI8tU.mp4",
  "/videos/AQOV4IFjICfbTpwSUHviJX7WJtpVeWfZdlxtHbVBVIt4AW0BWQuGvnXFnExDVpWCUojHR0U2-i1xwxGqei1aZ9LAKz_ZIApadA2pyzFLmYB4vA.mp4",
  "/videos/AQOwD-8u9iDiDBL04WHfgR6kqsOQ920a-HG9vNxMWADXoqZSu1QlwnmTALIQdY1KIumWVzGyw0ck9XjLktF93V5HNdDxaylNQ0rfYWhTUsSpzw.mp4",
  "/videos/AQPK3cLGx2A4maDT4NWfW117LBYLm-8Ssq4EHHjusShmN6SvQMj2ScfsJKW_aoQh6F2BQDIcI4zyafNq8rHR26sI7SH5iyWezTY0XYT6MhMgiA.mp4",
  "/videos/video-cleo-purchasing-day.mp4",
  "/videos/video-cleo-80-percent.mp4",
];

export default function Videos() {
  return (
    <section id="videos" className="bg-molave py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="max-w-2xl font-display text-3xl font-extrabold text-iron sm:text-4xl">
              See the Builds in Motion
            </h2>
            <p className="mt-3 max-w-2xl text-iron/80">
              Every clip plays on its own as it comes into view.
            </p>
          </div>

          <a
            href={siteInfo.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-iron underline decoration-iron/30 underline-offset-4 transition-colors hover:text-ember hover:decoration-ember"
          >
            <FacebookIcon className="h-4 w-4 text-[#1877f2]" />
            Visit our Facebook
          </a>
        </Reveal>
      </div>

      <StaggerReveal className="video-grid mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 px-5 sm:grid-cols-3 sm:px-8 lg:grid-cols-4 lg:gap-x-8 lg:px-12">
        {videoFiles.map((src, idx) => (
          <PhoneVideo key={src} src={src} caption={videoCaptions[idx]} />
        ))}

        {[1, 2].map((n) => (
          <div key={n} className="flex w-full flex-col items-center gap-4">
            <div className="flex aspect-[9/16] w-[150px] max-w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-iron/20 bg-molave-raised/40 text-center sm:w-[190px] lg:w-[220px]">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-iron/30" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="m8 15 3-3.5 2.5 2.5L17 10" />
              </svg>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-iron/40">
                Coming Soon
              </span>
            </div>
            <p className="max-w-[220px] text-center text-xs leading-relaxed text-iron/40">
              Another build update on the way.
            </p>
          </div>
        ))}
      </StaggerReveal>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <FretworkDivider className="mt-16 text-ember-dim" />
      </div>
    </section>
  );
}

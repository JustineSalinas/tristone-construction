import { videoCaptions } from "@/lib/content";
import { FretworkDivider } from "./Fretwork";
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
    <section className="bg-molave py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold text-iron sm:text-4xl">
            See the Builds in Motion
          </h2>
          <p className="mt-3 max-w-2xl text-iron/80">
            Every clip plays on its own as it comes into view.
          </p>
        </Reveal>
      </div>

      <StaggerReveal className="video-grid mt-12 grid grid-cols-2 gap-x-5 gap-y-10 px-5 sm:grid-cols-3 sm:px-8 lg:grid-cols-6 lg:px-12">
        {videoFiles.map((src, idx) => (
          <PhoneVideo key={src} src={src} caption={videoCaptions[idx]} />
        ))}
      </StaggerReveal>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <FretworkDivider className="mt-16 text-ember-dim" />
      </div>
    </section>
  );
}

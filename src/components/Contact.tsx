import { siteInfo } from "@/lib/content";
import Reveal from "./Reveal";
import LocationMap from "./LocationMap";

export default function Contact() {
  return (
    <section id="contact" className="bg-molave-deep py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col border border-ember-dim/40">
            <div className="bg-molave-raised p-8 sm:p-12">
              <h2 className="font-display text-3xl font-extrabold text-capiz sm:text-4xl">
                Got Questions? Need Assistance?
              </h2>
              <p className="mt-4 text-capiz-dim/80">
                Renovation, extension, estimate, consultancy, repairs,
                fencing, interior design, condo fit-outs, improvements and
                all other construction services.
              </p>
              <p className="mt-4 text-sm text-capiz-dim/50">
                Languages: {siteInfo.languages}
              </p>
            </div>

            <div className="flex flex-1 flex-col divide-y divide-ember-dim/30 bg-capiz">
              <a
                href={`tel:${siteInfo.phone.replace(/-/g, "")}`}
                className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-ember/10"
              >
                <span className="text-sm text-iron/60">SMART</span>
                <span className="font-display font-bold text-iron">
                  {siteInfo.phone}
                </span>
              </a>
              <a
                href={`https://wa.me/63${siteInfo.phone.replace(/-/g, "").replace(/^0/, "")}`}
                className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-ember/10"
              >
                <span className="text-sm text-iron/60">WhatsApp / Viber</span>
                <span className="font-display font-bold text-iron">
                  {siteInfo.phone}
                </span>
              </a>
              <a
                href={`mailto:${siteInfo.email}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-6 py-5 transition-colors hover:bg-ember/10"
              >
                <span className="text-sm text-iron/60">Email</span>
                <span className="break-all font-display text-sm font-bold text-iron">
                  {siteInfo.email}
                </span>
              </a>
              <a
                href={siteInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-ember/10"
              >
                <span className="text-sm text-iron/60">Office</span>
                <span className="text-right font-display text-sm font-bold text-iron">
                  {siteInfo.address}
                </span>
              </a>
            </div>
          </div>

          <LocationMap />
        </Reveal>
      </div>
    </section>
  );
}

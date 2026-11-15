import { siteInfo } from "@/lib/content";

export default function LocationMap() {
  const query = encodeURIComponent(`${siteInfo.address}`);

  return (
    <div className="flex h-full min-h-[320px] flex-col border-[8px] border-molave-raised bg-molave-raised p-2 sm:border-[12px]">
      <div className="relative flex-1 overflow-hidden">
        <iframe
          title="Tristone Construction office location"
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          className="h-full w-full grayscale-[25%] contrast-125"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

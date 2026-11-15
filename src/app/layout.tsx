import type { Metadata } from "next";
import { Besley, Albert_Sans } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

const besley = Besley({
  variable: "--font-besley",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
});

const albertSans = Albert_Sans({
  variable: "--font-albert",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tristone Construction | Quality Beyond Promises",
  description:
    "Residential and commercial construction in Bacolod City, Negros Occidental & Iloilo City. Build Now Pay Later and PAG-IBIG Financing available.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${besley.variable} ${albertSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-molave text-iron font-sans">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}

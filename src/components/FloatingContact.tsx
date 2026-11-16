"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logoMarkOnDark from "../../public/brand/logo-mark-on-dark.png";
import { siteInfo } from "@/lib/content";
import { respond, type ChatState } from "@/lib/chatbot";
import {
  MailIcon,
  PhoneIcon,
  FacebookIcon,
  WhatsAppIcon,
  ViberIcon,
  CloseIcon,
  SendIcon,
} from "./icons";

type Message = { from: "bot" | "user"; text: string };

const QUICK_REPLIES = [
  "Do you offer financing?",
  "Where do you build?",
  "What services do you offer?",
  "How do I get in touch?",
];

const dockLinks = [
  {
    href: `mailto:${siteInfo.email}`,
    label: "Email",
    detail: siteInfo.email,
    icon: MailIcon,
    bg: "bg-capiz",
    fg: "text-iron",
  },
  {
    href: `tel:${siteInfo.phone.replace(/-/g, "")}`,
    label: "Call",
    detail: siteInfo.phone,
    icon: PhoneIcon,
    bg: "bg-capiz",
    fg: "text-iron",
  },
  {
    href: siteInfo.whatsappUrl,
    label: "WhatsApp",
    detail: siteInfo.phone,
    icon: WhatsAppIcon,
    bg: "bg-[#25d366]",
    fg: "text-white",
  },
  {
    href: siteInfo.viberUrl,
    label: "Viber",
    detail: siteInfo.phone,
    icon: ViberIcon,
    bg: "bg-[#7360f2]",
    fg: "text-white",
  },
  {
    href: siteInfo.facebookUrl,
    label: "Facebook",
    detail: `${siteInfo.followers} followers`,
    icon: FacebookIcon,
    bg: "bg-[#1877f2]",
    fg: "text-white",
  },
];

const EASE = "cubic-bezier(.16,1,.3,1)";

export default function FloatingContact() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi! Ask me about financing, our service area, past projects, or how to get started.",
    },
  ]);
  const [input, setInput] = useState("");
  const [chatState, setChatState] = useState<ChatState>({ pendingTopicId: null });
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, chatOpen, isTyping]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    // Immediately display user query
    setMessages((m) => [...m, { from: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);

    const { text: reply, nextState } = respond(trimmed, chatState);

    // Realistic typing delay proportional to response length (750ms - 1200ms)
    const delay = Math.min(1200, Math.max(750, reply.length * 4 + 400));

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: reply }]);
      setChatState(nextState);
      setIsTyping(false);
    }, delay);
  };

  return (
    <>
      {/* Contact dock */}
      <div
        className="fixed bottom-24 right-4 z-40 flex flex-col gap-3 sm:right-6 sm:gap-3.5"
        style={{
          opacity: chatOpen ? 0 : 1,
          transform: chatOpen ? "translateY(8px) scale(0.95)" : "translateY(0) scale(1)",
          pointerEvents: chatOpen ? "none" : "auto",
          transition: `opacity 250ms ${EASE}, transform 250ms ${EASE}`,
        }}
      >
        {dockLinks.map(({ href, label, detail, icon: Icon, bg, fg }) => (
          <div key={label} className="group relative flex items-center justify-end">
            <span className="pointer-events-none absolute right-full mr-3 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-iron px-4 py-2 text-xs font-medium text-capiz opacity-0 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)] transition-opacity duration-200 group-hover:opacity-100">
              {label}
              <span className="text-capiz/50">&middot;</span>
              {detail}
            </span>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className={`no-focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-[0_8px_18px_-6px_rgba(0,0,0,0.2)] ring-1 ring-iron/10 transition-transform duration-200 ease-out hover:scale-110 sm:h-11 sm:w-11 ${bg} ${fg}`}
            >
              <Icon className="h-[1rem] w-[1rem] sm:h-[1.1rem] sm:w-[1.1rem]" />
            </a>
          </div>
        ))}
      </div>

      {/* Chat panel */}
      <div
        className="fixed bottom-24 right-4 z-50 flex h-[min(29rem,calc(100svh-7rem))] w-[calc(100vw-2rem)] max-w-[22rem] origin-bottom-right flex-col overflow-hidden rounded-[1.75rem] bg-iron shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)] ring-1 ring-ember-dim/20 sm:right-6"
        style={{
          opacity: chatOpen ? 1 : 0,
          transform: chatOpen
            ? "translateY(0) scale(1)"
            : "translateY(16px) scale(0.92)",
          pointerEvents: chatOpen ? "auto" : "none",
          transition: `opacity 280ms ${EASE}, transform 280ms ${EASE}`,
        }}
      >
        <div className="flex items-center justify-between border-b border-ember-dim/15 bg-molave-raised px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-iron ring-1 ring-ember-dim/40">
              <Image
                src={logoMarkOnDark}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            </div>
            <div>
              <p className="font-display text-sm font-bold tracking-wide text-capiz">
                Tristone Concierge
              </p>
              <p className="text-[11px] text-capiz-dim/60">
                Ask us anything about Tristone
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close chat"
            onClick={() => setChatOpen(false)}
            className="no-focus-ring flex h-7 w-7 items-center justify-center rounded-full text-capiz-dim/70 transition-colors hover:bg-capiz/10 hover:text-ember-light"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div ref={scrollRef} className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                m.from === "bot"
                  ? "rounded-2xl rounded-tl-sm bg-capiz text-iron"
                  : "ml-auto rounded-2xl rounded-tr-sm bg-ember text-white"
              }`}
            >
              {m.text}
            </div>
          ))}

          {isTyping && (
            <div
              className="w-fit rounded-2xl rounded-tl-sm bg-capiz px-4 py-3 text-iron shadow-sm"
              role="status"
              aria-label="Tristone Concierge is typing"
            >
              <span className="sr-only">Tristone Concierge is typing...</span>
              <div className="flex items-center gap-1.5 py-1">
                <span className="typing-dot h-2 w-2 rounded-full bg-iron/70" />
                <span
                  className="typing-dot h-2 w-2 rounded-full bg-iron/70"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="typing-dot h-2 w-2 rounded-full bg-iron/70"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 px-5 pb-4">
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              type="button"
              disabled={isTyping}
              onClick={() => send(q)}
              className={`no-focus-ring rounded-full border border-ember-dim/30 px-3 py-1.5 text-[11px] text-capiz-dim/80 transition-colors ${
                isTyping
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:border-ember-light/60 hover:text-ember-light"
              }`}
            >
              {q}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-ember-dim/15 p-4"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder={isTyping ? "Tristone Concierge is typing..." : "Type your question..."}
            className="flex-1 rounded-full bg-molave-raised px-4 py-2.5 text-sm text-capiz placeholder:text-capiz-dim/40 outline-none focus:ring-1 focus:ring-ember-dim/50 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            aria-label="Send"
            className="no-focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember text-white transition-colors hover:bg-ember-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendIcon className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Launcher: label pill + dark circle avatar, visible by default, crossfades to the close button when opened */}
      <div className="fixed bottom-5 right-4 z-50 sm:right-6">
        <div
          id="concierge-fab"
          className="flex items-center gap-3"
          style={{
            opacity: chatOpen ? 0 : 1,
            transform: chatOpen ? "scale(0.9) translateX(10px)" : "scale(1) translateX(0)",
            pointerEvents: chatOpen ? "none" : "auto",
            transition: `opacity 200ms ${EASE}, transform 200ms ${EASE}`,
          }}
        >
          <button
            type="button"
            onClick={() => setChatOpen(true)}
            className="no-focus-ring hidden cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-full bg-gradient-to-br from-iron to-[#120d09] pl-5 pr-6 text-sm font-semibold text-capiz shadow-[0_10px_28px_-8px_rgba(0,0,0,0.45)] ring-1 ring-ember/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-8px_rgba(0,0,0,0.5)] hover:ring-ember/50 sm:flex sm:h-14"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            Ask Us Anything
          </button>

          <button
            type="button"
            onClick={() => setChatOpen(true)}
            aria-label="Open chat"
            className="no-focus-ring relative flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-iron text-capiz shadow-[0_10px_24px_-8px_rgba(0,0,0,0.4)] ring-1 ring-ember-dim/30 transition-transform duration-200 hover:scale-[1.04]"
          >
            <Image
              src={logoMarkOnDark}
              alt=""
              width={22}
              height={22}
              className="h-[1.35rem] w-[1.35rem] object-contain"
            />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ember text-[10px] font-bold text-white ring-2 ring-capiz">
              1
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setChatOpen(false)}
          aria-label="Close chat"
          style={{
            opacity: chatOpen ? 1 : 0,
            transform: chatOpen ? "scale(1)" : "scale(0.85)",
            pointerEvents: chatOpen ? "auto" : "none",
            transition: `opacity 200ms ${EASE}, transform 200ms ${EASE}`,
          }}
          className="no-focus-ring absolute right-0 top-0 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-ember text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.3)] hover:scale-105"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>
    </>
  );
}

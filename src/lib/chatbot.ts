import {
  siteInfo,
  hiring,
  financingHighlights,
  featuredProjects,
  galleryProjects,
  testimonials,
} from "./content";

type Topic = {
  id: string;
  keywords: string[];
  /** The first answer given when this topic is matched. */
  answer: string;
  /** A question asked right after the answer, inviting a deeper follow-up. */
  followUp?: string;
  /** The deeper answer given if the user says yes to the follow-up. */
  detail?: string;
};

const projectNames = [
  ...featuredProjects.map((p) => p.name),
  ...galleryProjects.map((p) => p.name),
].filter((name, i, arr) => arr.indexOf(name) === i);

const topics: Topic[] = [
  {
    id: "financing",
    keywords: [
      "financ", "pag-ibig", "pagibig", "pag ibig", "loan", "pay later",
      "build now", "installment", "bank", "budget", "downpayment", "down payment",
      "afford", "price", "cost", "how much",
    ],
    answer:
      "Yes. Tristone offers Build Now, Pay Later and PAG-IBIG Financing, plus bank loan application assistance. Qualifying projects also get freebies worth almost " +
      financingHighlights.freebiesValue +
      ".",
    followUp: "Want me to list exactly what's included in those freebies?",
    detail:
      "Here's what's typically included: " +
      financingHighlights.freebies.join(", ") +
      ". On top of that, you also get: " +
      financingHighlights.benefits.join(", ") +
      ". " +
      financingHighlights.services,
  },
  {
    id: "services",
    keywords: [
      "service", "offer", "renovat", "extension", "fenc", "interior", "condo",
      "fit-out", "fit out", "repair", "consult", "estimate", "build a house", "construct", "what can you",
    ],
    answer:
      "Tristone handles residential and commercial construction, renovation, extension, fencing, interior design, condo fit-outs, repairs, consultancy, estimates, and permit processing assistance.",
    followUp: "Would you like to see examples of homes we've built?",
    detail:
      "Here are some of our builds: " +
      projectNames.slice(0, 6).join(", ") +
      ", and more. Scroll up to \"Homes Rising Right Now\" and \"Completed & Ongoing Builds\" to see full photos and specs for each.",
  },
  {
    id: "area",
    keywords: [
      "area", "location", "where", "bacolod", "iloilo", "negros", "talisay",
      "bago city", "silay", "coverage", "based",
    ],
    answer:
      "We build residential and commercial projects in Bacolod City, Negros Occidental, and Iloilo City.",
    followUp: "Want our exact office address?",
    detail: `Our office is at ${siteInfo.address}. You can also open it directly in Google Maps: ${siteInfo.mapsUrl}`,
  },
  {
    id: "projects",
    keywords: [
      "project", "portfolio", "gallery", "example", "sample house", "turnover",
      "completed", "cleo", "gamboa", "blessed", "eli caleb", "savinnah", "amarra",
    ],
    answer:
      "Scroll up to Completed & Ongoing Builds and Homes Rising Right Now on this page. You'll find " +
      projectNames.slice(0, 5).join(", ") +
      ", and more, with real photos and full spec sheets.",
    followUp: "Want to know which ones are still under construction right now?",
    detail:
      "Right now, " +
      featuredProjects.map((p) => p.name).join(" and ") +
      " are actively rising. Click either one on the homepage to see the full layout, finishes, and freebies.",
  },
  {
    id: "timeline",
    keywords: ["how long", "timeline", "duration", "months", "weeks", "schedule", "when done", "finish"],
    answer:
      "Timelines depend on the size and design of the home. Smaller projects have moved from groundbreaking to turnover in a matter of months.",
    followUp: "Want to talk to the team about your specific lot size and timeline?",
    detail: `Message us at ${siteInfo.phone} with your lot size and target move-in date, and the team will give you a realistic schedule.`,
  },
  {
    id: "contact",
    keywords: ["contact", "call", "message", "number", "email", "reach you", "talk to", "get in touch"],
    answer: `You can call or message us at ${siteInfo.phone} (Smart, WhatsApp, and Viber), or email ${siteInfo.email}.`,
    followUp: "Want our Facebook page too?",
    detail: `Here you go: ${siteInfo.facebookUrl} — we're at ${siteInfo.followers} followers and counting, with real client reviews posted there.`,
  },
  {
    id: "staff",
    keywords: ["engineer", "judy", "cathy", "donna", "ryan", "team", "staff", "architect", "who will"],
    answer:
      "Our clients work closely with Engineer Judy Ann Parreñas Ardeña along with Cathyza Amolar Villaruz, Donna May Yatco, and the rest of the Tristone team throughout design, permitting, and construction.",
  },
  {
    id: "languages",
    keywords: ["language", "hiligaynon", "tagalog", "english speak"],
    answer: `Our team communicates in ${siteInfo.languages}.`,
  },
  {
    id: "reviews",
    keywords: ["review", "testimonial", "feedback", "rating", "trust", "legit", "scam"],
    answer:
      `We have ${testimonials.length}+ written reviews from families we've built for, plus ${siteInfo.followers} followers on Facebook who've watched the builds happen in real time.`,
    followUp: "Want to read one of those reviews?",
    detail: `Here's one: "${testimonials[0].text.slice(0, 180)}${testimonials[0].text.length > 180 ? "…" : ""}" — ${testimonials[0].name}, ${testimonials[0].date}.`,
  },
  {
    id: "careers",
    keywords: ["hiring", "job", "career", "vacancy", "apply", "work with you", "draftsman", "employment"],
    answer: `Yes, we're currently hiring a ${hiring.role}. ${hiring.intro}`,
    followUp: "Want the full list of qualifications?",
    detail: hiring.qualifications.join(", ") + `. ${hiring.cta}`,
  },
];

const GREETING_KEYWORDS = ["hi", "hello", "hey", "kamusta", "kumusta"];
const YES_WORDS = ["yes", "yeah", "yep", "sure", "ok", "okay", "please", "go ahead", "oo", "sige"];
const NO_WORDS = ["no", "nope", "not now", "nah", "later", "hindi"];

export type ChatState = { pendingTopicId: string | null };

export function respond(
  input: string,
  state: ChatState
): { text: string; nextState: ChatState } {
  const normalized = input.toLowerCase().trim();

  if (!normalized) {
    return {
      text: "Ask me anything about Tristone Construction — financing, our service area, past projects, careers, or how to get started.",
      nextState: { pendingTopicId: null },
    };
  }

  // If we just asked a follow-up question, check whether this is a yes/no reply to it.
  if (state.pendingTopicId) {
    const topic = topics.find((t) => t.id === state.pendingTopicId);
    if (topic?.detail && YES_WORDS.some((w) => normalized === w || normalized.startsWith(w + " "))) {
      return {
        text: topic.detail + " Anything else you'd like to know about Tristone?",
        nextState: { pendingTopicId: null },
      };
    }
    if (NO_WORDS.some((w) => normalized === w || normalized.startsWith(w + " "))) {
      return {
        text: "No problem! Ask me anything else about Tristone whenever you're ready.",
        nextState: { pendingTopicId: null },
      };
    }
    // Otherwise fall through and treat it as a brand-new question.
  }

  if (GREETING_KEYWORDS.some((g) => normalized === g || normalized.startsWith(g + " "))) {
    return {
      text: "Hi! I'm the Tristone Concierge. Ask me about financing, our service area, past projects, careers, or how to get started.",
      nextState: { pendingTopicId: null },
    };
  }

  for (const topic of topics) {
    if (topic.keywords.some((kw) => normalized.includes(kw))) {
      const text = topic.followUp ? `${topic.answer} ${topic.followUp}` : topic.answer;
      return {
        text,
        nextState: { pendingTopicId: topic.followUp ? topic.id : null },
      };
    }
  }

  return {
    text:
      "I can only help with questions about Tristone Construction and our services (financing, projects, careers, service area, timelines, reviews, and contact details). For anything else, please reach our team directly at " +
      siteInfo.phone +
      " or " +
      siteInfo.email +
      ".",
    nextState: { pendingTopicId: null },
  };
}

/** @deprecated kept for compatibility; prefer respond() for conversational follow-ups. */
export function matchFaq(input: string): string {
  return respond(input, { pendingTopicId: null }).text;
}

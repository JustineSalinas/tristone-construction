type FaqEntry = {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
};

export const faqEntries: FaqEntry[] = [
  {
    id: "financing",
    question: "Do you offer financing or Build Now, Pay Later?",
    keywords: [
      "financ",
      "pag-ibig",
      "pagibig",
      "pag ibig",
      "loan",
      "pay later",
      "build now",
      "installment",
      "bank",
      "budget",
      "downpayment",
      "down payment",
    ],
    answer:
      "Yes. Tristone offers Build Now, Pay Later and PAG-IBIG Financing, plus bank loan application assistance. Qualifying projects also get freebies worth almost P300,000 (ceiling cove lights, pest control treatment, and occupancy permit processing). Message 0907 653 0668 and our team will walk you through what fits your budget.",
  },
  {
    id: "services",
    question: "What services does Tristone offer?",
    keywords: [
      "service",
      "offer",
      "renovat",
      "extension",
      "fenc",
      "interior",
      "condo",
      "fit-out",
      "fit out",
      "repair",
      "consult",
      "estimate",
      "build a house",
      "construct",
    ],
    answer:
      "Tristone handles residential and commercial construction, renovation, extension, fencing, interior design, condo fit-outs, repairs, consultancy, estimates, and permit processing assistance. Whatever stage your project is at, we can take it from there.",
  },
  {
    id: "area",
    question: "Where do you build?",
    keywords: [
      "area",
      "location",
      "where",
      "bacolod",
      "iloilo",
      "negros",
      "talisay",
      "bago city",
      "silay",
      "coverage",
    ],
    answer:
      "We build residential and commercial projects in Bacolod City, Negros Occidental, and Iloilo City. If your site is outside those areas, message us and we'll let you know if it's feasible.",
  },
  {
    id: "projects",
    question: "Can I see your past projects?",
    keywords: [
      "project",
      "portfolio",
      "gallery",
      "example",
      "sample house",
      "turnover",
      "completed",
      "cleo",
      "gamboa",
      "blessed",
      "eli caleb",
      "savinnah",
      "amarra",
    ],
    answer:
      "Scroll up to Completed & Ongoing Builds and Homes Rising Right Now on this page. You'll find Project Cleo, Project Adam, Project Eli Caleb, Project Gamboa, Project Blessed, and more, with real photos and full spec sheets.",
  },
  {
    id: "timeline",
    question: "How long does a build take?",
    keywords: ["how long", "timeline", "duration", "months", "weeks", "schedule"],
    answer:
      "Timelines depend on the size and design of the home. Smaller projects have moved from groundbreaking to turnover in a matter of months. Message us with your lot size and target move-in date and the team will give you a realistic schedule.",
  },
  {
    id: "contact",
    question: "How do I get in touch?",
    keywords: ["contact", "call", "message", "number", "email", "reach you", "talk to"],
    answer:
      "You can call or message us at 0907 653 0668 (Smart, WhatsApp, and Viber), email tristoneconstruction123@gmail.com, or message the Tristone Construction Facebook page. Our office is at Barangay Vista Alegre, Bacolod City.",
  },
  {
    id: "staff",
    question: "Who will I be working with?",
    keywords: ["engineer", "judy", "cathy", "donna", "ryan", "team", "staff", "architect"],
    answer:
      "Our clients work closely with Engineer Judy Ann Parreñas Ardeña along with Cathyza Amolar Villaruz, Donna May Yatco, and the rest of the Tristone team throughout design, permitting, and construction.",
  },
  {
    id: "languages",
    question: "What languages do you speak?",
    keywords: ["language", "hiligaynon", "tagalog", "english speak"],
    answer: "Our team communicates in English, Tagalog, and Hiligaynon.",
  },
];

const GREETING_KEYWORDS = ["hi", "hello", "hey", "kamusta", "kumusta"];

export function matchFaq(input: string): string {
  const normalized = input.toLowerCase().trim();

  if (!normalized) {
    return "Ask me anything about Tristone Construction, financing, our service area, or our past projects.";
  }

  if (GREETING_KEYWORDS.some((g) => normalized === g || normalized.startsWith(g + " "))) {
    return "Hi! I'm the Tristone Concierge. Ask me about financing, our service area, past projects, or how to get started.";
  }

  for (const entry of faqEntries) {
    if (entry.keywords.some((kw) => normalized.includes(kw))) {
      return entry.answer;
    }
  }

  return "I can only help with questions about Tristone Construction and our services (financing, projects, service area, timelines, and contact details). For anything else, please reach our team directly at 0907 653 0668 or tristoneconstruction123@gmail.com.";
}

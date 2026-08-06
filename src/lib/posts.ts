// Blog / resource content. Stored as structured data (no CMS, no MDX) and
// rendered by the article template. Each post targets a real search intent.
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO — first published
  updated?: string; // ISO — last meaningful edit; feeds dateModified + sitemap
  readMins: number;
  category: string;
  keywords: string[];
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "how-much-does-a-logo-cost",
    title: "How Much Does a Logo Cost in 2026?",
    excerpt:
      "Logo prices range from $5 templates to five-figure brand systems. Here is what actually drives the cost and what you should expect to pay.",
    date: "2026-06-13",
    updated: "2026-06-29",
    readMins: 4,
    category: "Logo Design",
    keywords: ["logo cost", "logo design price", "how much does a logo cost"],
    body: [
      { type: "p", text: "A logo can cost anywhere from a few dollars to tens of thousands. The gap is real, and it comes down to one thing: whether you are buying a picture or a system. Here is how to think about it." },
      { type: "h2", text: "What you are really paying for" },
      { type: "p", text: "Cheap logos are a single image. Real logo design is a mark with an idea behind it, drawn to work at every size, in one color, on a billboard and a favicon, with the rules that keep it consistent. That difference is what you pay for." },
      { type: "h2", text: "Typical price ranges" },
      { type: "ul", items: [
        "DIY / AI generators: $0 to $50. Fast, generic, no ownership of a unique mark.",
        "Freelance starter: $50 to $500. Fine for a single clean mark, limited revisions.",
        "Studio logo system: $500 to $5,000. Concept, variations, and usage guidelines.",
        "Full brand identity: $5,000+. Logo plus color, type, and a complete system.",
      ] },
      { type: "h2", text: "What we charge" },
      { type: "p", text: "At Core Byte Media, logos start at $45 for a clean single mark, $120 for a complete logo system, and $250 for a full mark with guidelines and assets. We keep pricing transparent so you know what you are getting before we start." },
      { type: "h2", text: "How to choose" },
      { type: "p", text: "If you are testing an idea, a starter mark is fine. If the logo will front a real business for years, invest in a system. Redrawing a brand later costs more than doing it right once. Tell us the brief and we will scope an exact number." },
      { type: "h2", text: "What about timeline?" },
      { type: "p", text: "Cost and speed are linked. A clean single mark can land in days; a full brand system with guidelines runs two to four weeks once the brief is clear. The biggest delay is rarely the design itself, it is slow feedback and too many decision-makers. We cover the full breakdown in our guide on how long logo and website projects take." },
    ],
  },
  {
    slug: "how-much-does-a-website-cost",
    title: "How Much Does a Website Cost?",
    excerpt:
      "From a one-page site to a full web app, here is what websites cost in 2026 and where your money actually goes.",
    date: "2026-06-12",
    updated: "2026-06-29",
    readMins: 5,
    category: "Web Development",
    keywords: ["website cost", "how much does a website cost", "web development price"],
    body: [
      { type: "p", text: "Website pricing is confusing because two sites that look similar can cost wildly different amounts. The price tracks complexity, not page count. Here is the honest breakdown." },
      { type: "h2", text: "What drives the cost" },
      { type: "ul", items: [
        "Custom design vs a template.",
        "Number of unique page types, not total pages.",
        "A CMS so your team can edit content.",
        "Integrations: payments, auth, CRM, booking.",
        "Performance, accessibility, and SEO done properly.",
      ] },
      { type: "h2", text: "Typical ranges" },
      { type: "ul", items: [
        "Template site: $0 to $500. Quick, but generic and limited.",
        "Custom landing page: $200 to $1,500. One focused page built to convert.",
        "Business website: $1,500 to $10,000. Multiple pages, CMS, motion, SEO.",
        "Web app or store: $10,000+. Custom features, data, and integrations.",
      ] },
      { type: "h2", text: "What we charge" },
      { type: "p", text: "Our sites start at $200 for a landing page, $550 for a multi-page business site with a CMS, and $1,000 for a custom build. Every site is engineered in Next.js to load fast and score well on Core Web Vitals." },
      { type: "h2", text: "The cheapest site is rarely the cheapest" },
      { type: "p", text: "A slow, hard-to-edit site costs you in lost conversions and developer time. Spend where it pays back: speed, clear structure, and a CMS your team can actually use." },
      { type: "h2", text: "How long does it take?" },
      { type: "p", text: "A focused landing page can ship in days. A multi-page business site with a CMS is usually two to four weeks, and a custom build or store depends on the integrations. We give you a timeline before we start, not after. See our full guide on how long logo and website projects take for the stage-by-stage breakdown." },
    ],
  },
  {
    slug: "does-your-business-need-an-ai-chatbot",
    title: "Does Your Business Actually Need an AI Chatbot?",
    excerpt:
      "AI chatbots are everywhere, but most are useless. Here is when one earns its place and what a good one looks like.",
    date: "2026-06-11",
    updated: "2026-06-29",
    readMins: 5,
    category: "Agentic AI",
    keywords: ["AI chatbot for business", "do I need a chatbot", "ai agent for website"],
    body: [
      { type: "p", text: "Most chatbots are glorified FAQ widgets that frustrate people. A good one does real work: answers accurately, takes action, and hands off to a human when it should. The difference is night and day." },
      { type: "h2", text: "When a chatbot pays off" },
      { type: "ul", items: [
        "You answer the same questions over and over.",
        "Leads arrive after hours when no one is available.",
        "Support volume is eating your team's time.",
        "You want to qualify and capture leads automatically.",
      ] },
      { type: "h2", text: "When it does not" },
      { type: "p", text: "If your traffic is tiny or every enquiry is highly custom, a simple contact form may serve you better. A chatbot should remove friction, not add a layer of robotic replies between you and your customer." },
      { type: "h2", text: "What a good agent looks like" },
      { type: "ul", items: [
        "Grounded in your real content, so it does not make things up.",
        "Wired to real actions: booking, lookups, lead capture.",
        "Knows its limits and routes to a human cleanly.",
        "Monitored, so it keeps improving from real conversations.",
      ] },
      { type: "h2", text: "Chatbot or AI agent?" },
      { type: "p", text: "The words get used interchangeably, but they are not the same thing. A chatbot follows a script; an agent reasons, uses tools, and completes multi-step work. Picking the wrong one wastes money. Our guide on AI agents vs chatbots breaks down which one your business actually needs." },
      { type: "h2", text: "See one in action" },
      { type: "p", text: "The agent in the corner of this site is exactly the kind we build. It answers questions, recommends services, and captures leads. AI agents with us start at $300. If you are weighing one for your business, tell us the workflow and we will tell you honestly whether it is worth it." },
    ],
  },
  {
    slug: "branding-vs-logo-difference",
    title: "Branding vs a Logo: What Is the Difference?",
    excerpt:
      "A logo is not a brand. Understanding the difference saves you money and stops your business looking inconsistent.",
    date: "2026-06-10",
    readMins: 3,
    category: "Branding",
    keywords: ["branding vs logo", "what is brand identity", "logo vs brand"],
    body: [
      { type: "p", text: "People use logo and brand interchangeably. They are not the same, and confusing them is why so many small businesses look inconsistent across their site, social, and print." },
      { type: "h2", text: "A logo" },
      { type: "p", text: "A logo is the mark that identifies you: the symbol, the wordmark, or both. It is one important piece of a brand, but only a piece." },
      { type: "h2", text: "A brand" },
      { type: "p", text: "A brand is the whole system: the logo plus color, typography, imagery, tone, and the rules that hold them together. It is what makes a business instantly recognizable across every surface, even before you read the name." },
      { type: "h2", text: "Which do you need?" },
      { type: "ul", items: [
        "Just launching and testing: a strong logo gets you moving.",
        "Growing and showing up in many places: invest in a brand system so everything stays consistent.",
      ] },
      { type: "p", text: "We do both. Logos start at $45 and full brand systems build from there. If you are not sure which you need, that is a good first conversation to have." },
    ],
  },
  {
    slug: "how-long-does-a-logo-and-website-take",
    title: "How Long Does It Take to Design a Logo or Build a Website?",
    excerpt:
      "Realistic timelines for logos, brand systems, and websites in 2026, what each stage involves, and the one thing that slows every project down.",
    date: "2026-06-29",
    updated: "2026-06-29",
    readMins: 5,
    category: "Logo Design",
    keywords: [
      "how long does it take to design a logo",
      "logo design timeline",
      "how long does it take to build a website",
      "web design timeline",
    ],
    body: [
      { type: "p", text: "Once you know the budget, the next question is always the same: how soon can it be live? The honest answer is that good work takes as long as the decisions take. Here are realistic ranges for the projects we run most, and what actually drives them." },
      { type: "h2", text: "Logo design timeline" },
      { type: "ul", items: [
        "Single clean mark: 2 to 5 days. One concept direction, a couple of revisions.",
        "Logo system: 1 to 2 weeks. Primary, secondary, and responsive variations.",
        "Full brand identity: 2 to 4 weeks. Logo plus color, type, and usage guidelines.",
      ] },
      { type: "p", text: "Most of that time is not drawing. It is research, exploring directions, and the back-and-forth of revisions. A tight brief and one clear decision-maker can cut the calendar time in half." },
      { type: "h2", text: "Website timeline" },
      { type: "ul", items: [
        "Landing page: 3 to 7 days. One focused page built to convert.",
        "Business site with a CMS: 2 to 4 weeks. Multiple page types, motion, SEO.",
        "Custom build or store: 4 to 8 weeks and up, driven by features and integrations.",
      ] },
      { type: "p", text: "Page count barely matters. What matters is the number of unique page types, the integrations (payments, auth, booking, CRM), and how ready your content is. Waiting on copy and images is the most common delay we see." },
      { type: "h2", text: "What slows every project down" },
      { type: "p", text: "It is rarely the work itself. It is slow feedback, too many decision-makers, and content that is not ready. Projects move fast when one person can approve, feedback is specific, and the copy and assets exist before we start." },
      { type: "h2", text: "How we keep it on schedule" },
      { type: "p", text: "We give you a timeline before the project starts, with clear stages and review points, so you always know what is next. If you have a hard launch date, tell us up front and we will scope the work to hit it. For where the money goes, read our guides on logo cost and website cost." },
    ],
  },
  {
    slug: "ai-agents-vs-chatbots",
    title: "AI Agents vs Chatbots: What Is the Difference?",
    excerpt:
      "Chatbots and AI agents are not the same thing, and confusing them wastes money. Here is the real difference and how to pick the right one in 2026.",
    date: "2026-06-29",
    updated: "2026-06-29",
    readMins: 5,
    category: "Agentic AI",
    keywords: [
      "AI agents vs chatbots",
      "difference between AI agent and chatbot",
      "ai agent vs chatbot for business",
    ],
    body: [
      { type: "p", text: "The terms get used interchangeably in 2026, but they describe very different tools. A chatbot replies to you. An AI agent works for you. Picking the wrong one is why so many businesses pay for AI that never earns its place." },
      { type: "h2", text: "What a chatbot is" },
      { type: "p", text: "A traditional chatbot follows a script: buttons, commands, and if-then rules. It is great for a service menu, booking a consultation, collecting contact details, or answering the same handful of questions. It is reactive and predictable, and it does not improvise." },
      { type: "h2", text: "What an AI agent is" },
      { type: "p", text: "An AI agent combines a language model with memory, access to your data, and real tools. It can read a request, look something up in a knowledge base, call an action, check the result, and either complete the task or hand off cleanly to a human. It reasons through multi-step work instead of matching a script." },
      { type: "h2", text: "The difference in practice" },
      { type: "ul", items: [
        "A chatbot says: press 1 for sales, 2 for support.",
        "An agent reads the message, finds the answer in your content, and takes the next step.",
        "Chatbots handle a narrow slice of questions well; agents handle the messy ones that do not fit a button.",
        "Agents know their limits and route to a person when they should.",
      ] },
      { type: "h2", text: "Which does your business need?" },
      { type: "p", text: "If your queries are simple and repetitive, a chatbot is cheaper and perfectly fine. If customers ask things that need real answers from your data, or you want to automate actual work like lookups, qualifying leads, and bookings, an agent pays for itself. Many businesses run a hybrid: scripted flows for the simple paths, an agent for everything else." },
      { type: "h2", text: "Where to start" },
      { type: "p", text: "Still deciding whether you need one at all? Read our guide on whether your business actually needs an AI chatbot. When you are ready, AI agents with us start at $300. Tell us the workflow and we will tell you honestly which one fits." },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function allPostsByDate(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

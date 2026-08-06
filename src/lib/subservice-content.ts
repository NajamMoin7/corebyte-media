// Unique, keyword-aware content for each sub-service page so the 66 templated
// pages are not near-duplicates. Each entry: a short intro (search-intent
// matched), three concrete "what's included" items, and one QA block (kept for
// AI-engine citation value; Google retired FAQ rich results in 2026).
export type SubContent = {
  intro: string;
  includes: [string, string, string];
  faq: { q: string; a: string };
};

export const subServiceContent: Record<string, SubContent> = {
  // ---------- Logo Design ----------
  "abstract-logos": {
    intro:
      "Abstract logo design turns an idea into a symbol instead of a literal picture. We use abstract marks when a brand wants to feel modern, own a distinct shape, and avoid looking like every competitor in the category.",
    includes: ["3 to 4 abstract concept directions", "Geometry and grid construction", "Color and mono versions with usage rules"],
    faq: { q: "When is an abstract logo the right choice?", a: "When you want a unique, scalable symbol that is not tied to one product or industry cliche, and that still works at favicon size. Abstract marks age well and adapt as the business grows." },
  },
  "minimal-logos": {
    intro:
      "Minimal logo design strips a mark down to only what it needs. Fewer details mean it stays sharp on a phone screen, an app icon, and a sign, which is why minimal logos are the safest long-term choice for most small businesses.",
    includes: ["Clean, reduced concepts", "Single-color and reversed versions", "Favicon and app-icon crops"],
    faq: { q: "Do minimal logos look generic?", a: "Not when the underlying idea is strong. Minimal means simple, not empty. We build a clear concept first, then remove everything that does not serve it." },
  },
  "wordmark-lettermark": {
    intro:
      "A wordmark or lettermark makes the name itself the logo. It is ideal when the business name is short, distinctive, or worth reinforcing, and it removes the need to explain a separate symbol.",
    includes: ["Custom or refined lettering", "Wordmark plus initials lockup", "Spacing and alignment rules"],
    faq: { q: "Wordmark or lettermark, which do I need?", a: "Use a wordmark when the full name is short and memorable. Use a lettermark (initials) when the name is long. We often deliver both so you have a compact mark for small spaces." },
  },
  "monogram-logos": {
    intro:
      "Monogram logo design locks your initials into one memorable symbol. Monograms give a brand a compact, premium mark that works where the full name will not fit, like social avatars and app icons.",
    includes: ["Interlocking initial concepts", "Standalone monogram plus full lockup", "Avatar and stamp variants"],
    faq: { q: "Are monogram logos good for small businesses?", a: "Yes. A monogram gives you a recognizable icon for profiles and favicons while keeping a formal, established feel that suits service businesses and personal brands." },
  },
  "mascot-logos": {
    intro:
      "Mascot and character logos give a brand a face and personality. They build warmth and recognition fast, which is why they work for food, sports, kids, and community-driven businesses.",
    includes: ["Character concept and design", "Expression or pose variations", "Simplified icon version for small sizes"],
    faq: { q: "Do mascot logos scale down?", a: "We always design a simplified version of the character or a paired badge so the brand stays legible at small sizes where full detail would disappear." },
  },
  "emblem-badge-logos": {
    intro:
      "Emblem and badge logos contain the name and symbol inside one shape, giving a heritage, crafted, or official feel. They suit coffee shops, breweries, schools, and trades that want a stamp of quality.",
    includes: ["Crest or badge concept", "Detailed and simplified versions", "Single-color stamp for print and merch"],
    faq: { q: "Do badge logos work on websites?", a: "We pair the detailed badge with a simplified version so it reads cleanly in a header, favicon, or app icon where fine detail would be lost." },
  },
  "logo-redesign": {
    intro:
      "A logo redesign modernizes an existing mark without throwing away the recognition you have earned. We evolve what is working and fix what is dating the brand, so customers still know it is you.",
    includes: ["Audit of the current mark", "Evolved concepts that keep equity", "Full updated file package and rollout guide"],
    faq: { q: "Will a redesign confuse my existing customers?", a: "Not if it is an evolution rather than a reinvention. We keep the recognizable cues and modernize execution, so the brand feels fresh but familiar." },
  },
  "responsive-logo-systems": {
    intro:
      "A responsive logo system is a family of marks that adapts from a billboard down to a favicon. Instead of forcing one logo everywhere, you get the right version for every size and context.",
    includes: ["Primary, compact, and icon marks", "Clear-space and minimum-size rules", "Full export set for web and print"],
    faq: { q: "Why do I need more than one version of my logo?", a: "A logo with fine detail breaks down at small sizes. A responsive system gives you a simplified mark for favicons and apps and a full mark for large formats, all clearly on brand." },
  },

  // ---------- Graphic Design ----------
  "brand-identity-systems": {
    intro:
      "A brand identity system is the full visual language around your logo: type, color, grid, and imagery, plus the rules that keep them consistent. It is what makes a small business look established across its website, social, and print.",
    includes: ["Color and typography system", "Layout grids and components", "Core templates and asset starter set"],
    faq: { q: "What is the difference between a logo and a brand identity?", a: "A logo is one mark. A brand identity is the whole system around it that keeps everything you publish consistent. The logo is a piece of the identity, not the other way around." },
  },
  "brand-guidelines": {
    intro:
      "A brand guideline book is the single source of truth that keeps every team and freelancer on brand. It documents how the logo, color, type, and imagery should and should not be used.",
    includes: ["Logo usage and clear space", "Color and type specifications", "Do and do-not examples"],
    faq: { q: "How long should brand guidelines be?", a: "Long enough to remove guesswork, not so long no one reads them. For most small businesses a focused 15 to 30 page guide covering logo, color, type, and layout is enough." },
  },
  "stationery-design": {
    intro:
      "Stationery design covers the everyday brand touchpoints, designed as a coordinated set. Consistent stationery signals that a business is organized and trustworthy before a word is read.",
    includes: ["Business card and letterhead", "Envelope and compliment slip", "Print-ready files and specs"],
    faq: { q: "Is printed stationery still worth it?", a: "For client-facing and local businesses, yes. A well-designed card or letterhead is a cheap, high-impact trust signal in person and by mail." },
  },
  "business-cards": {
    intro:
      "Business card design is a small surface that still sets the tone for the whole brand. We design cards that are legible, on brand, and built correctly for print so they come back from the printer right the first time.",
    includes: ["Front and back layout", "Finish and stock recommendations", "Print-ready file with bleed"],
    faq: { q: "What information should a business card include?", a: "Name, role, one phone, one email, and the website. Keep it minimal so the most important contact method stands out instead of competing with five others." },
  },
  "letterheads-invoices": {
    intro:
      "Letterhead and invoice design make the unglamorous documents look professional and on brand. Every invoice and letter is a touchpoint, and a consistent one reinforces that you run a tidy business.",
    includes: ["Letterhead template", "Branded invoice and quote layout", "Editable Word, Google Docs, or PDF files"],
    faq: { q: "Can you make editable invoice templates?", a: "Yes. We deliver templates your team can edit in Word, Google Docs, or your accounting tool so every document stays on brand without a designer." },
  },
  "email-signatures": {
    intro:
      "A branded email signature gives every person in the company a consistent, professional sign-off. It is one of the most-seen brand assets you own and one of the most often overlooked.",
    includes: ["HTML signature template", "Logo, links, and disclaimer", "Setup guide for Gmail and Outlook"],
    faq: { q: "Why use a designed email signature?", a: "Your team sends thousands of emails. A consistent signature turns each one into a small brand impression and a working link back to your site." },
  },
  "menu-card-design": {
    intro:
      "Menu card design makes a menu easy to read and clearly on brand. Good menu design guides the eye to the items you want to sell and holds up to the wear of a real restaurant.",
    includes: ["Print or digital menu layout", "Section and pricing structure", "Print-ready and update-friendly files"],
    faq: { q: "Can the menu be easy to update?", a: "Yes. We build menus so prices and items can be swapped without breaking the layout, and can deliver a QR-ready digital version alongside print." },
  },
  "flyers-brochures": {
    intro:
      "Flyer and brochure design carries your message and your brand into the physical world. We design print pieces that are clear at a glance and built correctly for the printer.",
    includes: ["Flyer or multi-fold brochure", "Copy layout and hierarchy", "Print-ready files with bleed and crops"],
    faq: { q: "What size and fold should I use?", a: "It depends on the content and budget. We recommend the format during the brief, from a simple A5 flyer to a tri-fold or gatefold brochure." },
  },
  "posters-banners": {
    intro:
      "Poster and banner design is built to be seen from across the room. Large-format design has different rules than screen design, and we set up files at the right scale and resolution for clean printing.",
    includes: ["Large-format layout", "High-resolution print setup", "Files for print or wide-format"],
    faq: { q: "Will my logo look sharp at large sizes?", a: "Yes, when we work from vector artwork. We set up large-format files at the correct scale so type and logo stay crisp at any size." },
  },
  "packaging-labels": {
    intro:
      "Packaging and label design has to sell on a crowded shelf and survive the supply chain. We design packaging that stands out, communicates fast, and meets print and regulatory requirements.",
    includes: ["Packaging or label artwork", "Dieline and print setup", "Mockups and production-ready files"],
    faq: { q: "Do you handle dielines and print specs?", a: "Yes. We work to your printer's dieline and specifications so the artwork fits the box or label exactly and prints without surprises." },
  },
  "signage-environmental": {
    intro:
      "Signage and environmental graphics extend the brand into physical space, from storefronts to wayfinding. Clear signage helps people find you and reinforces the brand at the moment of arrival.",
    includes: ["Signage or wayfinding design", "Scaled, production-ready artwork", "Material and install guidance"],
    faq: { q: "Can you design for a specific sign maker?", a: "Yes. We set up artwork to your fabricator's specs and materials so what gets installed matches the design." },
  },
  "social-media-kits": {
    intro:
      "A social media kit gives your team templates that keep the feed consistent and fast to produce. Instead of designing every post from scratch, you fill in a system that already looks on brand.",
    includes: ["Post and story templates", "Highlight covers and grid system", "Editable Canva or Figma files"],
    faq: { q: "Can my team edit the templates without a designer?", a: "Yes. We deliver editable templates in Canva or Figma so anyone can produce on-brand posts quickly." },
  },
  "ad-creatives": {
    intro:
      "Ad creative is built to test and scale on paid channels. We design ad sets with clear hierarchy and variations so you can find what converts and turn off what does not.",
    includes: ["Static and animated ad sets", "Multiple sizes per platform", "Variations for A/B testing"],
    faq: { q: "How many ad variations do I need?", a: "Enough to test one variable at a time. We usually deliver several hooks and formats per concept so you can learn fast and scale the winner." },
  },
  "pitch-sales-decks": {
    intro:
      "Pitch and sales deck design makes the argument and looks expensive doing it. A clear, well-designed deck keeps investors and clients focused on the story instead of fighting the slides.",
    includes: ["Slide system and master template", "Data and diagram design", "Editable PowerPoint or Google Slides"],
    faq: { q: "Can you design and keep the deck editable?", a: "Yes. We build a reusable template in PowerPoint or Google Slides so you can update content for each pitch while staying on brand." },
  },
  "infographics-data-viz": {
    intro:
      "Infographic and data visualization design makes complex information clear and on brand. Good data viz turns numbers into something an audience understands and remembers.",
    includes: ["Chart and diagram design", "Data storytelling layout", "Editable and export-ready files"],
    faq: { q: "Can you turn our data into clear visuals?", a: "Yes. Share the data and the takeaway, and we design charts and infographics that make the point obvious at a glance." },
  },
  "merch-apparel-graphics": {
    intro:
      "Merch and apparel graphics are built for fabric and the real world, not just the screen. We design merch that people actually want to wear and that prints cleanly on garments.",
    includes: ["Apparel or merch artwork", "Print-method-ready files", "Color and placement specs"],
    faq: { q: "Do you set up files for screen printing?", a: "Yes. We prepare artwork for the print method, whether screen print, DTG, or embroidery, with the right colors and placement." },
  },

  // ---------- Web Development ----------
  "landing-pages": {
    intro:
      "A landing page is a single-purpose page built to convert, fast. We design and build landing pages in Next.js that load quickly, focus on one action, and are ready for your ad or launch traffic.",
    includes: ["Conversion-focused single page", "Mobile-first responsive build", "Analytics and lead form wired in"],
    faq: { q: "How fast can a landing page go live?", a: "Often within a few days once we have copy and assets. Landing pages start at $200 and are scoped to the single goal you care about." },
  },
  "marketing-websites": {
    intro:
      "A marketing website tells your story across multiple pages and is built to rank. We build fast, SEO-ready marketing sites in Next.js with a CMS so your team can update content without a developer.",
    includes: ["Multi-page responsive site", "CMS for self-editing", "On-page SEO and analytics setup"],
    faq: { q: "Will my team be able to edit the site?", a: "Yes. We connect a headless CMS so your team can edit pages, posts, and content without touching code." },
  },
  "portfolio-agency-sites": {
    intro:
      "A portfolio or agency website is where the craft is the pitch. We build showcase sites with the motion and polish that make prospective clients trust you before they ever get in touch.",
    includes: ["Case study and work layouts", "Motion and interaction", "CMS for adding new projects"],
    faq: { q: "Can I add new projects myself?", a: "Yes. We structure the site so you can add case studies and work through a CMS without rebuilding pages." },
  },
  "webgl-3d-experiences": {
    intro:
      "WebGL and 3D experiences add real-time, scroll-driven moments that make a site feel premium. We use 3D where it earns attention and supports the message, not as decoration that slows the page.",
    includes: ["Real-time 3D or WebGL scene", "Scroll and interaction design", "Performance-tuned implementation"],
    faq: { q: "Will 3D slow down my site?", a: "Not when it is built carefully. We optimize assets and load 3D responsibly so the experience stays smooth and Core Web Vitals stay healthy." },
  },
  "animation-interaction": {
    intro:
      "Animation and interaction design uses motion to communicate, not to show off. We add purposeful motion that guides attention, explains, and makes a site feel alive without hurting performance.",
    includes: ["Scroll and hover interactions", "Page and element transitions", "Reduced-motion accessibility support"],
    faq: { q: "Is animation bad for accessibility?", a: "Only when it ignores user preferences. We respect reduced-motion settings so animation enhances the experience without causing problems." },
  },
  "wordpress-development": {
    intro:
      "WordPress development done right means a custom theme and a CMS your team can actually run. We build fast, secure WordPress sites without the bloat of stacked page-builder plugins.",
    includes: ["Custom theme build", "Editable content blocks", "Performance and security setup"],
    faq: { q: "Can you make WordPress fast?", a: "Yes. With a custom theme, careful plugin choices, and caching, WordPress can score well on Core Web Vitals instead of crawling." },
  },
  "webflow-nocode": {
    intro:
      "Webflow and no-code builds give you a fast, editable site without a heavy custom build. They suit marketing sites where your team wants to make changes visually after launch.",
    includes: ["Webflow or no-code build", "CMS collections setup", "Editor training for your team"],
    faq: { q: "Should I use Webflow or a custom Next.js site?", a: "Webflow is great for marketing sites your team edits often. Custom Next.js wins when you need apps, complex logic, or maximum performance. We help you choose." },
  },
  "headless-cms": {
    intro:
      "A headless CMS connects an editor-friendly backend to a fast custom front end. You get the speed of a modern stack with the easy content editing of a traditional CMS.",
    includes: ["Sanity, Contentful, or similar setup", "Content models and schemas", "Front-end integration"],
    faq: { q: "What is a headless CMS?", a: "It separates where you write content from where it is displayed, so your team edits in a friendly dashboard while the site stays fast and flexible." },
  },
  "blog-content-platforms": {
    intro:
      "A blog or content platform built for SEO and scale turns content into a traffic channel. We build publishing setups with clean structure, fast pages, and schema so posts can rank and get cited.",
    includes: ["Article and category templates", "SEO and structured data", "Author and content workflow"],
    faq: { q: "Will the blog be good for SEO?", a: "Yes. We build clean URLs, fast pages, structured data, and an internal linking structure so content has the technical foundation to rank." },
  },
  "multilingual-sites": {
    intro:
      "Multi-language sites localize the experience for every market you serve. We build internationalized sites with correct language routing and hreflang so each version is found by the right audience.",
    includes: ["Language routing and structure", "Hreflang and SEO setup", "Translation-ready content model"],
    faq: { q: "Do you handle hreflang correctly?", a: "Yes. We implement hreflang and locale routing properly so search engines serve the right language version and you avoid duplicate-content issues." },
  },
  "shopify-stores": {
    intro:
      "Shopify store design and development gives you a custom storefront that sells and stays maintainable. We build Shopify themes that are fast, on brand, and easy for your team to run day to day.",
    includes: ["Custom Shopify theme", "Product and collection templates", "Checkout and app configuration"],
    faq: { q: "Custom theme or a template?", a: "A template is cheaper to start; a custom theme gives you a unique store and better conversion control. We advise based on your catalog and budget." },
  },
  "headless-ecommerce": {
    intro:
      "Headless e-commerce puts a fast custom front end in front of a commerce backend like Shopify or commercetools. It is the route to a storefront that is both unique and extremely fast.",
    includes: ["Custom storefront front end", "Commerce backend integration", "Cart, checkout, and performance work"],
    faq: { q: "When is headless e-commerce worth it?", a: "When you have the volume to justify it and want a storefront that is faster and more custom than a standard theme allows. We help you weigh the tradeoff." },
  },
  "b2b-wholesale-ordering": {
    intro:
      "Wholesale and B2B ordering tools fit how you actually sell: bulk pricing, net terms, and account-specific catalogs. We build ordering experiences that remove friction for repeat business buyers.",
    includes: ["Account-based pricing", "Bulk and reorder flows", "Net terms and quote support"],
    faq: { q: "Can you support customer-specific pricing?", a: "Yes. We build B2B flows with account-level pricing, bulk ordering, and terms so wholesale buyers get an experience built for them." },
  },
  "subscriptions-memberships": {
    intro:
      "Subscription and membership flows build recurring revenue the right way. We implement signup, billing, and gated access that are reliable and clear for both you and your customers.",
    includes: ["Subscription signup and billing", "Member access and gating", "Plan and upgrade flows"],
    faq: { q: "Which billing provider do you use?", a: "Usually Stripe, wired in cleanly and securely. We build the subscription logic and access control around it to fit your product." },
  },
  "payment-integrations": {
    intro:
      "Payment integration means connecting Stripe and similar providers cleanly and securely. We handle the flows, edge cases, and webhooks so payments just work and reconcile correctly.",
    includes: ["Stripe or provider integration", "Checkout and webhook handling", "Secure, tested payment flows"],
    faq: { q: "Is the payment integration secure?", a: "Yes. We use the provider's hosted, PCI-compliant components and handle webhooks and edge cases so transactions are reliable and secure." },
  },
  "web-apps-dashboards": {
    intro:
      "Web apps and dashboards are data-dense product interfaces that have to stay fast and usable. We build app UI in React and Next.js that handles real data volumes without becoming slow or confusing.",
    includes: ["App UI and component system", "Data tables, charts, and filters", "Auth and role-based access"],
    faq: { q: "Can you build the front end for our app?", a: "Yes. We specialize in fast, usable product interfaces, from dashboards to full app front ends, wired to your APIs." },
  },
  "saas-frontends": {
    intro:
      "A SaaS product front end is the interface layer of your product, built to scale. We build maintainable, component-driven front ends that keep up as your product and team grow.",
    includes: ["Design system and components", "App shell and navigation", "API integration and state"],
    faq: { q: "Do you work with our existing backend?", a: "Yes. We build the front end against your API and team, whether that is REST, GraphQL, or a backend-as-a-service." },
  },
  "api-backend-integration": {
    intro:
      "API and backend integration connects your front end to the systems that run the business. We wire sites and apps to your CRM, database, and third-party services reliably.",
    includes: ["API and service integration", "Data syncing and webhooks", "Error handling and monitoring"],
    faq: { q: "Can you connect our site to our CRM and tools?", a: "Yes. We integrate the services your business runs on, with proper error handling and monitoring so data stays in sync." },
  },
  "auth-user-systems": {
    intro:
      "Authentication and user systems handle sign-in, roles, and accounts securely. We implement auth that is safe, smooth for users, and ready for the permissions your product needs.",
    includes: ["Sign-in and signup flows", "Roles and permissions", "Secure session handling"],
    faq: { q: "Which auth approach do you use?", a: "We use proven providers and patterns suited to your stack, from managed auth services to custom flows, always prioritizing security." },
  },
  "performance-seo": {
    intro:
      "Performance and technical SEO work covers the wins that make a site fast and findable: Core Web Vitals, structured data, and clean indexable markup. It is what turns a good-looking site into one that ranks.",
    includes: ["Core Web Vitals optimization", "Structured data and metadata", "Crawl, index, and sitemap setup"],
    faq: { q: "Can you improve an existing site's Core Web Vitals?", a: "Yes. We audit LCP, INP, and CLS, then fix the heaviest offenders so field scores move into the green." },
  },
  "maintenance-support": {
    intro:
      "Maintenance and support keep a site healthy after launch so it keeps earning its keep. We handle updates, fixes, and improvements on an ongoing basis so nothing breaks quietly.",
    includes: ["Updates and security patches", "Monitoring and fixes", "Ongoing improvements"],
    faq: { q: "Do you offer ongoing support after launch?", a: "Yes. Most clients move to a monthly retainer for updates, monitoring, and improvements once the site is live." },
  },

  // ---------- Agentic AI ----------
  "website-chatbots": {
    intro:
      "A website chatbot answers questions, qualifies visitors, and routes them to the right next step, day or night. We build AI chatbots grounded in your real content so they help instead of frustrate.",
    includes: ["Knowledge-grounded answers", "Lead qualification and routing", "Human handoff and analytics"],
    faq: { q: "How is this different from a basic chat widget?", a: "A basic widget waits for a human. Our AI chatbots actually answer using your content, qualify the visitor, and capture the lead, then hand off cleanly when needed." },
  },
  "whatsapp-chatbots": {
    intro:
      "A WhatsApp chatbot meets customers in the app they already use all day. We build automated WhatsApp conversations that answer, qualify, and book, so you capture leads where they are most responsive.",
    includes: ["WhatsApp Business API setup", "Automated qualifying conversations", "Lead capture and handoff"],
    faq: { q: "Do I need the WhatsApp Business API?", a: "For automated business messaging, yes. We handle the setup and build the conversation flow so the bot works within WhatsApp's rules." },
  },
  "instagram-messenger-bots": {
    intro:
      "Instagram and Messenger bots handle social DMs automatically and on brand. They reply to common questions instantly so interested followers do not go cold while they wait.",
    includes: ["DM automation flows", "FAQ and lead capture", "Human handoff for complex chats"],
    faq: { q: "Can a bot handle Instagram DMs?", a: "Yes. We automate the common questions and lead capture in DMs while routing anything complex to a person, so no message goes unanswered." },
  },
  "slack-discord-bots": {
    intro:
      "Slack and Discord bots get real work done inside the tools your team and community already live in. From internal helpers to community moderation, we build bots that act, not just chat.",
    includes: ["Slash commands and actions", "Tool and data integrations", "Permissions and logging"],
    faq: { q: "What can a Slack or Discord bot do for us?", a: "Anything from answering internal questions from your docs to triggering workflows and posting updates. We scope it to the tasks worth automating." },
  },
  "telegram-bots": {
    intro:
      "Telegram bots are fast and scriptable, ideal for support, alerts, and automation. We build Telegram bots that handle conversations and trigger actions reliably at scale.",
    includes: ["Conversation and command flows", "Notifications and alerts", "Backend and tool integration"],
    faq: { q: "Are Telegram bots good for support?", a: "Yes. Telegram is fast and flexible, and a well-built bot can handle FAQs, alerts, and automated actions for support and operations." },
  },
  "leadgen-booking-bots": {
    intro:
      "Lead-gen and booking bots capture, qualify, and book appointments without a human in the loop. They turn website and ad traffic into booked calls while you sleep.",
    includes: ["Qualification questions", "Calendar and booking integration", "CRM lead capture"],
    faq: { q: "Can the bot book appointments directly?", a: "Yes. We connect it to your calendar so qualified leads book a time on the spot, and the details land in your CRM automatically." },
  },
  "customer-support-agents": {
    intro:
      "Customer support agents resolve tickets end to end and escalate with context when needed. They cut response times and free your team from repetitive questions.",
    includes: ["Knowledge-grounded resolutions", "Ticketing and tool integration", "Context-rich escalation"],
    faq: { q: "Will an AI agent replace my support team?", a: "It handles the repetitive volume so your team focuses on the hard cases. When it escalates, it passes full context so customers never repeat themselves." },
  },
  "sales-outreach-agents": {
    intro:
      "Sales and outreach agents research prospects, personalize messages, and follow up consistently. They keep the top of your funnel moving without manual busywork.",
    includes: ["Prospect research and enrichment", "Personalized message drafting", "Follow-up sequencing"],
    faq: { q: "Is automated outreach spammy?", a: "Not when it is genuinely personalized and targeted. We build agents that research and tailor each message, with you in control of approval and tone." },
  },
  "research-analyst-agents": {
    intro:
      "Research and analyst agents gather information, synthesize it, and report back. They compress hours of manual research into minutes for market, competitor, and internal analysis.",
    includes: ["Source gathering and synthesis", "Structured reporting", "Scheduled or on-demand runs"],
    faq: { q: "Can an agent monitor competitors or a market?", a: "Yes. We build agents that gather from your chosen sources, synthesize the findings, and deliver a structured report on a schedule or on demand." },
  },
  "voice-agents": {
    intro:
      "Voice agents provide natural spoken interfaces for support and intake. They answer calls, gather information, and route or resolve, so callers are helped instead of held.",
    includes: ["Natural voice conversation", "Call routing and intake", "Backend and CRM integration"],
    faq: { q: "Do voice agents sound robotic?", a: "Modern voice models sound natural. We design the conversation and fallback handling so callers get help smoothly and reach a human when they should." },
  },
  "multi-agent-systems": {
    intro:
      "Multi-agent systems coordinate several specialized agents to divide and conquer complex work. When one agent is not enough, a team of them can plan, act, and check each other.",
    includes: ["Agent roles and orchestration", "Tool use and handoffs", "Guardrails and evaluation"],
    faq: { q: "When do I need multiple agents instead of one?", a: "When the task has distinct stages that benefit from specialization, like research then drafting then review. We design the orchestration so they work together reliably." },
  },
  "n8n-automation-agents": {
    intro:
      "n8n automation agents are tool-using agents orchestrated through n8n workflows. They combine AI decision-making with reliable, visual automation across your stack.",
    includes: ["n8n workflow design", "AI steps and tool nodes", "Error handling and monitoring"],
    faq: { q: "Why use n8n for AI automation?", a: "n8n gives you transparent, maintainable workflows you can see and edit, with AI steps where judgment is needed. It is reliable and avoids vendor lock-in." },
  },
  "make-zapier-workflows": {
    intro:
      "Make and Zapier workflows connect your stack with smart, automated flows. We design automations that move data and trigger actions between your tools without manual work.",
    includes: ["Workflow design and build", "App and API connections", "Testing and monitoring"],
    faq: { q: "Should I use Make, Zapier, or n8n?", a: "Zapier is simplest, Make is more powerful visually, n8n is best for complex or self-hosted needs. We pick based on your tools and budget." },
  },
  "document-email-automation": {
    intro:
      "Document and email automation lets agents draft, parse, and route the paperwork that eats your team's time. From inbound emails to generated documents, the busywork gets handled.",
    includes: ["Email parsing and routing", "Document drafting and generation", "Approval and filing flows"],
    faq: { q: "Can agents handle inbound email?", a: "Yes. We build flows that read, classify, and route inbound email, draft replies for approval, and file or extract data automatically." },
  },
  "crm-tool-integrations": {
    intro:
      "CRM and tool integrations wire agents into the systems your business actually runs on. The agent does not just chat; it updates records and triggers actions in your real tools.",
    includes: ["CRM read and write access", "Tool and API connections", "Sync and logging"],
    faq: { q: "Can the agent update our CRM?", a: "Yes. We give agents secure, scoped access to your CRM and tools so they create and update records as part of the workflow." },
  },
  "scheduled-event-agents": {
    intro:
      "Scheduled and event agents fire on a cron or a trigger and act autonomously. They handle recurring jobs and react to events without anyone pressing a button.",
    includes: ["Scheduled and triggered runs", "Autonomous task execution", "Alerts and logging"],
    faq: { q: "What can a scheduled agent do?", a: "Anything recurring or event-driven: daily reports, monitoring, follow-ups, or reacting to a webhook. It runs on its own and alerts you when needed." },
  },
  "rag-knowledge-assistants": {
    intro:
      "RAG knowledge assistants are grounded in your own docs and data, so answers are accurate instead of made up. They turn your knowledge base into an assistant your team or customers can ask.",
    includes: ["Document ingestion and indexing", "Retrieval-grounded answers", "Source citations and updates"],
    faq: { q: "How does RAG stop the AI from making things up?", a: "Retrieval-augmented generation grounds every answer in your actual documents and can cite the source, so responses stay accurate and verifiable." },
  },
  "custom-llm-integrations": {
    intro:
      "Custom LLM integrations wire the right model into your product cleanly. We help you choose and integrate the model that fits your task, cost, and privacy needs.",
    includes: ["Model selection and setup", "Prompt and output handling", "Cost and latency tuning"],
    faq: { q: "Which AI model is best for my product?", a: "It depends on the task, budget, and privacy needs. We benchmark options and integrate the model that gives the best result for your use case." },
  },
  "ai-content-pipelines": {
    intro:
      "AI content pipelines generate content at scale with a human in control. They speed up drafting and production while keeping quality and brand voice in your hands.",
    includes: ["Generation workflow", "Brand voice and guardrails", "Human review and publishing"],
    faq: { q: "Will AI content hurt my SEO?", a: "Not when a human reviews and adds real value. We build pipelines that accelerate drafting while keeping editorial control, so content stays useful and original." },
  },
  "ai-image-media-pipelines": {
    intro:
      "AI image and media pipelines produce on-brand visuals and media at scale. They cut production time for the repetitive visual work while keeping a consistent look.",
    includes: ["Generation and editing workflow", "Brand and style controls", "Batch and on-demand output"],
    faq: { q: "Can generated images stay on brand?", a: "Yes. We constrain the pipeline with your style, palette, and references so output stays consistent instead of random." },
  },
  "evals-guardrails-monitoring": {
    intro:
      "Evals, guardrails, and monitoring are the safety and quality layer that makes AI agents trustworthy. Before anyone relies on an agent, we measure it and put limits and oversight in place.",
    includes: ["Evaluation suites", "Guardrails and limits", "Monitoring and dashboards"],
    faq: { q: "How do you know an AI agent is reliable?", a: "We build evaluation tests and guardrails, then monitor real conversations. That way the agent is measured against real cases before and after launch, not just hoped to work." },
  },
};

export function getSubContent(slug: string): SubContent | undefined {
  return subServiceContent[slug];
}

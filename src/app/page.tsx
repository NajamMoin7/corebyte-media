import { HomeHero } from "@/components/sections/HomeHero";
import { ServicesScroll } from "@/components/sections/ServicesScroll";
import { ToolsMarquee } from "@/components/sections/ToolsMarquee";
import { WorkTeaser } from "@/components/sections/WorkTeaser";
import { StatsBand } from "@/components/sections/StatsBand";
import { ChatbotTeaser } from "@/components/sections/ChatbotTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { company } from "@/lib/site";

export default function Home() {
  return (
    <>
      <HomeHero />
      <ServicesScroll />
      <ToolsMarquee />
      <WorkTeaser />
      <StatsBand />
      <ChatbotTeaser />
      <Testimonials />
      <FAQ />

      {/* contact */}
      <section id="contact" className="border-t border-border py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <p className="eyebrow mb-5">Contact</p>
              <Reveal>
                <h2 className="font-display text-4xl font-black tracking-tight text-balance sm:text-5xl">
                  Have something in mind? Let&apos;s make it real.
                </h2>
              </Reveal>
              <p className="mt-6 max-w-md leading-relaxed text-fg-muted">
                Tell us what you&apos;re building. We read every enquiry and
                reply within two business days.
              </p>
              <div className="mt-6 flex flex-col gap-2 font-mono text-sm">
                <a
                  href={`mailto:${company.email}`}
                  className="text-accent transition-opacity hover:opacity-80"
                >
                  {company.email}
                </a>
                {company.phone && (
                  <a
                    href={company.phoneHref}
                    className="text-accent transition-opacity hover:opacity-80"
                  >
                    {company.phone}
                  </a>
                )}
              </div>
            </div>
            <div className="md:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

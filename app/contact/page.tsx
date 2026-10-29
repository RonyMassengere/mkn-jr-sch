import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { ContactForm } from '@/components/contact-form'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Mukono Junior School. Call, email, or send us a message — we would love to hear from you.',
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="We'd love to hear from you"
        description="Questions about admissions, a visit, or anything else? Reach out and our team will be glad to help."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="flex flex-col gap-5">
              <div className="relative overflow-hidden rounded-3xl bg-leaf-deep p-8 text-cream">
                <h2 className="font-display text-2xl font-800">Get in touch</h2>
                <p className="mt-2 text-sm leading-relaxed text-cream/80">
                  Our doors and phone lines are open to families and the wider
                  community.
                </p>

                <ul className="mt-7 space-y-5">
                  <li className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold text-charcoal">
                      <Phone className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs font-700 uppercase tracking-wide text-gold">
                        Call us
                      </p>
                      <div className="mt-1 flex flex-col">
                        {site.phones.map((p) => (
                          <a
                            key={p}
                            href={`tel:${p.replace(/\s/g, '')}`}
                            className="font-600 transition-colors hover:text-gold"
                          >
                            {p}
                          </a>
                        ))}
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold text-charcoal">
                      <Mail className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs font-700 uppercase tracking-wide text-gold">
                        Email us
                      </p>
                      <a
                        href={`mailto:${site.email}`}
                        className="mt-1 block font-600 transition-colors hover:text-gold"
                      >
                        {site.email}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold text-charcoal">
                      <MapPin className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs font-700 uppercase tracking-wide text-gold">
                        Visit us
                      </p>
                      <p className="mt-1 font-600">{site.location}</p>
                      <p className="text-sm text-cream/75">{site.poBox}</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold text-charcoal">
                      <Clock className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs font-700 uppercase tracking-wide text-gold">
                        School hours
                      </p>
                      <p className="mt-1 font-600">Monday – Friday</p>
                      <p className="text-sm text-cream/75">
                        Please call ahead to arrange a visit
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <div>
                    <h2 className="font-display text-xl font-800 text-primary">
                      Find our school
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {site.location}
                    </p>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=0.38786860090753267,32.76774394424458"
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 rounded-full bg-secondary px-4 py-2 text-xs font-800 text-secondary-foreground transition-transform hover:scale-105"
                  >
                    Open map
                  </a>
                </div>
                <iframe
                  title="Map showing Mukono Junior School in Takkajunge, Mukono, Uganda"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.4317248631041!2d32.76774394424458!3d0.38786860090753267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dc9000b891be3%3A0xb6f25ba42139b82d!2sMUKONO%20JUNIOR%20SCHOOL-%20TAKKAJUNGE!5e0!3m2!1sen!2sug!4v1789234698523!5m2!1sen!2sug"
                  className="h-64 w-full border-0 sm:h-72"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}

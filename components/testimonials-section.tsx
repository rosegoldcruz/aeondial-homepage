const testimonials = [
  {
    company: "Kingpin Install",
    quote:
      "We were tired of losing leads to dead air and slow follow-ups. AEONDial’s predictive dialer turned our outbound into a machine. Now, my guys are on live calls 90% of the day instead of staring at a keypad. It’s the closest thing to a 'money' button I’ve found.",
    byline: "Lead Coordinator, Kingpin Install",
  },
  {
    company: "G3 Home Remodels",
    quote:
      "Telephony used to be our biggest headache—hardware issues, dropped calls, and zero sync with our lead data. With AEONDial, we initialized our entire sales floor in minutes. The AI Whisper coaching is like having my best closer in every agent's ear at the same time.",
    byline: "Management, G3 Home Remodels",
  },
  {
    company: "Reface Kit",
    quote:
      "The scalability is what sold us. We started as a one-man army and scaled to a full-service operation without changing our tech stack once. AEONDial isn't just a phone system; it's the core of how we communicate with every customer.",
    byline: "Operations, Reface Kit",
  },
  {
    company: "Raw2Recruited",
    quote:
      "Recruiting is a numbers game, and AEONDial just gave us an unfair advantage. The speed at which we can cycle through candidates without losing that 'personal touch' thanks to the AI Whisper coaching is insane. We've doubled our daily placements since making the switch.",
    byline: "Founder, Raw2Recruited",
  },
  {
    company: "American MPS",
    quote:
      "When you're managing complex operations, you can't afford technical friction. AEONDial is the first telephony stack that actually stays out of the way and lets us work. It’s enterprise firepower that handles our heaviest days without breaking a sweat.",
    byline: "Operations, American MPS",
  },
]

export function TestimonialsSection() {
  const items = [...testimonials, ...testimonials]

  return (
    <section className="py-16 border-y border-border/40 bg-card/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-mono text-3xl font-bold tracking-tight sm:text-4xl">
          Trusted by the guys who actually close.
        </h2>

        <div className="relative mt-10 marquee">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

          <div className="overflow-hidden">
            <div className="marquee-track flex w-max gap-6 py-2">
              {items.map((item, index) => (
                <article
                  key={`${item.company}-${index}`}
                  className="w-[420px] rounded-2xl border border-border/60 bg-[#141414] p-6 shadow-lg shadow-black/20"
                >
                  <p className="font-mono text-sm uppercase tracking-wider text-accent">{item.company}</p>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">“{item.quote}”</p>
                  <p className="mt-4 text-sm font-medium text-foreground">— {item.byline}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee-scroll 70s linear infinite;
          will-change: transform;
        }

        .marquee:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}
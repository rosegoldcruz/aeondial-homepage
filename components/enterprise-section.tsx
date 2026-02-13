import { Building2, Shield, Headphones, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const enterpriseFeatures = [
  {
    icon: Building2,
    title: "Carrier-Grade Uptime",
    description: "99.99% SLA guarantee with multi-region failover so your floor never goes silent.",
  },
  {
    icon: Shield,
    title: "Total Compliance",
    description: "Built-in STIR/SHAKEN, TCPA, and HIPAA-ready infrastructure to keep your operation legal.",
  },
  {
    icon: Headphones,
    title: "Dedicated Account Stealth",
    description: "24/7 priority support with a dedicated engineer who knows your specific routing logic.",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "Deploy local presence in 100+ countries with ultra-low latency edge nodes.",
  },
]

const logos = ["Stripe", "Notion", "Linear", "Figma", "Vercel", "Supabase"]

export function EnterpriseSection() {
  return (
    <section id="enterprise" className="py-24 border-t border-border/40 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-accent">
            <Building2 className="h-4 w-4" />
            <span className="font-mono uppercase tracking-wider">Scale</span>
          </div>
          <h2 className="mt-4 font-mono text-3xl font-bold tracking-tight sm:text-4xl">Built for Massive Scale</h2>
          <p className="mt-4 text-muted-foreground">
            Trusted by high-volume operations to handle millions of minutes with enterprise-grade reliability and
            ironclad compliance.
          </p>
        </div>

        {/* Trusted by logos */}
        <div className="mx-auto mt-12 max-w-3xl">
          <p className="text-center text-sm text-muted-foreground mb-6">Trusted by industry leaders</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {logos.map((logo, index) => (
              <div key={index} className="font-mono text-lg font-semibold text-muted-foreground/60">
                {logo}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {enterpriseFeatures.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border border-border/60 bg-[#141414] p-6 transition-all duration-300 scale-100 hover:scale-105 hover:border-accent/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-mono text-sm font-semibold">{feature.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-accent/40 bg-gradient-to-b from-accent/10 to-transparent p-8 text-center sm:p-12">
          <h3 className="font-mono text-xl font-bold">Ready to scale?</h3>
          <p className="mt-4 text-muted-foreground">
            Talk to our sales team to learn how AEONDial can power your enterprise.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg">Contact Sales</Button>
            <Button size="lg" variant="outline">
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Check, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "For solo reps and early-stage outbound teams",
    features: ["1 user", "Local number", "Pay-per-minute calling", "Basic lead management", "Email support"],
    cta: "Start for Free",
    popular: false,
  },
  {
    name: "Professional",
    price: "$100",
    period: "/mo",
    description: "For sales teams running daily outbound at scale",
    features: [
      "Unlimited domestic calling",
      "AI call transcripts",
      "CRM sync",
      "Power dialer workflows",
      "Performance dashboards",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$333",
    period: "/mo",
    description: "For multi-team call centers with advanced needs",
    features: [
      "Multi-line power dialer",
      "Call recording storage",
      "Dedicated account manager",
      "SSO and role controls",
      "Custom onboarding",
      "SLA-backed support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 border-t border-border/40 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-accent">
            <DollarSign className="h-4 w-4" />
            <span className="font-mono uppercase tracking-wider">Pricing</span>
          </div>
          <h2 className="mt-4 font-mono text-3xl font-bold tracking-tight sm:text-4xl">Simple, transparent pricing</h2>
          <p className="mt-4 text-muted-foreground">Start free and scale as you grow. No hidden fees, no surprises.</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-xl border p-8 border-transparent ${
                plan.popular ? "border-accent bg-[#141414] shadow-lg shadow-accent/10" : "border-border/60 bg-[#0f0f0f]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full px-3 py-1 text-xs font-medium text-accent-foreground bg-accent">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="font-mono text-lg font-semibold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="font-mono text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-accent" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  className={`w-full ${plan.popular ? "" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
                  variant={plan.popular ? "default" : "secondary"}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

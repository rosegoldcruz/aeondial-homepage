"use client"

import { useState, useEffect } from "react"
import { Blocks } from "lucide-react"

const codeExamples = {
  framework: `const call = AEONDial.initiate({
  to: "+1234567890",
  agent: "Sales_Team_A",
  script: "Inbound_Lead_V2"
});

call.on('sentiment_alert', (data) => {
  crm.updateLead(data.leadId, { status: 'Hot' });
});`,

  ssr: `{
  "leadId": "LD-10932",
  "name": "Jordan Diaz",
  "phone": "+1234567890",
  "source": "Landing Page",
  "status": "New",
  "priority": "High",
  "assignedTo": "Sales_Team_A"
}`,

  env: `workflow.on('call_completed', async (event) => {
  if (event.outcome === 'Connected') {
    await crm.updateLead(event.leadId, {
      lastCallAt: event.endedAt,
      disposition: event.disposition,
      nextStep: 'Follow-up'
    });
  }
});`,

  cache: `analytics.today({
  team: "Sales_Team_A"
})

✓ Talk Time: +40%
✓ Connection Rate: 98%
✓ Lead Conversion: 3x`,
}

const features = [
  { key: "framework", label: "Call automation workflow" },
  { key: "ssr", label: "Lead object schema" },
  { key: "env", label: "CRM event sync" },
  { key: "cache", label: "Live sales metrics" },
] as const

export function CodeSection() {
  const [activeFeature, setActiveFeature] = useState<keyof typeof codeExamples>("framework")
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const fullText = codeExamples[activeFeature]
    setDisplayedText("")
    setIsTyping(true)

    let currentIndex = 0
    const typingSpeed = 8 // milliseconds per character

    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)
      }
    }, typingSpeed)

    return () => clearInterval(typeInterval)
  }, [activeFeature])

  return (
    <section id="built-for-react" className="py-24 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <div className="flex items-center justify-center gap-2">
            <Blocks className="h-4 w-4 text-accent" />
            <p className="text-sm font-medium uppercase tracking-wider text-accent">Built for Sales Automation</p>
          </div>
          <h2 className="mt-2 font-mono text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Workflow automation for every lead touchpoint
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            AEONDial gives reps and managers a single automation layer for calls, lead updates, and conversion-focused
            follow-up.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="flex flex-col-reverse md:flex-row md:gap-8">
            {/* Menu buttons - left side on tablet+ */}
            <div className="mt-8 md:mt-0 md:w-48 flex flex-col gap-3">
              {features.map((feature) => (
                <button
                  key={feature.key}
                  onClick={() => setActiveFeature(feature.key)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200 ${
                    activeFeature === feature.key
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border/60 bg-card/50 text-muted-foreground hover:border-accent/50 hover:text-foreground"
                  }`}
                >
                  {feature.label}
                </button>
              ))}
            </div>

            {/* Terminal - right side on tablet+ */}
            <div
              className="flex-1 overflow-hidden rounded-2xl border border-border/60"
              style={{ backgroundColor: "#141414" }}
            >
              <div
                className="flex h-10 items-center gap-2 border-b border-border/60 px-4"
                style={{ backgroundColor: "#1a1a1a" }}
              >
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-muted-foreground">terminal</span>
              </div>
              <pre className="overflow-x-auto overflow-y-auto p-6 h-[200px]" style={{ backgroundColor: "#0d0d0d" }}>
                <code className="font-mono text-sm text-muted-foreground">
                  {displayedText.split("\n").map((line, i) => (
                    <span key={i} className="block">
                      {line.startsWith("//") ? (
                        <span className="text-muted-foreground/60">{line}</span>
                      ) : line.startsWith("$") ? (
                        <span className="text-accent">{line}</span>
                      ) : line.startsWith("✓") ? (
                        <span className="text-green-400">{line}</span>
                      ) : line.includes(":") && !line.includes("//") ? (
                        <span className="text-foreground">{line}</span>
                      ) : (
                        <span className="text-foreground/80">{line}</span>
                      )}
                    </span>
                  ))}
                  {isTyping && <span className="inline-block w-2 h-4 bg-accent animate-pulse ml-0.5 align-middle" />}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

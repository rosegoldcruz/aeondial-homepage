"use client"

import { useEffect, useState } from "react"
import { Bolt, CheckCircle2, CircleDot, PhoneCall, CalendarCheck2 } from "lucide-react"
import { motion, useSpring } from "framer-motion"

const leadCards = [
  { name: "Jordan Diaz", industry: "Real Estate", score: "Hot", status: "Dialing" },
  { name: "Taylor Singh", industry: "Insurance", score: "Warm", status: "Connected" },
  { name: "Riley Brooks", industry: "HVAC", score: "Hot", status: "Booked" },
  { name: "Avery Chen", industry: "Dental", score: "Warm", status: "Follow-up" },
  { name: "Morgan Clark", industry: "Solar", score: "Hot", status: "Dialing" },
  { name: "Casey Moore", industry: "Legal", score: "Warm", status: "Connected" },
]

const waveformHeights = [22, 10, 28, 16, 24, 12, 30, 18, 26, 14, 22, 12]

function AutomatedPulseFlow() {
  return (
    <div className="rounded-2xl border border-border/60 bg-zinc-950 p-4 md:p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium">Automated Pulse</h3>
        <span className="text-xs text-zinc-400">Lead Sources → Hub → Sold</span>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
        <svg viewBox="0 0 740 240" className="h-[220px] w-full">
          <defs>
            <filter id="pulseBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.4" />
            </filter>
          </defs>

          <rect x="40" y="40" width="160" height="70" rx="12" fill="#171717" stroke="#3f3f46" />
          <rect x="40" y="130" width="160" height="70" rx="12" fill="#171717" stroke="#3f3f46" />
          <rect x="290" y="85" width="180" height="70" rx="12" fill="#171717" stroke="#52525b" />
          <rect x="560" y="85" width="140" height="70" rx="12" fill="#171717" stroke="#52525b" />

          <text x="120" y="80" textAnchor="middle" fill="#d4d4d8" fontSize="13">Facebook Ads</text>
          <text x="120" y="170" textAnchor="middle" fill="#d4d4d8" fontSize="13">Web Leads</text>
          <text x="380" y="125" textAnchor="middle" fill="#fb923c" fontSize="14">AEONDial Hub</text>
          <text x="630" y="125" textAnchor="middle" fill="#22c55e" fontSize="14">Sold</text>

          <path d="M200 75 C 245 75, 250 110, 290 120" fill="none" stroke="#3f3f46" strokeWidth="3" />
          <path d="M200 165 C 245 165, 250 130, 290 120" fill="none" stroke="#3f3f46" strokeWidth="3" />
          <path d="M470 120 L 560 120" fill="none" stroke="#3f3f46" strokeWidth="3" />

          <motion.path
            d="M200 75 C 245 75, 250 110, 290 120"
            fill="none"
            stroke="#f97316"
            strokeWidth="3"
            strokeDasharray="16 170"
            strokeLinecap="round"
            filter="url(#pulseBlur)"
            animate={{ strokeDashoffset: [180, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M200 165 C 245 165, 250 130, 290 120"
            fill="none"
            stroke="#f97316"
            strokeWidth="3"
            strokeDasharray="16 170"
            strokeLinecap="round"
            filter="url(#pulseBlur)"
            animate={{ strokeDashoffset: [180, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "linear", delay: 0.2 }}
          />
          <motion.path
            d="M470 120 L 560 120"
            fill="none"
            stroke="#f97316"
            strokeWidth="3"
            strokeDasharray="16 120"
            strokeLinecap="round"
            filter="url(#pulseBlur)"
            animate={{ strokeDashoffset: [130, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear", delay: 0.35 }}
          />

          <motion.circle
            cx="566"
            cy="120"
            r="5"
            fill="#22c55e"
            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </div>
  )
}

function LeadGoldmine() {
  return (
    <div className="rounded-2xl border border-border/60 bg-zinc-950 p-4 md:p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium">Lead Goldmine</h3>
        <span className="text-xs text-zinc-400">Live lead pipeline</span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {leadCards.map((lead) => (
          <div key={lead.name} className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3">
            <div className="text-sm font-medium text-zinc-100">{lead.name}</div>
            <div className="text-xs text-zinc-400">{lead.industry}</div>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="rounded bg-orange-500/15 px-2 py-0.5 text-orange-300">{lead.score}</span>
              <span className="text-zinc-300">{lead.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PowerDialerMockup() {
  const totalCalls = useSpring(1220, { stiffness: 70, damping: 22, mass: 0.6 })
  const [displayCalls, setDisplayCalls] = useState(1220)

  useEffect(() => {
    const unsubscribe = totalCalls.on("change", (value) => {
      setDisplayCalls(Math.floor(value))
    })

    return () => unsubscribe()
  }, [totalCalls])

  useEffect(() => {
    let current = 1220
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 25) + 12
      totalCalls.set(current)
    }, 1000)

    return () => clearInterval(interval)
  }, [totalCalls])

  return (
    <div className="rounded-2xl border border-border/60 bg-white/5 p-4 backdrop-blur md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium">Power Dialer</h3>
        <span className="text-xs text-green-400">Connected</span>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400">Total Calls</p>
            <p className="font-mono text-4xl font-semibold text-white">{displayCalls.toLocaleString()}</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-300">Live Queue</div>
        </div>

        <div className="mt-5 rounded-lg border border-zinc-800 bg-zinc-900/80 p-3">
          <div className="mb-2 text-xs text-zinc-400">Active Voice Waveform</div>
          <div className="flex h-10 items-end gap-1">
            {waveformHeights.map((height, index) => (
              <motion.span
                key={index}
                className="w-1.5 rounded bg-orange-500/90"
                animate={{ height: [6, height, 8, height * 0.7, 6] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: index * 0.05 }}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-2 text-xs text-zinc-300 sm:grid-cols-2">
          <div className="rounded-md border border-zinc-800 bg-zinc-900/70 px-3 py-2">Agent Status: Dialing + Connected</div>
          <div className="rounded-md border border-zinc-800 bg-zinc-900/70 px-3 py-2">Disposition Sync: Qualified</div>
        </div>
      </div>
    </div>
  )
}

export function CodeSection() {
  const latencySamples = [0.02, 0.03, 0.02, 0.04, 0.02]
  const [latencyIndex, setLatencyIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyIndex((prev) => (prev + 1) % latencySamples.length)
    }, 1100)

    return () => clearInterval(interval)
  }, [latencySamples.length])

  return (
    <section id="high-velocity" className="py-24 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <div className="flex items-center justify-center gap-2">
            <Bolt className="h-4 w-4 text-accent" />
            <p className="text-sm font-medium uppercase tracking-wider text-accent">The Engine</p>
          </div>
          <h2 className="mt-2 font-mono text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            High-Velocity Call Center in a Box
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every lead source, dial, qualification, and booking action moves through one instant automation engine.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-1.5 text-sm">
            <CircleDot className="h-3.5 w-3.5 text-orange-400" />
            <span className="font-mono text-zinc-200">{latencySamples[latencyIndex].toFixed(2)}ms Connection Time</span>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-6xl space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <AutomatedPulseFlow />
            <PowerDialerMockup />
          </div>

          <LeadGoldmine />

          <div className="grid gap-2 text-sm text-zinc-300 sm:grid-cols-3">
            <div className="rounded-xl border border-border/60 bg-card/50 px-4 py-3 flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-orange-400" />
              Instant Dial Speed
            </div>
            <div className="rounded-xl border border-border/60 bg-card/50 px-4 py-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              Qualified Outcomes
            </div>
            <div className="rounded-xl border border-border/60 bg-card/50 px-4 py-3 flex items-center gap-2">
              <CalendarCheck2 className="h-4 w-4 text-cyan-400" />
              Calendar-Ready Handoffs
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

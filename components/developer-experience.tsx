"use client"

import { useState, useEffect, useRef } from "react"
import { Check, Activity } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

const features = [
  "Auto-prioritize fresh leads by intent and source quality.",
  "Launch parallel dial streams with instant agent routing.",
  "Qualify, tag, and sync outcomes in one continuous flow.",
  "Book next steps the moment momentum appears on a call.",
]

const leadNames = ["Jordan Diaz", "Taylor Singh", "Riley Brooks", "Avery Chen", "Morgan Clark", "Casey Moore"]
const industries = ["Solar", "Legal", "Insurance", "HVAC", "Real Estate", "Dental"]
const durations = ["03:12", "05:41", "02:58", "04:26", "06:03"]
const appointments = ["10:30 AM", "1:15 PM", "2:45 PM", "4:00 PM", "9:20 AM"]

type FeedItem = {
  id: string
  line: string
}

function buildFeedLine(index: number) {
  const name = leadNames[index % leadNames.length]
  const industry = industries[index % industries.length]
  const duration = durations[index % durations.length]
  const appointment = appointments[index % appointments.length]

  const cycle = index % 3
  if (cycle === 0) return `🔥 New Lead: ${name} (${industry}) — Auto-dialing...`
  if (cycle === 1) return `✅ Call Connected: ${duration} — Lead Qualified.`
  return `📅 Calendar Sync: Appointment booked for ${appointment}.`
}

function LiveLeadFeed() {
  const [items, setItems] = useState<FeedItem[]>(() =>
    Array.from({ length: 4 }).map((_, idx) => ({
      id: `seed-${idx}`,
      line: buildFeedLine(idx),
    })),
  )

  useEffect(() => {
    let index = 4
    const interval = setInterval(() => {
      const nextItem = {
        id: `item-${index}-${Date.now()}`,
        line: buildFeedLine(index),
      }
      index += 1

      setItems((prev) => {
        const next = [nextItem, ...prev]
        return next.slice(0, 5)
      })
    }, 1800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-950/95 p-4">
      <div className="mb-3 flex items-center justify-between border-b border-zinc-800 pb-3">
        <span className="text-xs uppercase tracking-wider text-zinc-400">Live Activity Feed</span>
        <span className="text-[11px] text-orange-400">Streaming</span>
      </div>

      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="border-l-2 border-orange-500 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-200"
            >
              {item.line}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function DeveloperExperience() {
  const [hasAnimated, setHasAnimated] = useState(false)
  const [visibleChecks, setVisibleChecks] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return

    setVisibleChecks([])

    features.forEach((_, index) => {
      setTimeout(
        () => {
          setVisibleChecks((prev) => [...prev, index])
        },
        1000 + index * 150,
      )
    })
  }, [hasAnimated])

  return (
    <section ref={sectionRef} id="developer-experience" className="border-y border-border/40 bg-card/30 py-24 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-accent" />
              <p className="font-mono text-sm font-medium uppercase tracking-wider text-accent">High Velocity</p>
            </div>
            <h2 className="mt-2 font-mono text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              A high-velocity call center in a box
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Capture new leads, connect in seconds, and push qualified conversations straight to the calendar without
              slowing your team down.
            </p>
            <ul className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 transition-all duration-300 ${
                      visibleChecks.includes(index) ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }`}
                  >
                    <Check className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="aspect-video">
              <LiveLeadFeed />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

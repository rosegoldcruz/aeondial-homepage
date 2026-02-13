"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Zap,
  TrendingUp,
  Brain,
  ArrowUpRight,
  Globe,
  Clock,
} from "lucide-react"

const DASHBOARD_ANIMATION_KEY = "aeondial-dashboard-animations-played"

interface GridDot {
  x: number
  y: number
  direction: "horizontal" | "vertical"
  speed: number
  size: number
  opacity: number
  color: string
  targetX: number
  targetY: number
  phase: number
  trail: { x: number; y: number }[]
}

interface GridBurst {
  x: number
  y: number
  life: number
  maxLife: number
  size: number
}

export function HeroSection() {
  const [codeLineIndex, setCodeLineIndex] = useState(0)
  const [displayedText1, setDisplayedText1] = useState("")
  const [displayedText2, setDisplayedText2] = useState("")
  const [isTypingDone, setIsTypingDone] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const [dashboardAnimated, setDashboardAnimated] = useState(false)

  const text1 = "Talk more."
  const text2 = "Close faster."

  const codeLines = [
    "import { createClient } from '@AEONDial/sdk'",
    "import { cache } from 'react'",
    "",
    "const client = createClient({",
    "  project: 'my-app',",
    "  region: 'auto'",
    "})",
    "",
    "export const getUser = cache(async (id) => {",
    "  return client.users.get(id)",
    "})",
    "",
    "export async function Dashboard() {",
    "  const user = await getUser('1')",
    "  const analytics = await client.analytics()",
    "  return <DashboardView data={analytics} />",
    "}",
    "",
    "// API Route Handler",
    "export async function GET(request: Request) {",
    "  const data = await client.query({",
    "    metrics: ['pageviews', 'sessions'],",
    "    period: '7d'",
    "  })",
    "  return Response.json(data)",
    "}",
    "",
    "// Edge Middleware",
    "export function middleware(req: Request) {",
    "  const geo = req.headers.get('x-geo')",
    "  return client.route(geo)",
    "}",
  ]

  useEffect(() => {
    let currentIndex = 0
    const fullText = text1 + "|" + text2 // Use | as separator

    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        const currentChar = fullText.substring(0, currentIndex)
        const parts = currentChar.split("|")
        setDisplayedText1(parts[0] || "")
        setDisplayedText2(parts[1] || "")
        currentIndex++
      } else {
        clearInterval(typeInterval)
        setIsTypingDone(true)
      }
    }, 80)

    return () => clearInterval(typeInterval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCodeLineIndex((prev) => (prev + 1) % codeLines.length)
    }, 800)
    return () => clearInterval(interval)
  }, [codeLines.length])

  useEffect(() => {
    if (typeof window === "undefined") return

    const hasAnimated = window.sessionStorage.getItem(DASHBOARD_ANIMATION_KEY) === "true"
    if (hasAnimated) {
      setDashboardAnimated(true)
      return
    }

    const dashboardElement = dashboardRef.current
    if (!dashboardElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        setDashboardAnimated(true)
        window.sessionStorage.setItem(DASHBOARD_ANIMATION_KEY, "true")
        observer.disconnect()
      },
      { threshold: 0.35 },
    )

    observer.observe(dashboardElement)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * ratio
      canvas.height = canvas.offsetHeight * ratio
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(ratio, ratio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const colors = [
      "rgba(255, 255, 255, 0.88)",
      "rgba(249, 115, 22, 0.95)",
      "rgba(251, 146, 60, 0.92)",
    ]
    const gridSize = 64
    const dotCount = 46
    const snapToGrid = (value: number) => Math.round(value / gridSize) * gridSize

    const gridDots: GridDot[] = []
    const bursts: GridBurst[] = []

    const spawnBurst = (x: number, y: number) => {
      bursts.push({
        x,
        y,
        life: 0,
        maxLife: 18 + Math.floor(Math.random() * 10),
        size: 10 + Math.random() * 14,
      })
      if (bursts.length > 42) bursts.shift()
    }

    for (let i = 0; i < dotCount; i++) {
      const isHorizontal = Math.random() > 0.5
      const x = snapToGrid(Math.random() * canvas.offsetWidth)
      const y = snapToGrid(Math.random() * canvas.offsetHeight)

      gridDots.push({
        x,
        y,
        direction: isHorizontal ? "horizontal" : "vertical",
        speed: Math.random() * 9 + 7.5,
        size: Math.random() * 2.2 + 2.3,
        opacity: Math.random() * 0.45 + 0.45,
        color: colors[Math.floor(Math.random() * colors.length)],
        targetX: x,
        targetY: y,
        phase: Math.random() * Math.PI * 2,
        trail: [],
      })
    }

    let animationId = 0
    let lastTime = 0
    const frameInterval = 1000 / 30

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate)

      const deltaTime = currentTime - lastTime
      if (deltaTime < frameInterval) return
      lastTime = currentTime - (deltaTime % frameInterval)

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      for (const dot of gridDots) {
        dot.trail.unshift({ x: dot.x, y: dot.y })
        if (dot.trail.length > 16) dot.trail.pop()

        if (dot.direction === "horizontal") {
          if (Math.abs(dot.x - dot.targetX) < dot.speed) {
            dot.x = dot.targetX
            if (Math.random() > 0.35) {
              dot.direction = "vertical"
              const steps = Math.floor(Math.random() * 6) + 1
              dot.targetY = dot.y + (Math.random() > 0.5 ? 1 : -1) * steps * gridSize
              if (Math.random() > 0.45) spawnBurst(dot.x, dot.y)
            } else {
              const steps = Math.floor(Math.random() * 7) + 2
              dot.targetX = dot.x + (Math.random() > 0.5 ? 1 : -1) * steps * gridSize
            }
          } else {
            dot.x += dot.x < dot.targetX ? dot.speed : -dot.speed
          }
        } else {
          if (Math.abs(dot.y - dot.targetY) < dot.speed) {
            dot.y = dot.targetY
            if (Math.random() > 0.35) {
              dot.direction = "horizontal"
              const steps = Math.floor(Math.random() * 7) + 2
              dot.targetX = dot.x + (Math.random() > 0.5 ? 1 : -1) * steps * gridSize
              if (Math.random() > 0.45) spawnBurst(dot.x, dot.y)
            } else {
              const steps = Math.floor(Math.random() * 6) + 1
              dot.targetY = dot.y + (Math.random() > 0.5 ? 1 : -1) * steps * gridSize
            }
          } else {
            dot.y += dot.y < dot.targetY ? dot.speed : -dot.speed
          }
        }

        if (dot.x < -gridSize) {
          dot.x = canvas.offsetWidth + gridSize
          dot.targetX = dot.x
          dot.trail = []
        }
        if (dot.x > canvas.offsetWidth + gridSize) {
          dot.x = -gridSize
          dot.targetX = dot.x
          dot.trail = []
        }
        if (dot.y < -gridSize) {
          dot.y = canvas.offsetHeight + gridSize
          dot.targetY = dot.y
          dot.trail = []
        }
        if (dot.y > canvas.offsetHeight + gridSize) {
          dot.y = -gridSize
          dot.targetY = dot.y
          dot.trail = []
        }

        if (dot.trail.length > 1) {
          ctx.beginPath()
          ctx.moveTo(dot.x, dot.y)
          for (let i = 0; i < dot.trail.length; i++) {
            ctx.lineTo(dot.trail[i].x, dot.trail[i].y)
          }
          ctx.strokeStyle = dot.color
          ctx.globalAlpha = dot.opacity * 0.62
          ctx.lineWidth = dot.size
          ctx.lineCap = "round"
          ctx.stroke()
        }

        const pulse = Math.sin(currentTime * 0.004 + dot.phase)
        const ringRadius = dot.size * 2.2 + (pulse + 1) * 2.1

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, ringRadius, 0, Math.PI * 2)
        ctx.strokeStyle = dot.color
        ctx.globalAlpha = dot.opacity * 0.28
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = dot.color
        ctx.globalAlpha = dot.opacity * 0.22
        ctx.fill()

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx.fillStyle = dot.color
        ctx.globalAlpha = dot.opacity
        ctx.fill()
      }

      for (let i = 0; i < gridDots.length; i++) {
        for (let j = i + 1; j < gridDots.length; j++) {
          const a = gridDots[i]
          const b = gridDots[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 160) {
            const intensity = 1 - distance / 160
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = "rgba(249,115,22,1)"
            ctx.globalAlpha = 0.22 * intensity
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      for (let i = bursts.length - 1; i >= 0; i--) {
        const burst = bursts[i]
        burst.life += 1
        const progress = burst.life / burst.maxLife
        const alpha = Math.max(0, 1 - progress)
        const radius = burst.size + progress * 28

        ctx.beginPath()
        ctx.arc(burst.x, burst.y, radius, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(249,115,22,1)"
        ctx.globalAlpha = alpha * 0.4
        ctx.lineWidth = 1.4
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(burst.x, burst.y, radius * 0.45, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255,255,255,1)"
        ctx.globalAlpha = alpha * 0.22
        ctx.fill()

        for (let spark = 0; spark < 4; spark++) {
          const angle = burst.life * 0.32 + spark * (Math.PI / 2)
          const sparkLength = 8 + progress * 18
          ctx.beginPath()
          ctx.moveTo(burst.x, burst.y)
          ctx.lineTo(
            burst.x + Math.cos(angle) * sparkLength,
            burst.y + Math.sin(angle) * sparkLength,
          )
          ctx.strokeStyle = "rgba(255,180,120,1)"
          ctx.globalAlpha = alpha * 0.35
          ctx.lineWidth = 1
          ctx.stroke()
        }

        if (burst.life >= burst.maxLife) {
          bursts.splice(i, 1)
        }
      }

      ctx.globalAlpha = 1
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  const stageDistribution = [
    { label: "New Lead / Initial Outreach", value: 42, color: "#3b82f6" },
    { label: "Contacted", value: 24, color: "#22c55e" },
    { label: "Demo Scheduled", value: 18, color: "#a855f7" },
    { label: "Demo Completed", value: 10, color: "#f97316" },
    { label: "Account Created", value: 6, color: "#06b6d4" },
  ]

  const stageTotal = stageDistribution.reduce((sum, item) => sum + item.value, 0)

  const funnelStages = [
    { label: "New Lead / Initial Outreach", value: 100, amount: "$2.4M" },
    { label: "Contacted", value: 80, amount: "$1.9M" },
    { label: "Demo Scheduled", value: 58, amount: "$1.2M" },
    { label: "Demo Completed", value: 40, amount: "$740K" },
    { label: "Account Created", value: 22, amount: "$310K" },
  ]

  const circleRadius = 40
  const circleCircumference = 2 * Math.PI * circleRadius
  const opportunityStatusPercent = 100
  const conversionPercent = 37

  const opportunityStatusDash = (dashboardAnimated ? opportunityStatusPercent : 0) * (circleCircumference / 100)
  const conversionDash = (dashboardAnimated ? conversionPercent : 0) * (circleCircumference / 100)

  const linePointsFinal = "5,56 40,55 75,52 110,49 145,42 180,34 215,24 250,14 275,10"

  return (
    <section className="relative overflow-hidden pt-20 pb-10 sm:pt-28 sm:pb-16 lg:pt-36">
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,#242424_1px,transparent_1px),linear-gradient(to_bottom,#242424_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-80 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"
        animate={{ backgroundPosition: ["0px 0px", "64px 64px"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.14),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08),transparent_45%)]" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_40%,transparent_100%)]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_40%,transparent_100%)]">
        {Array.from({ length: 14 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute h-2.5 w-2.5 rounded-sm border border-orange-500/50 bg-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            initial={{
              x: `${(index * 13) % 90 + 5}%`,
              y: `${(index * 17) % 90 + 5}%`,
              opacity: 0.2,
              scale: 0.8,
            }}
            animate={{
              x: [
                `${(index * 13) % 90 + 5}%`,
                `${(index * 19) % 90 + 3}%`,
                `${(index * 23) % 90 + 4}%`,
              ],
              y: [
                `${(index * 17) % 90 + 5}%`,
                `${(index * 11) % 90 + 6}%`,
                `${(index * 7) % 90 + 8}%`,
              ],
              opacity: [0.15, 0.45, 0.2],
              scale: [0.8, 1.15, 0.9],
            }}
            transition={{
              duration: 8 + (index % 6),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Now in public beta
          </div>

          <h1 className="font-mono text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl relative">
            <span className="invisible" aria-hidden="true">
              <span className="text-balance">Talk more.</span>
              <br />
              <span className="text-balance">Close faster.</span>
            </span>

            <span className="absolute inset-0 flex flex-col items-center">
              <span className="text-balance bg-gradient-to-r from-[#FFEFBA] to-[#FFFFFF] bg-clip-text text-transparent">
                {displayedText1}
                {displayedText2 === "" && (
                  <span className="inline-block w-[3px] h-[0.9em] bg-accent ml-1 animate-pulse" />
                )}
              </span>
              <span className="text-balance bg-gradient-to-r from-[#E44D26] to-[#F16529] bg-clip-text text-transparent">
                {displayedText2}
                {displayedText2 !== "" && (
                  <span
                    className={`inline-block w-[3px] h-[0.9em] bg-accent ml-1 ${
                      isTypingDone ? "animate-blink" : "animate-pulse"
                    }`}
                  />
                )}
              </span>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-4xl text-lg text-muted-foreground sm:text-xl lg:text-2xl md:whitespace-nowrap">
            The world’s first AI-native telephony stack for teams of 1 to 1,000.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto">
              Get started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              View documentation
            </Button>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20 shadow-[0_0_24px_rgba(249,115,22,0.35)]">
                <Zap className="h-4 w-4 text-accent" />
              </div>
              <p className="font-mono text-sm font-semibold uppercase tracking-wider text-accent">Speed</p>
              <h3 className="mt-2 text-lg font-semibold">Predictive Power-Dialing</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Eliminate dead air with smart sequencing that keeps your pipeline moving without the manual grind.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20 shadow-[0_0_24px_rgba(249,115,22,0.35)]">
                <Brain className="h-4 w-4 text-accent" />
              </div>
              <p className="font-mono text-sm font-semibold uppercase tracking-wider text-accent">Intelligence</p>
              <h3 className="mt-2 text-lg font-semibold">Live Whisper Coaching</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                An AI overlay that listens, learns, and prompts your next move so you never miss a beat.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md sm:col-span-2 lg:col-span-1">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20 shadow-[0_0_24px_rgba(249,115,22,0.35)]">
                <ArrowUpRight className="h-4 w-4 text-accent" />
              </div>
              <p className="font-mono text-sm font-semibold uppercase tracking-wider text-accent">Scale</p>
              <h3 className="mt-2 text-lg font-semibold">Infinite Elasticity</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                From a solo-closer to a 1,000-seat floor—AEONDial grows exactly as fast as you do.
              </p>
            </div>
          </div>
        </div>

        <div ref={dashboardRef} className="mt-20 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 blur-3xl opacity-50" />

          <div className="relative overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
            <div className="relative rounded-xl border border-border/60 bg-[#141414] backdrop-blur-sm overflow-hidden shadow-2xl min-w-[900px] lg:min-w-0">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-3 bg-[#1a1a1a]">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">AEONDial dashboard</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Globe className="h-3 w-3" />
                    <span>Active Lines</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Call Quality: Excellent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs text-accent">Live</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 border-b border-border/60 bg-[#181818]">
                <div className="rounded-xl border border-border/40 bg-[#1c1c1c] p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Opportunity Status</h3>
                    <span className="rounded-md border border-border/60 px-2 py-0.5 text-[10px] text-muted-foreground">
                      All Pipelines
                    </span>
                  </div>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-4xl font-mono font-bold">186</span>
                    <span className="mb-1 text-xs text-green-400 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +100% vs Last 31 Days
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="relative h-24 w-24">
                      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#2a2a2a" strokeWidth="12" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="12"
                          strokeDasharray={`${opportunityStatusDash} ${circleCircumference - opportunityStatusDash}`}
                          strokeLinecap="round"
                          style={{ transition: "stroke-dasharray 1200ms cubic-bezier(0.22, 1, 0.36, 1)" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center leading-tight">
                          <div className="font-mono text-lg font-bold">186</div>
                          <div className="text-[10px] text-muted-foreground">of 186</div>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">Open • 186</span>
                  </div>
                </div>

                <div className="rounded-xl border border-border/40 bg-[#1c1c1c] p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Opportunity Value</h3>
                    <span className="rounded-md border border-border/60 px-2 py-0.5 text-[10px] text-muted-foreground">
                      All Pipelines
                    </span>
                  </div>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-4xl font-mono font-bold">$2.8M</span>
                    <span className="mb-1 text-xs text-green-400 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +280% vs Last 31 Days
                    </span>
                  </div>
                  <div className="mt-5 rounded-lg border border-border/40 bg-[#171717] p-2">
                    <svg viewBox="0 0 280 70" className="h-[70px] w-full">
                      <polyline
                        fill="none"
                        stroke="#2a2a2a"
                        strokeWidth="1"
                        points="0,55 280,55"
                        strokeDasharray="4 4"
                      />
                      <g
                        style={{
                          transformOrigin: "center bottom",
                          transformBox: "fill-box",
                          transform: dashboardAnimated ? "translateY(0) scaleY(1)" : "translateY(42px) scaleY(0.05)",
                          transition: "transform 1200ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      >
                        <polyline
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2.5"
                          points={linePointsFinal}
                          style={{
                            strokeDasharray: 320,
                            strokeDashoffset: dashboardAnimated ? 0 : 320,
                            transition: "stroke-dashoffset 1200ms cubic-bezier(0.22, 1, 0.36, 1)",
                          }}
                        />
                        <circle
                          cx="275"
                          cy="10"
                          r="3"
                          fill="#3b82f6"
                          className="animate-pulse"
                          style={{
                            opacity: dashboardAnimated ? 1 : 0,
                            transition: "opacity 900ms ease 450ms",
                          }}
                        />
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="rounded-xl border border-border/40 bg-[#1c1c1c] p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Conversion</h3>
                    <span className="rounded-md border border-border/60 px-2 py-0.5 text-[10px] text-muted-foreground">
                      All Pipelines
                    </span>
                  </div>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-4xl font-mono font-bold">37%</span>
                    <span className="mb-1 text-xs text-green-400 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +11% vs Last 31 Days
                    </span>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <div className="relative h-24 w-24">
                      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#2a2a2a" strokeWidth="12" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="12"
                          strokeDasharray={`${conversionDash} ${circleCircumference - conversionDash}`}
                          strokeLinecap="round"
                          style={{ transition: "stroke-dasharray 1200ms cubic-bezier(0.22, 1, 0.36, 1)" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-xl font-bold">37%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4 p-4 min-h-[360px] bg-[#151515]">
                <div className="col-span-3 rounded-xl border border-border/40 bg-[#1c1c1c] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-medium">Funnel</h3>
                    <span className="rounded-md border border-border/60 px-2 py-0.5 text-[10px] text-muted-foreground">
                      AEON Pipeline
                    </span>
                  </div>
                  <div className="mb-4 flex items-end gap-2">
                    <span className="text-4xl font-mono font-bold">$4.9M</span>
                    <span className="mb-1 text-xs text-green-400 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +190% vs Last 31 Days
                    </span>
                  </div>
                  <div className="space-y-4">
                    {funnelStages.map((item, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-mono text-foreground">{item.amount}</span>
                        </div>
                        <div className="h-6 rounded bg-[#2a2a2a] overflow-hidden">
                          <div
                            className="h-full bg-accent"
                            style={{
                              width: dashboardAnimated ? `${item.value}%` : "0%",
                              transition: `width 900ms cubic-bezier(0.22, 1, 0.36, 1) ${120 + i * 120}ms`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-2 rounded-xl border border-border/40 bg-[#1c1c1c] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-medium">Stage Distribution</h3>
                    <span className="rounded-md border border-border/60 px-2 py-0.5 text-[10px] text-muted-foreground">
                      AEON Pipeline
                    </span>
                  </div>
                  <div className="mb-4 flex items-end gap-2">
                    <span className="text-4xl font-mono font-bold">271</span>
                    <span className="mb-1 text-xs text-green-400 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +100% vs Last 31 Days
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative h-28 w-28 flex-shrink-0">
                      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                        {(() => {
                          let offset = 0
                          return stageDistribution.map((item, index) => {
                            const pct = (item.value / stageTotal) * 100
                            const animatedPct = dashboardAnimated ? pct : 0
                            const dash = `${animatedPct * 2.51327} ${251.327 - animatedPct * 2.51327}`
                            const circle = (
                              <circle
                                key={index}
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke={item.color}
                                strokeWidth="12"
                                strokeDasharray={dash}
                                strokeDashoffset={-offset * 2.51327}
                                style={{
                                  transition: `stroke-dasharray 950ms cubic-bezier(0.22, 1, 0.36, 1) ${140 + index * 100}ms`,
                                }}
                              />
                            )
                            offset += pct
                            return circle
                          })
                        })()}
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center leading-tight">
                          <div className="font-mono text-lg font-bold">271</div>
                          <div className="text-[10px] text-muted-foreground">of 271</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1 text-[10px]">
                      {stageDistribution.map((item, i) => (
                        <div key={i} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-muted-foreground">{item.label}</span>
                          </div>
                          <span className="font-mono text-foreground">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden flex justify-center mt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Scroll to explore</span>
              <ArrowRight className="h-3 w-3 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

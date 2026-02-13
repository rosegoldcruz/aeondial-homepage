"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const signInUrl = "https://crm.aondial.com/sign-in"
  const signUpUrl = "https://crm.aondial.com/sign-up"

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setIsOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            
            <span className="text-lg font-semibold tracking-tight font-mono">AEONDial</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "#features")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
            >
              Features
            </a>
            <a
              href="#developer-experience"
              onClick={(e) => handleSmoothScroll(e, "#developer-experience")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
            >
              Experience
            </a>
            <a
              href="#high-velocity"
              onClick={(e) => handleSmoothScroll(e, "#high-velocity")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
            >
              High Velocity
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleSmoothScroll(e, "#pricing")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
            >
              Pricing
            </a>
            <a
              href="#enterprise"
              onClick={(e) => handleSmoothScroll(e, "#enterprise")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
            >
              Enterprise
            </a>
            <Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Privacy
            </Link>
          </nav>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <a href={signInUrl}>Sign in</a>
          </Button>
          <Button size="sm" asChild>
            <a href={signUpUrl}>Get Started</a>
          </Button>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <nav className="flex flex-col gap-4 px-4 py-6">
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "#features")}
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Features
            </a>
            <a
              href="#developer-experience"
              onClick={(e) => handleSmoothScroll(e, "#developer-experience")}
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Experience
            </a>
            <a
              href="#high-velocity"
              onClick={(e) => handleSmoothScroll(e, "#high-velocity")}
              className="text-sm text-muted-foreground cursor-pointer"
            >
              High Velocity
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleSmoothScroll(e, "#pricing")}
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Pricing
            </a>
            <a
              href="#enterprise"
              onClick={(e) => handleSmoothScroll(e, "#enterprise")}
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Enterprise
            </a>
            <Link href="/terms" onClick={() => setIsOpen(false)} className="text-sm text-muted-foreground">
              Terms
            </Link>
            <Link href="/privacy" onClick={() => setIsOpen(false)} className="text-sm text-muted-foreground">
              Privacy
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="ghost" size="sm" asChild>
                <a href={signInUrl}>Sign in</a>
              </Button>
              <Button size="sm" asChild>
                <a href={signUpUrl}>Get Started</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

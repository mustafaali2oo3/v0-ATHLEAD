"use client"

import type React from "react"

import { useEffect, useRef } from "react"

export default function AutoScrollProvider({ children }: { children: React.ReactNode }) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const currentSectionRef = useRef(0)

  const sections = ["hero", "mission", "events"]

  const scrollToNextSection = () => {
    const nextSection = (currentSectionRef.current + 1) % sections.length
    const element = document.getElementById(sections[nextSection])

    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      currentSectionRef.current = nextSection
    }
  }

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      scrollToNextSection()
    }, 5000) // 5 seconds
  }

  const handleUserActivity = () => {
    resetTimer()
  }

  const updateCurrentSection = () => {
    const heroElement = document.getElementById("hero")
    const missionElement = document.getElementById("mission")
    const eventsElement = document.getElementById("events")

    if (!heroElement || !missionElement || !eventsElement) return

    const scrollPosition = window.scrollY + window.innerHeight / 2
    const heroTop = heroElement.offsetTop
    const missionTop = missionElement.offsetTop
    const eventsTop = eventsElement.offsetTop

    if (scrollPosition >= eventsTop) {
      currentSectionRef.current = 2
    } else if (scrollPosition >= missionTop) {
      currentSectionRef.current = 1
    } else {
      currentSectionRef.current = 0
    }
  }

  useEffect(() => {
    // Start the timer
    resetTimer()

    // Add event listeners for user activity
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]

    events.forEach((event) => {
      document.addEventListener(event, handleUserActivity, true)
    })

    // Add scroll listener to update current section
    window.addEventListener("scroll", updateCurrentSection)

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      events.forEach((event) => {
        document.removeEventListener(event, handleUserActivity, true)
      })

      window.removeEventListener("scroll", updateCurrentSection)
    }
  }, [])

  return <>{children}</>
}

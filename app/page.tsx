import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import MissionSection from "@/components/mission-section"
import EventsSection from "@/components/events-section"
import AutoScrollProvider from "@/components/auto-scroll-provider"

export default function Home() {
  return (
    <AutoScrollProvider>
      <main className="min-h-screen">
        <Header />
        <div className="pt-16">
          <div id="hero">
            <HeroSection />
          </div>
          <div id="mission">
            <MissionSection />
          </div>
          <div id="events">
            <EventsSection />
          </div>
        </div>
      </main>
    </AutoScrollProvider>
  )
}

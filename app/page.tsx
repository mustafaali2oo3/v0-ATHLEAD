import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import MissionSection from "@/components/mission-section"
import EventsSection from "@/components/events-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <HeroSection />
        <MissionSection />
        <div id="events">
          <EventsSection />
        </div>
      </div>
    </main>
  )
}

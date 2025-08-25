export default function MissionSection() {
  return (
    <section
      className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/street-football.jpeg')`,
      }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-8">OUR MISSION</h2>
        <p className="text-white text-lg leading-relaxed">
          At ATHLEAD, we are committed to providing athletes with a global stage where their talent is recognized,
          celebrated, and monetized. Our platform unites athletes from every corner of the world, creating opportunities
          that power diverse sports cultures, recruit, and grow together. We believe in empowering every athlete not
          only to perform but to thrive—transforming their passion into purpose, their skills into success, and their
          dreams into reality. With legacy, representation, and passion as our pillars of sport.
        </p>
      </div>
    </section>
  )
}

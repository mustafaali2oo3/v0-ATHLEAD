export default function HeroSection() {
  return (
    <section
      className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/basketball-court.jpeg')`,
      }}
    >
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">
          ATH<span className="text-lead-brown">LEAD</span>
        </h1>
        <p className="text-xl">Empowering Athletes</p>
      </div>
    </section>
  )
}

import Header from "@/components/header"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">
            ABOUT ATH<span className="text-lead-brown">LEAD</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg leading-relaxed mb-6">
                ATHLEAD was founded with a simple yet powerful vision: to create a global platform where athletic talent
                knows no boundaries. We believe that every athlete, regardless of their location or background, deserves
                the opportunity to showcase their skills and achieve their dreams.
              </p>
              <p className="text-lg leading-relaxed">
                Our platform connects athletes, clubs, scouts, and fans from around the world, creating a vibrant
                ecosystem that celebrates diversity in sports and empowers athletes to reach their full potential.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Values</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Legacy</h3>
                  <p>Building lasting impact in the world of sports</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Representation</h3>
                  <p>Ensuring every athlete has a voice and opportunity</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Passion</h3>
                  <p>Fueling dreams and turning them into reality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

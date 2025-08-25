import Header from "@/components/header"

export default function AthletePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">
            ATH<span className="text-lead-brown">LEAD</span> ATHLETES
          </h1>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
              <p className="text-lg leading-relaxed mb-6">
                Connect with athletes from around the world. Showcase your talent, build your profile, and discover
                opportunities that match your skills and ambitions.
              </p>
              <ul className="space-y-4 text-lg">
                <li>• Create your athlete profile</li>
                <li>• Connect with scouts and recruiters</li>
                <li>• Participate in global competitions</li>
                <li>• Access training resources</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Get Started Today</h3>
              <p className="mb-6">Ready to take your athletic career to the next level?</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

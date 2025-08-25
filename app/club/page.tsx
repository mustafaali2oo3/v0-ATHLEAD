import Header from "@/components/header"

export default function ClubPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">
            ATH<span className="text-lead-brown">LEAD</span> CLUBS
          </h1>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Partner With Us</h2>
              <p className="text-lg leading-relaxed mb-6">
                Join the ATHLEAD network as a club partner. Access our global talent pool, organize events, and grow
                your club's presence on the international stage.
              </p>
              <ul className="space-y-4 text-lg">
                <li>• Access to global talent database</li>
                <li>• Event organization support</li>
                <li>• Marketing and promotion tools</li>
                <li>• Revenue sharing opportunities</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Become a Partner</h3>
              <p className="mb-6">Ready to expand your club's reach globally?</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

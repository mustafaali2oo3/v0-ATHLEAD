import { Card, CardContent } from "@/components/ui/card"

export default function EventsSection() {
  return (
    <section className="bg-black h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">EVENTS</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gray-900 border-gray-800 overflow-hidden">
            <div className="h-64 bg-blue-900 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-white text-xl font-semibold">Tournaments</h3>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 overflow-hidden">
            <div className="h-64 bg-orange-900 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-white text-xl font-semibold">Compete with Athlead</h3>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

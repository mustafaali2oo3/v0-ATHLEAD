import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Contact() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-12">
            Contact <span style={{ color: "#3C200F" }}>Us</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-orange-500">Email</h3>
                  <p>info@athlead.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-orange-500">Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="font-semibold text-orange-500">Address</h3>
                  <p>
                    123 Sports Avenue
                    <br />
                    Athletic City, AC 12345
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Send Message</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-orange-500 outline-none"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-orange-500 outline-none"
                />
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-orange-500 outline-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 py-3 rounded-lg font-semibold transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CheckEmail() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">
            Check Your <span style={{ color: "#3C200F" }}>Email</span>
          </h1>

          <div className="bg-gray-900 p-8 rounded-lg">
            <p className="text-gray-300 mb-4">
              We've sent you a confirmation email. Please check your inbox and click the link to verify your account.
            </p>
            <p className="text-sm text-gray-400">
              Don't see the email? Check your spam folder or try signing up again.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

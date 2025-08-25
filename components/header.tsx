import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-black text-white py-4 px-6 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">ATHLEAD</div>
        <nav className="flex space-x-8">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link href="/athlete" className="hover:text-gray-300 transition-colors">
            Athlete
          </Link>
          <Link href="/club" className="hover:text-gray-300 transition-colors">
            Club
          </Link>
          <Link href="/about" className="hover:text-gray-300 transition-colors">
            About Us
          </Link>
          <Link href="#events" className="hover:text-gray-300 transition-colors">
            Events
          </Link>
        </nav>
      </div>
    </header>
  )
}

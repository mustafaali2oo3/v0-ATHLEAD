"use client"

import Link from "next/link"
import { Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Navigation Buttons */}
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg font-semibold transition-colors"
              style={{ backgroundColor: "#3C200F", color: "white" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2A1608")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3C200F")}
            >
              Contact Us
            </Link>
            <Link
              href="/login"
              className="bg-black hover:bg-gray-900 border border-gray-600 hover:border-gray-500 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-black hover:bg-gray-900 border border-gray-600 hover:border-gray-500 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Sign Up
            </Link>
            <Link
              href="/about"
              className="bg-black hover:bg-gray-900 border border-gray-600 hover:border-gray-500 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              About Us
            </Link>
          </div>

          {/* Instagram Logo */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Follow us:</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-3 rounded-full hover:scale-110 transition-transform"
            >
              <Instagram className="w-6 h-6 text-white" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 mt-8 pt-8 border-t border-gray-800">
          <p>&copy; 2025 ATHLEAD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

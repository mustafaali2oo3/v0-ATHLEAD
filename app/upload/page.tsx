"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import UploadForm from "@/components/upload-form"

export default function UploadPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error || !user) {
      router.push("/login")
      return
    }
    setIsAuthenticated(true)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto pt-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold">Create Post</h1>
          <button onClick={() => window.history.back()} className="text-gray-400 hover:text-white">
            Cancel
          </button>
        </div>
        <UploadForm />
      </div>
    </div>
  )
}

"use client"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import UploadForm from "@/components/upload-form"

export default async function UploadPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/login")
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

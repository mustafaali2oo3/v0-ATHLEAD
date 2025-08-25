import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function SearchPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Search Coming Soon</h1>
        <p className="text-gray-400">Search functionality will be implemented soon.</p>
      </div>
    </div>
  )
}

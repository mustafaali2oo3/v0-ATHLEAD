import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import ProfileContent from "@/components/profile-content"

export default async function ProfilePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  const { data: posts } = await supabase
    .from("posts")
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      )
    `)
    .eq("user_id", data.user.id)
    .order("created_at", { ascending: false })

  return <ProfileContent user={data.user} profile={profile} posts={posts || []} />
}

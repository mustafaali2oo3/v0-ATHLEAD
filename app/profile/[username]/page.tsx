import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import UserProfile from "@/components/user-profile"

interface PageProps {
  params: {
    username: string
  }
}

export default async function UserProfilePage({ params }: PageProps) {
  const supabase = await createClient()

  const { data: currentUser, error } = await supabase.auth.getUser()
  if (error || !currentUser?.user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("username", params.username).single()

  if (!profile) {
    redirect("/feed")
  }

  const { data: posts } = await supabase
    .from("posts")
    .select(`
      *,
      profiles:user_id (
        username,
        avatar_url
      )
    `)
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false })

  // Check if current user follows this profile
  const { data: followData } = await supabase
    .from("follows")
    .select("id")
    .eq("follower_id", currentUser.user.id)
    .eq("following_id", profile.id)
    .single()

  return (
    <UserProfile profile={profile} posts={posts || []} currentUserId={currentUser.user.id} isFollowing={!!followData} />
  )
}

"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import type { User } from "@supabase/supabase-js"
import Link from "next/link"

interface Profile {
  id: string
  username: string
  full_name: string
  bio: string
  avatar_url: string
  followers_count: number
  following_count: number
}

interface Post {
  id: string
  content: string
  media_url: string
  media_type: string
  created_at: string
  likes_count: number
  comments_count: number
}

interface ProfileContentProps {
  user: User
  profile: Profile | null
  posts: Post[]
}

export default function ProfileContent({ user, profile: initialProfile, posts }: ProfileContentProps) {
  const [profile, setProfile] = useState(initialProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    username: profile?.username || "",
    full_name: profile?.full_name || "",
    bio: profile?.bio || "",
  })
  const supabase = createClient()

  // Create profile if it doesn't exist
  useEffect(() => {
    if (!profile && user) {
      createProfile()
    }
  }, [profile, user])

  const createProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        username: user.email?.split("@")[0] || "user",
        full_name: user.user_metadata?.full_name || "",
        bio: "",
        avatar_url: "",
      })
      .select()
      .single()

    if (!error && data) {
      setProfile(data)
      setEditForm({
        username: data.username,
        full_name: data.full_name,
        bio: data.bio,
      })
    }
  }

  const handleSaveProfile = async () => {
    if (!profile) return

    const { data, error } = await supabase.from("profiles").update(editForm).eq("id", profile.id).select().single()

    if (!error && data) {
      setProfile(data)
      setIsEditing(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <Link href="/feed" className="text-gray-400 hover:text-white">
          ← Back
        </Link>
        <h1 className="text-lg font-semibold">{profile.username}</h1>
        <button onClick={handleSignOut} className="text-gray-400 hover:text-white text-sm">
          Sign Out
        </button>
      </div>

      {/* Profile Info */}
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url || "/placeholder.svg"}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl">👤</span>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">{profile.full_name || profile.username}</h2>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                size="sm"
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
            <p className="text-gray-400 text-sm mb-3">@{profile.username}</p>
            <div className="flex space-x-6 mb-3">
              <span className="text-sm">
                <strong>{posts.length}</strong> posts
              </span>
              <span className="text-sm">
                <strong>{profile.followers_count || 0}</strong> followers
              </span>
              <span className="text-sm">
                <strong>{profile.following_count || 0}</strong> following
              </span>
            </div>
            <p className="text-sm">{profile.bio}</p>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-gray-900 rounded-lg p-4 mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                value={editForm.username}
                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={editForm.full_name}
                onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white resize-none"
                rows={3}
              />
            </div>
            <Button onClick={handleSaveProfile} className="w-full bg-[#3C200F] hover:bg-[#2a1608] text-white">
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Posts Grid */}
      <div className="px-6">
        <div className="border-t border-gray-800 pt-6">
          <h3 className="text-lg font-semibold mb-4">Posts</h3>
          {posts.length > 0 ? (
            <div className="grid grid-cols-3 gap-1">
              {posts.map((post) => (
                <div key={post.id} className="aspect-square bg-gray-800 rounded overflow-hidden">
                  {post.media_type === "video" ? (
                    <video src={post.media_url} className="w-full h-full object-cover" />
                  ) : (
                    <img src={post.media_url || "/placeholder.svg"} alt="Post" className="w-full h-full object-cover" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📷</div>
              <p className="text-gray-400 mb-4">No posts yet</p>
              <Link href="/upload">
                <Button className="bg-[#3C200F] hover:bg-[#2a1608] text-white">Create your first post</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

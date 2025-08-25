"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
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

interface UserProfileProps {
  profile: Profile
  posts: Post[]
  currentUserId: string
  isFollowing: boolean
}

export default function UserProfile({
  profile,
  posts,
  currentUserId,
  isFollowing: initialIsFollowing,
}: UserProfileProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const [followersCount, setFollowersCount] = useState(profile.followers_count || 0)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleFollowToggle = async () => {
    setLoading(true)
    try {
      if (isFollowing) {
        // Unfollow
        await supabase.from("follows").delete().eq("follower_id", currentUserId).eq("following_id", profile.id)

        setIsFollowing(false)
        setFollowersCount((prev) => prev - 1)
      } else {
        // Follow
        await supabase.from("follows").insert({
          follower_id: currentUserId,
          following_id: profile.id,
        })

        setIsFollowing(true)
        setFollowersCount((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Follow toggle error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <Link href="/feed" className="text-gray-400 hover:text-white">
          ← Back
        </Link>
        <h1 className="text-lg font-semibold">{profile.username}</h1>
        <div></div>
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
              {profile.id !== currentUserId && (
                <Button
                  onClick={handleFollowToggle}
                  disabled={loading}
                  className={`${
                    isFollowing
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-[#3C200F] hover:bg-[#2a1608] text-white"
                  }`}
                >
                  {loading ? "..." : isFollowing ? "Following" : "Follow"}
                </Button>
              )}
            </div>
            <p className="text-gray-400 text-sm mb-3">@{profile.username}</p>
            <div className="flex space-x-6 mb-3">
              <span className="text-sm">
                <strong>{posts.length}</strong> posts
              </span>
              <span className="text-sm">
                <strong>{followersCount}</strong> followers
              </span>
              <span className="text-sm">
                <strong>{profile.following_count || 0}</strong> following
              </span>
            </div>
            <p className="text-sm">{profile.bio}</p>
          </div>
        </div>
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
              <p className="text-gray-400">No posts yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

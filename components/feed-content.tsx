"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Heart, MessageCircle, Share, MoreHorizontal, Plus, Home, Search, User } from "lucide-react"
import Link from "next/link"

interface Post {
  id: string
  caption: string
  media_url: string
  media_type: string
  likes_count: number
  comments_count: number
  created_at: string
  profiles: {
    username: string
    full_name: string
    avatar_url: string
  }
  user_liked?: boolean
}

interface Profile {
  username: string
  full_name: string
  avatar_url: string
}

export default function FeedContent() {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchCurrentUser()
    fetchPosts()
  }, [])

  const fetchCurrentUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("username, full_name, avatar_url")
        .eq("id", user.id)
        .single()

      setCurrentUser(profile)
    }
  }

  const fetchPosts = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // Get posts with profile information and check if current user liked them
      const { data: postsData, error } = await supabase
        .from("posts")
        .select(`
          id,
          caption,
          media_url,
          media_type,
          likes_count,
          comments_count,
          created_at,
          profiles:user_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .order("created_at", { ascending: false })
        .limit(20)

      if (error) throw error

      // Check which posts the current user has liked
      if (user && postsData) {
        const postIds = postsData.map((post) => post.id)
        const { data: likesData } = await supabase
          .from("likes")
          .select("post_id")
          .eq("user_id", user.id)
          .in("post_id", postIds)

        const likedPostIds = new Set(likesData?.map((like) => like.post_id) || [])

        const postsWithLikes = postsData.map((post) => ({
          ...post,
          user_liked: likedPostIds.has(post.id),
        }))

        setPosts(postsWithLikes)
      } else {
        setPosts(postsData || [])
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (postId: string, isLiked: boolean) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    try {
      if (isLiked) {
        // Unlike the post
        await supabase.from("likes").delete().eq("post_id", postId).eq("user_id", user.id)
      } else {
        // Like the post
        await supabase.from("likes").insert({ post_id: postId, user_id: user.id })
      }

      // Update local state
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                user_liked: !isLiked,
                likes_count: isLiked ? post.likes_count - 1 : post.likes_count + 1,
              }
            : post,
        ),
      )
    } catch (error) {
      console.error("Error toggling like:", error)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p>Loading feed...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-2xl font-bold">
            ATHL<span style={{ color: "#3C200F" }}>LEAD</span>
          </h1>
          <div className="flex items-center gap-4">
            <Link href="/upload" className="p-2 hover:bg-gray-800 rounded-full">
              <Plus size={24} />
            </Link>
            <button onClick={handleSignOut} className="text-sm text-gray-400 hover:text-white">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Feed */}
      <main className="max-w-md mx-auto">
        {posts.length === 0 ? (
          <div className="text-center py-12 px-6">
            <h2 className="text-xl font-semibold mb-4">Welcome to ATHLEAD!</h2>
            <p className="text-gray-400 mb-6">Start following athletes to see their posts in your feed.</p>
            <Link
              href="/upload"
              className="inline-block bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Share Your First Post
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {posts.map((post) => (
              <article key={post.id} className="py-4">
                {/* Post Header */}
                <div className="flex items-center justify-between px-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      {post.profiles?.avatar_url ? (
                        <img
                          src={post.profiles.avatar_url || "/placeholder.svg"}
                          alt={post.profiles.username}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <User size={16} className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{post.profiles?.username}</p>
                      <p className="text-xs text-gray-400">{new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-800 rounded-full">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                {/* Post Media */}
                <div className="mb-3">
                  {post.media_type === "image" ? (
                    <img
                      src={post.media_url || "/placeholder.svg"}
                      alt="Post content"
                      className="w-full aspect-square object-cover"
                    />
                  ) : (
                    <video src={post.media_url} className="w-full aspect-square object-cover" controls />
                  )}
                </div>

                {/* Post Actions */}
                <div className="px-4 mb-3">
                  <div className="flex items-center gap-4 mb-2">
                    <button
                      onClick={() => handleLike(post.id, post.user_liked || false)}
                      className="p-1 hover:bg-gray-800 rounded-full"
                    >
                      <Heart size={20} className={post.user_liked ? "fill-red-500 text-red-500" : "text-white"} />
                    </button>
                    <button className="p-1 hover:bg-gray-800 rounded-full">
                      <MessageCircle size={20} />
                    </button>
                    <button className="p-1 hover:bg-gray-800 rounded-full">
                      <Share size={20} />
                    </button>
                  </div>

                  {/* Likes Count */}
                  <p className="font-semibold text-sm mb-1">
                    {post.likes_count} {post.likes_count === 1 ? "like" : "likes"}
                  </p>

                  {/* Caption */}
                  {post.caption && (
                    <p className="text-sm mb-1">
                      <span className="font-semibold">{post.profiles?.username}</span> {post.caption}
                    </p>
                  )}

                  {/* Comments */}
                  {post.comments_count > 0 && (
                    <button className="text-sm text-gray-400 hover:text-white">
                      View all {post.comments_count} comments
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800">
        <div className="flex items-center justify-around max-w-md mx-auto py-3">
          <Link href="/feed" className="p-2 text-orange-500">
            <Home size={24} />
          </Link>
          <Link href="/search" className="p-2 text-gray-400 hover:text-white">
            <Search size={24} />
          </Link>
          <Link href="/upload" className="p-2 text-gray-400 hover:text-white">
            <Plus size={24} />
          </Link>
          <Link href="/profile" className="p-2 text-gray-400 hover:text-white">
            <User size={24} />
          </Link>
        </div>
      </nav>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-16"></div>
    </div>
  )
}

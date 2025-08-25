"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [caption, setCaption] = useState("")
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      // Upload file to Supabase Storage
      const fileExt = file.name.split(".").pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage.from("posts").upload(fileName, file)

      if (uploadError) throw uploadError

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("posts").getPublicUrl(fileName)

      const { error: postError } = await supabase.from("posts").insert({
        user_id: user.id,
        caption: caption,
        media_url: publicUrl,
        media_type: file.type.startsWith("video/") ? "video" : "image",
      })

      if (postError) throw postError

      router.push("/feed")
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload post. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* File input */}
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
        <input type="file" accept="image/*,video/*" onChange={handleFileSelect} className="hidden" id="file-input" />
        <label htmlFor="file-input" className="cursor-pointer">
          {preview ? (
            <div className="space-y-4">
              {file?.type.startsWith("video/") ? (
                <video src={preview} className="max-h-64 mx-auto rounded" controls />
              ) : (
                <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-64 mx-auto rounded" />
              )}
              <p className="text-sm text-gray-400">Click to change file</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-4xl">📷</div>
              <p className="text-lg">Select photo or video</p>
              <p className="text-sm text-gray-400">Choose from your device</p>
            </div>
          )}
        </label>
      </div>

      {/* Caption input */}
      <div>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 resize-none"
          rows={3}
        />
      </div>

      {/* Upload button */}
      <Button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full bg-[#3C200F] hover:bg-[#2a1608] text-white"
      >
        {uploading ? "Uploading..." : "Share Post"}
      </Button>
    </div>
  )
}

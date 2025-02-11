"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Loader2, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Note {
  id: number
  title: string
  content: string
  user_id: number
}

export default function NoteDetails({ params }: { params: { id: string } }) {
  const [note, setNote] = useState<Note | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const token = document.cookie
          .split(";")
          .find((c) => c.trim().startsWith("access_token="))
          ?.split("=")[1]

        if (!token) {
          router.push("/login")
          return
        }

        const response = await fetch(`http://127.0.0.1:5000/api/notes/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          credentials: "include",
        })

        if (response.status === 401) {
          router.push("/login")
          return
        }

        if (!response.ok) {
          throw new Error("Failed to fetch note details")
        }

        const data = await response.json()
        setNote(data)
        setError(null)
      } catch (err: any) {
        console.error("Error:", err)
        setError(err.message || "Error loading note details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNoteDetails()
  }, [params.id, router])

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="lg:ml-64 pt-16">
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          <div className="mb-6">
            <Link href="/my-notes" className="inline-flex items-center gap-2 text-purple-500 hover:text-purple-400">
              <ArrowLeft size={20} />
              <span>Back to Notes</span>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : error ? (
            <div className="text-center text-red-400 p-4 rounded-lg bg-red-900/20">{error}</div>
          ) : note ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h1 className="text-2xl lg:text-3xl font-semibold text-white mb-8">{note.title}</h1>

              <div className="p-6 rounded-xl bg-[#1A1F2B]/90 border-2 border-purple-700/20">
                <div className="prose prose-invert max-w-none">
                  {note.content.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-300">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-gray-400">Note not found</div>
          )}
        </div>
      </div>
    </div>
  )
}


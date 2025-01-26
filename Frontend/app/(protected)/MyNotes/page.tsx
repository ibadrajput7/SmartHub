import { Suspense } from 'react'
import { getAllNotes } from "@/app/(protected)/MyNotes/action"
import { NoteCard } from "@/components/NoteCard"
import { Skeleton } from "@/components/ui/skeleton"

async function NotesGrid() {
  const notes = await getAllNotes()

  if (notes.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        <p>No notes found. Generate some notes to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  )
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-[200px]">
          <Skeleton className="h-full bg-gray-800/50" />
        </div>
      ))}
    </div>
  )
}

export default function MyNotes() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="lg:ml-64 pt-16">
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl lg:text-3xl font-semibold text-white">
              My Notes
            </h1>
          </div>
          <Suspense fallback={<LoadingGrid />}>
            <NotesGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}


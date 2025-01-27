import { ParsedNote } from '@/app/(protected)/notes/types'
import Link from 'next/link'

interface NoteCardProps {
  note: ParsedNote
}

export function NoteCard({ note }: NoteCardProps) {
  const getPreviewText = (content: any): string => {
    if (Array.isArray(content)) {
      return content[0]?.content || ''
    }
    if (typeof content === 'string') {
      return content
    }
    return JSON.stringify(content)
  }

  const previewText = getPreviewText(note.content)

  return (
    <Link href={`/notes/${note.id}`} className="block">
      <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer h-[200px] flex flex-col">
        <h3 className="text-xl font-semibold text-white mb-2 truncate">
          {note.title}
        </h3>
        <p className="text-gray-400 line-clamp-3 flex-grow">
          {previewText}
        </p>
        <div className="mt-4 text-sm text-gray-500">
          {new Date(note.createdAt).toLocaleDateString()}
        </div>
      </div>
    </Link>
  )
}
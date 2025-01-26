import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NoteData } from '@/app/(protected)/notes/types'
import Link from "next/link"

interface NoteCardProps {
  note: NoteData
}

export function NoteCard({ note }: NoteCardProps) {
  const parsedNotes = Array.isArray(note.notes) ? note.notes : []
  const totalScore = parsedNotes.reduce((acc, note) => acc + note.importance_score, 0)
  
  return (
    <Link href={`/note/${note.id}`}>
      <Card className="h-full bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-colors">
        <CardHeader>
          <CardTitle className="text-lg text-white">{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {parsedNotes.slice(0, 3).map((note, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className="bg-purple-900/50 text-purple-100"
                >
                  {note.keywords[0]}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              {parsedNotes.length} notes • Score: {totalScore}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}


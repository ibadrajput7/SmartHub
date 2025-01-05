import { getNoteById } from './actions'
import GeneratedNotes from '@/components/GeneratedNotes'
import { NoteData, Note } from '../types'

export default async function NotePage({ params }: { params: { noteId: string } }) {
  const noteData = await getNoteById(params.noteId)

  if (!noteData) {
    return <div className="text-center text-white">Note not found</div>
  }

  // Format the data for the GeneratedNotes component
  const formattedNotes = {
    notes: noteData.notes,
    totalScore: noteData.notes.reduce((acc: number, note: Note) => acc + note.importance_score, 0),
    feedback: noteData.title // Using the title as feedback for now
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-white">Generated Notes</h1>
      <GeneratedNotes
        notes={formattedNotes.notes}
        totalScore={formattedNotes.totalScore}
        feedback={formattedNotes.feedback}
      />
    </div>
  )
}




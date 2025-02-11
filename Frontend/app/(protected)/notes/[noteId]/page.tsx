import { getNoteById } from './actions'
import GeneratedNotes from '@/components/GeneratedNotes'
import DownloadButton from '@/components/DownloadButton'
import { NoteData, Note } from '../types'

export default async function NotePage({ params }: { params: { noteId: string } }) {
    const noteData = await getNoteById(params.noteId)

    if (!noteData) {
        return <div className="text-center text-white">Note not found</div>
    }

    const formattedNotes = {
        notes: noteData.notes,
        totalScore: noteData.notes.reduce((acc: number, note: Note) => acc + note.importance_score, 0),
        feedback: noteData.title
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Generated Notes</h1>
                <DownloadButton
                    notes={formattedNotes.notes}
                    title={noteData.title}
                    totalScore={formattedNotes.totalScore}
                />
            </div>
            <GeneratedNotes
                notes={formattedNotes.notes}
                totalScore={formattedNotes.totalScore}
                feedback={formattedNotes.feedback}
                noteId={params.noteId}
            />
        </div>
    )
}
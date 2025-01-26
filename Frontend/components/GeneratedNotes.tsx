'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Note, Summary } from "@/app/(protected)/notes/types"
import { getSummaryById } from "@/app/(protected)/notes/[noteId]/actions"
import SummaryCard from "@/components/SummaryCard"

interface GeneratedNotesProps {
    notes: Note[]
    totalScore?: number
    feedback?: string
    noteId: string
}

export default function GeneratedNotes({ notes = [], totalScore, feedback = '', noteId }: GeneratedNotesProps) {
    const [summary, setSummary] = useState<Summary | null>(null)
    const [isLoadingSummary, setIsLoadingSummary] = useState(false)

    const handleGetSummary = async () => {
        setIsLoadingSummary(true)
        try {
            const summaryData = await getSummaryById(noteId)
            setSummary(summaryData)
        } catch (error) {
            console.error('Failed to fetch summary:', error)
        } finally {
            setIsLoadingSummary(false)
        }
    }

    return (
        <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-white">YOUR NOTES ARE GENERATED</CardTitle>
                        <Button
                            onClick={handleGetSummary}
                            disabled={isLoadingSummary}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                            {isLoadingSummary ? 'Loading...' : 'Get Summary'}
                        </Button>
                    </div>
                    <CardDescription className="text-gray-400">
                        Total Score: {totalScore !== undefined ? totalScore.toFixed(2) : 'N/A'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-400 mb-4">{feedback}</p>
                </CardContent>
            </Card>

            {/* Summary Card */}
            <SummaryCard summary={summary} isLoading={isLoadingSummary} />

            {/* Notes Cards */}
            {notes && notes.length > 0 ? (
                notes.map((note, index) => (
                    <Card key={index} className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-purple-300">{note.title}</CardTitle>
                            <CardDescription className="text-gray-400">
                                Importance: {note.importance_score !== undefined ? note.importance_score.toFixed(2) : 'N/A'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-300 mb-4">{note.content}</p>
                            <div className="flex flex-wrap gap-2">
                                {note.keywords.map((keyword, kIndex) => (
                                    <span key={kIndex} className="bg-purple-900 text-purple-200 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Card className="bg-gray-800 border-gray-700">
                    <CardContent>
                        <p className="text-sm text-gray-400">No notes available.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
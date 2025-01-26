import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Summary } from "@/app/(protected)/notes/types"

interface SummaryCardProps {
    summary: Summary | null;
    isLoading: boolean;
}

export default function SummaryCard({ summary, isLoading }: SummaryCardProps) {
    if (isLoading) {
        return (
            <Card className="bg-gray-800 border-gray-700">
                <CardContent>
                    <p className="text-sm text-gray-400">Loading summary...</p>
                </CardContent>
            </Card>
        )
    }

    if (!summary) return null;

    return (
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                <CardTitle className="text-purple-300">Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-300">{summary.content}</p>
            </CardContent>
        </Card>
    )
}
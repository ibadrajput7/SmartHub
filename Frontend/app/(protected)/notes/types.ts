export interface Note {
    title: string;
    content: string;
    keywords: string[];
    importance_score: number;
}

export interface NoteData {
    title: string;
    content: string;
    id: number;
    user_id: number;
    notes: Note[];
}

export interface Summary {
    content: string;
}

export interface SummaryResponse {
  result: {
      content: string;
  }
}
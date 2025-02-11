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

export interface NoteResponse {
    id: number;
    title: string;
    content: string;
    created_at: string;
    user_id: number;
}

export interface ParsedNote {
    id: number;
    title: string;
    content: Note[] | string;
    createdAt: string;
    userId: number;
}
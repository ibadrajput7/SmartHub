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
  
  
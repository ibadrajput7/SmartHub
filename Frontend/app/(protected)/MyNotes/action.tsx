// 'use server'

// import { cookies } from 'next/headers';

// export interface Note {
//   id: number;
//   title: string;
//   content: string;
//   user_id: number;
// }

// export async function getNotes(): Promise<Note[]> {
//   try {
//     const cookieStore = cookies();
//     const token = cookieStore.get("token")?.value || '';

//     const response = await fetch('http://127.0.0.1:5000/user/notes', {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       credentials: 'include',
//       cache: 'no-store'
//     });

//     if (!response.ok) {
//       throw new Error(`API error: ${response.status}`);
//     }

//     const data = await response.json();
//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     console.error('Error fetching notes:', error);
//     return [];
//   }
// }
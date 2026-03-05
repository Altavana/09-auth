// lib/api/serverApi.ts — для функцій, які викликаються у серверних компонентах (до params потрібно додавати cookeis у headers):

// fetchNotes
// fetchNoteById
// getMe
// checkSession.
import type { Note, NewNote } from '../../types/note';
import { nextServer } from './api';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export const fetchNotes = async (
  search?: string,
  page?: number,
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      ...(search !== '' && { search }),
      tag,
      page: page,
      perPage: 12,
    },
  });
  return response.data;
};

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
}

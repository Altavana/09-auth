import type { Note } from '../../types/note';
import { nextServer } from './api';
import { cookies } from 'next/headers';
import type { User } from '../../types/user';
import { AxiosResponse } from 'axios';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export const fetchNotes = async (
  search?: string,
  page?: number,
  tag?: string
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      ...(search !== '' && { search }),
      tag,
      page: page,
      perPage: 12,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}
export const checkSession = async (): Promise<AxiosResponse> => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб proxy мав доступ до нових cookie
  return res;
};
export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

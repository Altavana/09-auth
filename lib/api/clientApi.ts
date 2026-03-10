import type { Note, NewNote } from '../../types/note';
import type { User } from '../../types/user';
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

export const createNote = async (note: NewNote): Promise<Note> => {
  const response = await nextServer.post<Note>('/notes', note);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);
  return response.data;
};
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};
export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};
export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};
export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};
type updateMeProp = {
  username: string;
  email: string;
};
export const updateMe = async (updateUser: updateMeProp) => {
  const { data } = await nextServer.patch<User>('/users/me', updateUser);
  return data;
};

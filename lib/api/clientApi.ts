import { Note, NoteTag } from "@/types/note";
import { api } from "./api";
import { User } from "@/types/users";

interface FetchNotesParams {
    search: string,
    page: number,
    perPage?: number,
    tag?: string
}

interface FetchNotesResponse{
    notes: Note[],
    totalPages: number
}

export async function fetchNotes({search = '',page= 1,perPage = 12, tag}: FetchNotesParams): Promise<FetchNotesResponse> {
    const response = await api.get<FetchNotesResponse>('/notes', {
        params:{
            search: search,
            page: page,
            perPage: perPage,
            tag
        }
    })
    return response.data;
}

export async function fetchNoteById (noteId: string) {
    const response = await api.get<Note>(`/notes/${noteId}`);
    return response.data
}

interface CreateNoteParams {
    title: string,
    content: string,
    tag: NoteTag
}

export async function createNote (noteData : CreateNoteParams ) {
    
    const response = await api.post<Note>('/notes', noteData)
    return response.data;
}

export async function deleteNote (noteId: string) {
    const response = await api.delete<Note>(`/notes/${noteId}`);
    return response.data
}


export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export type UpdateUserRequest = {
  username: string;
};

export const updateMe = async (data: UpdateUserRequest) => {
  const res = await api.patch<User>("/users/me", data);
  return res.data;
};
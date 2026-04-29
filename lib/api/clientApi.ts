import { Note, NoteTag } from "@/types/note";
import { nextServer } from "./api";
import { User} from "@/types/user";

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
    const response = await nextServer.get<FetchNotesResponse>('/notes', {
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
    const response = await nextServer.get<Note>(`/notes/${noteId}`);
    return response.data
}

interface CreateNoteParams {
    title: string,
    content: string,
    tag: NoteTag
}

export async function createNote (noteData : CreateNoteParams ) {
    
    const response = await nextServer.post<Note>('/notes', noteData)
    return response.data;
}

export async function deleteNote (noteId: string) {
    const response = await nextServer.delete<Note>(`/notes/${noteId}`);
    return response.data
}


export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/api/auth/register", data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/api/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/api/auth/logout");
};


export const checkSession = async () => {
  const res = await nextServer.get("/api/auth/session");
  return res.data;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export type UpdateUserRequest = {
  username: string;
};

export const updateMe = async (data: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
};

import { Note } from "@/types/note";
import { api } from "./api";
import { User } from "@/types/user";

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

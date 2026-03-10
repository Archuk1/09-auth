import { Note } from "@/types/note";
import { api } from "./api";
import { User } from "@/types/user";
import { cookies } from "next/headers";

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

export const checkServerSession = async () => {
  const cookieStore = cookies();

  const res = await api.get<{ success: boolean }>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export async function fetchNotes({search = '',page= 1,perPage = 12, tag}: FetchNotesParams): Promise<FetchNotesResponse> {
    const response = await api.get<FetchNotesResponse>('/notes', {
        params:{
            search: search,
            page: page,
            perPage: perPage,
            tag
        },
        headers: {
      Cookie: cookieStore.toString(),
        },

    })
    return response.data;
}

export async function fetchNoteById (noteId: string) {
    const response = await api.get<Note>(`/notes/${noteId}`,{
        headers: {
      Cookie: cookieStore.toString(),
    },

    });
    return response.data
}

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>("/auth/session",{
    headers: {
      Cookie: cookieStore.toString(),
    },

  });
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await api.get<User>("/users/me",{
    headers: {
      Cookie: cookieStore.toString(),
    },

  });
  return data;
};

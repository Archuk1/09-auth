// lib/api/serverApi.ts

import { Note } from "@/types/note";
import { User } from "@/types/user";
import { nextServer } from "./api";
import { cookies } from "next/headers";

interface FetchNotesParams {
  search: string;
  page: number;
  perPage?: number;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res; 
};


export async function fetchNotes({
  search = "",
  page = 1,
  perPage = 12,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const cookieStore = cookies();

  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: { search, page, perPage, tag },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const cookieStore = cookies();

  const response = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}


export async function getCurrentUser(): Promise<User> {
  const cookieStore = cookies();

  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}
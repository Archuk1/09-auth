import { NoteTag } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';



const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo' as NoteTag,
};

type NoteDraftStore = {
  draft: typeof initialDraft;
  setDraft: (note: Partial<typeof initialDraft>) => void;
  clearDraft: () => void;
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
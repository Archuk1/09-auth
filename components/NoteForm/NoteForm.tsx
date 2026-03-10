'use client'
import css from './NoteForm.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';
import type { NoteTag } from '../../types/note';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';

interface FormValues {
  title: string;
  content: string;
  tag: "" | NoteTag
}
 

export default function NoteForm (){

    const router = useRouter()
    const {draft, setDraft, clearDraft} = useNoteDraftStore();



    const handleChange = (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setDraft({
        [event.target.name]: event.target.value,
      });
    };


    const queryClient = useQueryClient();

     const { mutate, isPending } = useMutation({
    mutationFn: (values: FormValues) => createNote({
      title: values.title,
      content: values.content,
      tag: values.tag as NoteTag
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push("/notes/filter/All")
    },
  });

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(draft)
   }

   const handleCancel = () => {
    router.push("/notes/filter/All")
   }

    return(
       
            <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" name="title" className={css.input} value={draft?.title} onChange={handleChange}/>
        </div>

        <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            value={draft?.content}
            onChange={handleChange}
            />
        </div>

        <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <select id="tag" name="tag" className={css.select} value={draft?.tag} onChange={handleChange}>
            <option value="">Select a tag</option>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
            </select>
        </div>

        <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
            Cancel
            </button>
            <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
            >
            Create note
            </button>
        </div>
        </form>     
    )
}
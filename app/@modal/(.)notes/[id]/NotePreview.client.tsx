'use client'
import Modal from '@/components/Modal/Modal'
import css from './NotePreview.module.css'
import { fetchNoteById } from '@/lib/api/clientApi'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function NotePreview() {
    const router = useRouter();
	const { id } = useParams<{ id: string }>();
    const close = () => router.back()
	const { data, isLoading, error } = useQuery({
		queryKey: ["note", id],
		queryFn: () => fetchNoteById(id) ,
		refetchOnMount: false
	});

	
		if (isLoading){return <p>Loading, please wait...</p>};

		if (error || !data){return <p>Something went wrong.</p>;};

    
	
	
    return (
	<Modal onClose={close}>
		<div className={css.container}>
			<div className={css.item}>
			<div className={css.header}>
				<h2>{ data?.title }</h2>
			</div>
				<p className={css.tag}>{ data?.tag }</p>
				<p className={css.content}>{  data?.content}</p>
				<p className={css.date}>
				{data?.createdAt ? new Date(data.createdAt).toUTCString() : ''}</p>
				<button className={css.backBtn} onClick={close}>Go Back</button>
			</div>
		</div>
	</Modal>
)
}
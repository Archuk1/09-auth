'use client'

import { useState } from "react";
import css from "./NotesPage.module.css"
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";

interface NotesProps{
    tag: string | undefined
}
export default function Notes({tag}:NotesProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


    const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
    setCurrentPage(1);
    setSearchQuery(value);
    }, 500);

  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["notes", searchQuery, currentPage, tag],
    queryFn: () => fetchNotes({ search: searchQuery, page: currentPage, tag }),
    placeholderData: keepPreviousData,
  });

 

  const notes = data?.notes || []; 
  const totalPages = data?.totalPages || 0;

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  }

  const handleCreateSuccess = () => {
    closeModal();
    refetch();
  };
 

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSetSearchQuery} />
        {totalPages > 1 && <Pagination pages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />}
        <button className={css.button} onClick={openModal}>Create note +</button>
      </header>
      {isSuccess && (
        <>
          {notes.length > 0 ? (
            <NoteList notes={notes} />
          ) : (
            <div className={css.emptyResults}>
              {searchQuery ? (
                <p>No notes found for your search `{searchQuery}`</p>
              ) : (
                <p>No notes available. Create your first note!</p>
              )}
            </div>
          )}
        </>
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={handleCreateSuccess} onCancel={closeModal}/>
        </Modal>
      )}
    </div>
  );
}


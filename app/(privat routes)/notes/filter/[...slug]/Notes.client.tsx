'use client';
import css from './NotesPage.module.css';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';

type NotesClientProps = {
  tag?: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, isSuccess } = useQuery({
    queryFn: () => fetchNotes(query, page, tag),
    queryKey: ['notes', query, page, tag],
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const changeQuery = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 250);

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];
  useEffect(() => {
    if (isSuccess && notes.length === 0 && query) {
      toast.error('No notes found for your request.');
    }
  }, [isSuccess, notes, query]);
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={changeQuery} />
        {isSuccess && totalPages > 1 && (
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        )}

        <Link href="/notes/action/create" aria-label="Create note" className={css.button}>
          Create note +
        </Link>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}
      <Toaster position="top-center" />
    </div>
  );
}

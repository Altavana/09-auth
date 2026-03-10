'use client';
import css from './NoteDetails.module.css';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/lib/utils/utils';
import { fetchNoteById } from '@/lib/api/clientApi';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleGoBack = (): void => {
    router.back();
  };
  if (isLoading) return <p className={css.text}> Loading...</p>;

  if (error || !data) return <p className={css.text}> Some error...</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data?.title}</h2>
        </div>
        <p className={css.tag}>{data?.tag}</p>
        <p className={css.content}>{data?.content}</p>
        <p className={css.date}>{data?.createdAt && formatDate(data.createdAt)}</p>
        <button className={css.backBtn} onClick={handleGoBack}>
          Back
        </button>
      </div>
    </div>
  );
}

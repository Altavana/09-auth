'use client';
import css from './NotePreview.module.css';

import Modal from '@/components/Modal/Modal';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { fetchNoteById } from '@/lib/api/serverApi';
import { formatDate } from '@/lib/utils/utils';

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const handleGoBack = (): void => {
    router.back();
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p className={css.text}> Loading...</p>;

  if (error || !data) return <p className={css.text}> Some error..</p>;

  return (
    <Modal onClose={handleGoBack}>
      <div className={css.container}>
        <div className={css.item}>
          <button className={css.backBtn} onClick={handleGoBack}>
            Back
          </button>
          <div className={css.header}>
            <h2>{data?.title}</h2>
          </div>
          <p className={css.tag}>{data?.tag}</p>
          <p className={css.content}>{data?.content}</p>
          <p className={css.date}>{data?.createdAt && formatDate(data.createdAt)}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;

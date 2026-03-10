import css from './NoteList.module.css';
import type { Note } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/clientApi';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}
export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('The note was deleted successfully.');
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(item => (
        <li className={css.listItem} key={item.id}>
          <h2 className={css.title}>{item.title}</h2>
          <p className={css.content}>{item.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{item.tag}</span>
            <Link href={`/notes/${item.id}`} aria-label="Note details" className={css.link}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => {
                mutation.mutate(item.id);
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

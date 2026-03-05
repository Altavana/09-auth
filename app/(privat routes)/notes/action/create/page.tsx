import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creating a new note in NoteHub',
  description: 'Create your notes in one place with NoteHub',
  openGraph: {
    title: 'Creating a new note in NoteHub',
    description: 'Create your notes in one place with NoteHub',
    url: 'https://08-zustand-three-cyan.vercel.app/notes/action/create/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Form for creating a new note',
      },
    ],
    type: 'article',
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

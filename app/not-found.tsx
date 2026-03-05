import Link from 'next/link';
import css from './Home.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | NoteHub',
  description:
    'The page you are looking for does not exist or may have been moved. Return to NoteHub to continue managing your notes.',
  openGraph: {
    title: '404 - Page Not Found | NoteHub',
    description:
      'The page you are looking for could not be found. Go back to NoteHub and continue organizing your notes.',
    url: `https://notehub.com/`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Notes App ',
      },
    ],
    type: 'website',
  },
};

const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>

      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;

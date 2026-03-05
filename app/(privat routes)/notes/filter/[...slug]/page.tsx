import { fetchNotes } from '@/lib/api/api';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

type NotesByCategoryProps = {
  params: Promise<{ slug: string[] }>;
};
export async function generateMetadata({ params }: NotesByCategoryProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? 'All Notes' : slug[0];

  return {
    title: `${tag} Notes | NoteHub`,
    description: `Browse ${tag.toLowerCase()} notes in NoteHub. Organize, search, and manage your notes efficiently.`,
    openGraph: {
      title: `${tag} Notes | NoteHub`,
      description: `Browse and manage ${tag.toLowerCase()} notes in NoteHub.`,
      url: `https://08-zustand-three-cyan.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${tag} notes`,
        },
      ],
      type: 'website',
    },
  };
}

const NotesByCategory = async ({ params }: NotesByCategoryProps) => {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tag],
    queryFn: () => fetchNotes('', 1, tag),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;

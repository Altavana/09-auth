import css from './ProfilePage.module.css';
import Link from 'next/link';
import { getMe } from '@/lib/api/serverApi';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteHub profile page',
  description: 'Your NoteHub notes protected by your profile and password',
  keywords: ['notes', 'note manager', 'user profile'],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'NoteHub user profile',
    description: 'An app for managing your notes used email for regesration',
    url: 'https://09-auth-su7a.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Notes App',
      },
    ],
    type: 'website',
  },
};
const Profile = async () => {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <p>Username: {user.username}</p>
          </div>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};
export default Profile;

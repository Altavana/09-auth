'use client';

import { useAuthStore } from '@/lib/store/authStore';
import css from './AuthNavigation.module.css';
import Link from 'next/link';

export default function AuthNavigation() {
  // Отримуємо поточну сесію та юзера
  const { isAuthenticated, user } = useAuthStore();

  const handleLogout = () => {};

  // Якщо є сесія - відображаємо Logout та інформацію про користувача
  // інакше - посилання на логін та реєстрацію
  return isAuthenticated ? (
    <li className={css.navigationItem}>
      <p className={css.userEmail}>{user?.email}</p>
      <button className={css.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </li>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}

{
  /* 
      <li className={css.navigationItem}>
        <Link href="/notes/filter/all" className={css.navigationLink}>
          Notes
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>
      <li className={css.navigationItem}>
        <p className={css.userEmail}>User email</p>
        <button className={css.logoutButton}>Logout</button>
      </li> */
}

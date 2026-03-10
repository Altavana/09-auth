'use client';

import css from './SignUpPage.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { ApiError } from '@/app/api/api';

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState('');
  // Отримуємо метод із стора
  const setUser = useAuthStore(state => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    try {
      // Типізуємо дані форми

      const formValues = Object.fromEntries(formData) as RegisterRequest & {
        userName: string;
      };

      const { userName, ...registerData } = formValues;

      // Виконуємо запит
      const res = await register(registerData);
      // Виконуємо редірект або відображаємо помилку
      if (res) {
        // Записуємо користувача у глобальний стан
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email" className={css.formGroup}>
            Email
            <input className={css.input} id="email" type="email" name="email" required />
          </label>
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password" className={css.formGroup}>
            Password
            <input className={css.input} id="password" type="password" name="password" required />
          </label>
        </div>
        <div className={css.actions}>
          <button className={css.submitButton} type="submit">
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error} </p>}
      </form>
    </main>
  );
}

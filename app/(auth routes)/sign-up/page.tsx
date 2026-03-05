'use client';

import css from './SignUpPage.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest } from '@/lib/api/clientApi';
import { ApiError } from '@/app/api/api';
const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const handleSubmit = async (formData: FormData) => {
    try {
      // Типізуємо дані форми
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      // Виконуємо запит
      const res = await register(formValues);
      // Виконуємо редірект або відображаємо помилку
      if (res) {
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
    <>
      <div className={css.mainContent}>
        <h1 className={css.formTitle}>Sign up</h1>
        <form className={css.form} action={handleSubmit}>
          <label className={css.container}>
            Username
            <input className={css.container} type="text" name="userName" required />
          </label>
          <label className={css.container}>
            Email
            <input className={css.container} type="email" name="email" required />
          </label>
          <label className={css.container}>
            Password
            <input className={css.container} type="password" name="password" required />
          </label>
          <button className={css.container} type="submit">
            Register
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default SignUp;

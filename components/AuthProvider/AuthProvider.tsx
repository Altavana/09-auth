'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';
type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(state => state.clearIsAuthenticated);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Перевіряємо сесію
        const isAuthenticated = await checkSession();
        if (isAuthenticated) {
          // Якщо сесія валідна — отримуємо користувача
          const user = await getMe();
          if (user) setUser(user);
        } else {
          // Якщо сесія невалідна — чистимо стан
          clearIsAuthenticated();
        }
      } catch (error) {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);
  if (loading) {
    return <Loading />;
  }

  return children;
};

export default AuthProvider;

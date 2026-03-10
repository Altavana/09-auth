'use client';
import css from './EditProfilePage.module.css';
import Image from 'next/image';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { toast, Toaster } from 'react-hot-toast';

const EditProfilePage = () => {
  const user = useAuthStore(state => state.user);
  if (!user) return null;
  const setUser = useAuthStore(state => state.setUser);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const username = formData.get('username') as string;

    if (!username) {
      toast.error('Some error...');
      return;
    }
    if (username.length === 0) {
      toast.error('Please change username or press Cancel');
      return;
    }
    const res = await updateMe(username);
    if (res) {
      const updatedUser = await getMe();
      setUser(updatedUser);
      router.push('/profile');
    }
  };
  const handleCancel = () => {
    router.push('/profile');
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              defaultValue={user.username}
            />
          </div>

          <p>{user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
        <Toaster position="top-center" />
      </div>
    </main>
  );
};
export default EditProfilePage;

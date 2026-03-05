'use client';
import css from './error.module.css';
interface ErrProps {
  error: Error;
}
export default function Error({ error }: ErrProps) {
  return (
    <div>
      <p className={css.text}>Could not fetch note details. {error.message}</p>
    </div>
  );
}

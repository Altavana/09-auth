import css from './loading.module.css';

export default function Loading() {
  return (
    <div>
      <p className={css.text}>Loading, please wait...</p>
    </div>
  );
}

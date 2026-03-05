'use client';
import css from './NoteForm.module.css';
import type { NoteTag, NewNote } from '@/types/note.ts';
// import * as Yup from 'yup';
import { createNote } from '@/lib/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { useId, useState } from 'react';

// const NoteFormSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, 'Name too short')
//     .max(50, 'Name too long')
//     .required('Title is required'),
//   content: Yup.string().max(500, 'Message too long'),
//   tag: Yup.string()
//     .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
//     .required('Select tag'),
// });
type Errors = {
  title?: string;
  content?: string;
  tag?: string;
};
export default function NoteForm() {
  const [errors, setErrors] = useState<Errors>({});

  const validate = (note: NewNote) => {
    const newErrors: Errors = {};

    if (!note.title) {
      newErrors.title = 'Title is required';
    } else if (note.title.length < 3) {
      newErrors.title = 'Name too short';
    } else if (note.title.length > 50) {
      newErrors.title = 'Name too long';
    }

    if (note.content.length > 500) {
      newErrors.content = 'Message too long';
    }

    const allowedTags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

    if (!allowedTags.includes(note.tag)) {
      newErrors.tag = 'Select tag';
    }

    return newErrors;
  };
  const id = useId();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    // 4. Коли користувач змінює будь-яке поле форми — оновлюємо стан
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
    setErrors(prev => ({
      ...prev,
      [event.target.name]: undefined,
    }));
  };
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/all/');
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const newNote: NewNote = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteTag,
    };

    const validationErrors = validate(newNote);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    mutation.mutate(newNote);
  };

  const handleCancel = () => {
    router.push('/notes/filter/all/');
  };
  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${id}-title`}>Title</label>
        <input
          type="text"
          name="title"
          id={`${id}-title`}
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
        <span className={css.error}>{errors.title}</span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-content`}>Content</label>
        <textarea
          id={`${id}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
        <span className={css.error}>{errors.content}</span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-tag`}>Tag</label>
        <select
          id={`${id}-tag`}
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        <span className={css.error}>{errors.tag}</span>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}

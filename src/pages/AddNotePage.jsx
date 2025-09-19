import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';
import { FaCheck } from 'react-icons/fa';
import useInput from '../hooks/useInput';
import { useLocale } from '../contexts/LocaleContext';

const AddNotePage = () => {
  const navigate = useNavigate();
  const [title, onTitleChange] = useInput('');
  const [body, onBodyChange] = useInput('');
  const [charLimit] = useState(50);
  const { locale } = useLocale();

  const localizedText = {
    id: {
      pageTitle: 'Tambahkan Catatan Baru',
      charRemaining: 'Sisa karakter:',
      titlePlaceholder: 'Judul Catatan',
      bodyPlaceholder: 'Tuliskan catatanmu di sini...',
    },
    en: {
      pageTitle: 'Add New Note',
      charRemaining: 'Characters remaining:',
      titlePlaceholder: 'Note Title',
      bodyPlaceholder: 'Write your note here...',
    },
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { error } = await addNote({ title, body });
    if (!error) {
      navigate('/');
    }
  };

  const onTitleChangeHandler = (event) => {
    if (event.target.value.length <= charLimit) {
      onTitleChange(event);
    }
  };

  return (
    <div className="add-new-page">
      <h2>{localizedText[locale].pageTitle}</h2>
      <form onSubmit={onSubmitHandler} className="add-new-page__input">
        <p className="note-input__title__char-limit">
          {localizedText[locale].charRemaining} {charLimit - title.length}
        </p>
        <input
          className="add-new-page__input__title"
          type="text"
          placeholder={localizedText[locale].titlePlaceholder}
          value={title}
          onChange={onTitleChangeHandler}
          required
        />
        <textarea
          className="add-new-page__input__body"
          placeholder={localizedText[locale].bodyPlaceholder}
          value={body}
          onChange={onBodyChange}
          required
        />
        <div className="add-new-page__action">
          <button type="submit" className="action">
            <FaCheck />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNotePage;
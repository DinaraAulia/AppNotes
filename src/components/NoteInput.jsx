import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

const NoteInput = ({ addNote }) => {
  const [title, onTitleChangeHandler] = useInput('');
  const [body, onBodyChangeHandler] = useInput('');
  const [charLimit] = React.useState(50);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (title.trim() && body.trim()) {
      addNote({
        title,
        body,
      });
      // Mereset nilai input setelah submit
      onTitleChangeHandler({ target: { value: '' } });
      onBodyChangeHandler({ target: { value: '' } });
    }
  };

  const onTitleChange = (event) => {
    if (event.target.value.length <= charLimit) {
      onTitleChangeHandler(event);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="add-new-page__input">
      <p className="note-input__title__char-limit">Sisa karakter: {charLimit - title.length}</p>
      <input
        className="add-new-page__input__title"
        type="text"
        placeholder="Judul Catatan"
        value={title}
        onChange={onTitleChange}
        required
      />
      <textarea
        className="add-new-page__input__body"
        type="text"
        placeholder="Tuliskan catatanmu di sini..."
        value={body}
        onChange={onBodyChangeHandler}
        required
      />
      <button type="submit" className="add-new-page__input__submit-button">Tambah Catatan</button>
    </form>
  );
};

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
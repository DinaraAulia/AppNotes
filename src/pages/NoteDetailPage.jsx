import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils/network-data';
import { FaTrash, FaArchive, FaUndo } from 'react-icons/fa';
import { useLocale } from '../contexts/LocaleContext';

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { locale } = useLocale();

  const localizedText = {
    id: {
      loading: 'Memuat detail catatan...',
      notFound: 'Catatan tidak ditemukan!',
    },
    en: {
      loading: 'Loading note details...',
      notFound: 'Note not found!',
    },
  };

  useEffect(() => {
    async function fetchNoteDetail() {
      setLoading(true);
      const { data } = await getNote(id);
      setNote(data);
      setLoading(false);
    }
    fetchNoteDetail();
  }, [id]);

  const onDeleteHandler = async () => {
    await deleteNote(id);
    navigate('/');
  };

  const onArchiveHandler = async () => {
    if (note.archived) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }
    navigate('/');
  };

  if (loading) {
    return <p>{localizedText[locale].loading}</p>;
  }

  if (!note) {
    return (
      <main>
        <p className="notes-list-empty">{localizedText[locale].notFound}</p>
      </main>
    );
  }
  
  return (
    <main>
      <div className="detail-page">
        <h1 className="detail-page__title">{note.title}</h1>
        <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
        <div className="detail-page__body">{note.body}</div>
        <div className="detail-page__action">
          <button className="action" onClick={onDeleteHandler}>
            <FaTrash />
          </button>
          <button className="action" onClick={onArchiveHandler}>
            {note.archived ? <FaUndo /> : <FaArchive />}
          </button>
        </div>
      </div>
    </main>
  );
};

export default NoteDetailPage;
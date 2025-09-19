import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import NoteList from '../components/NoteList';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/network-data';
import { FaPlus } from 'react-icons/fa';
import { useLocale } from '../contexts/LocaleContext';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';
  const { locale } = useLocale();

  const localizedText = {
    id: {
      activeNotesTitle: 'Catatan Aktif',
      searchPlaceholder: 'Cari berdasarkan judul...',
      emptyNotesMessage: 'Tidak ada catatan.',
      loadingMessage: 'Memuat catatan aktif...',
    },
    en: {
      activeNotesTitle: 'Active Notes',
      searchPlaceholder: 'Search by title...',
      emptyNotesMessage: 'No notes found.',
      loadingMessage: 'Loading active notes...',
    },
  };

  useEffect(() => {
    async function fetchActiveNotes() {
      setLoading(true);
      const { data } = await getActiveNotes();
      setNotes(data);
      setLoading(false);
    }
    fetchActiveNotes();
  }, []);

  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  };

  const onArchiveHandler = async (id) => {
    await archiveNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  };

  const onSearch = (newKeyword) => {
    searchParams.set('keyword', newKeyword);
    navigate(`?${searchParams.toString()}`);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase()),
  );

  if (loading) {
    return <p>{localizedText[locale].loadingMessage}</p>;
  }

  return (
    <main>
      <h2>{localizedText[locale].activeNotesTitle}</h2>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder={localizedText[locale].searchPlaceholder}
          value={keyword}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      {filteredNotes.length > 0 ? (
        <NoteList notes={filteredNotes} onDelete={onDeleteHandler} onArchive={onArchiveHandler} />
      ) : (
        <p className="notes-list-empty">{localizedText[locale].emptyNotesMessage}</p>
      )}
      <div className="homepage__action">
        <Link to="/notes/new" className="action">
          <FaPlus />
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
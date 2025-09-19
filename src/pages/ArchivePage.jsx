import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NoteList from '../components/NoteList';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/network-data';
import { useLocale } from '../contexts/LocaleContext';

const ArchivePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';
  const { locale } = useLocale();

  const localizedText = {
    id: {
      archiveTitle: 'Catatan Arsip',
      searchPlaceholder: 'Cari berdasarkan judul...',
      emptyArchiveMessage: 'Tidak ada catatan yang diarsipkan.',
      loadingMessage: 'Memuat catatan arsip...',
    },
    en: {
      archiveTitle: 'Archived Notes',
      searchPlaceholder: 'Search by title...',
      emptyArchiveMessage: 'No archived notes found.',
      loadingMessage: 'Loading archived notes...',
    },
  };

  useEffect(() => {
    async function fetchArchivedNotes() {
      setLoading(true);
      const { data } = await getArchivedNotes();
      setNotes(data);
      setLoading(false);
    }
    fetchArchivedNotes();
  }, []);

  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    const { data } = await getArchivedNotes();
    setNotes(data);
  };

  const onUnarchiveHandler = async (id) => {
    await unarchiveNote(id);
    const { data } = await getArchivedNotes();
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
      <h2>{localizedText[locale].archiveTitle}</h2>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder={localizedText[locale].searchPlaceholder}
          value={keyword}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      {filteredNotes.length > 0 ? (
        <NoteList notes={filteredNotes} onDelete={onDeleteHandler} onArchive={onUnarchiveHandler} />
      ) : (
        <p className="notes-list-empty">{localizedText[locale].emptyArchiveMessage}</p>
      )}
    </main>
  );
};

export default ArchivePage;
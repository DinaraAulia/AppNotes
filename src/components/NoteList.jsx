import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import { Link } from 'react-router-dom';

const NoteList = ({ notes, onDelete, onArchive }) => {
  if (notes.length === 0) {
    return (
      <div className="notes-list-empty">
        <p>Tidak ada catatan</p>
      </div>
    );
  }
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Link to={`/notes/${note.id}`} key={note.id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <NoteItem {...note} onDelete={onDelete} onArchive={onArchive} />
        </Link>
      ))}
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteList;
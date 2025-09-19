import React from 'react';
import PropTypes from 'prop-types';

class NoteAppBody extends React.Component {
  render() {
    const { notes, onDelete, onArchive, onAddNote } = this.props;

    const activeNotes = notes.filter((note) => !note.archived);
    const archivedNotes = notes.filter((note) => note.archived);

    return (
      <div className="note-app__body">
        <NoteInput addNote={onAddNote} />

        <h2>Catatan Aktif</h2>
        <NoteList
          notes={activeNotes}
          onDelete={onDelete}
          onArchive={onArchive}
        />

        <h2>Arsip</h2>
        <NoteList
          notes={archivedNotes}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      </div>
    );
  }
}

NoteAppBody.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onAddNote: PropTypes.func.isRequired,
};

export default NoteAppBody;
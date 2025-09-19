import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

const NoteSearch = ({ keyword, onSearch }) => {
  const [searchKeyword, onSearchChange] = useInput(keyword);
  
  React.useEffect(() => {
    onSearch(searchKeyword);
  }, [searchKeyword, onSearch]);

  return (
    <div className="note-search">
      <input
        type="text"
        placeholder="Cari catatan..."
        value={searchKeyword}
        onChange={onSearchChange}
      />
    </div>
  );
};

NoteSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
};

export default NoteSearch;
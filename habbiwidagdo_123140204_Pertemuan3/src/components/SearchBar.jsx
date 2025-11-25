import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Cari buku berdasarkan judul atau penulis..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '300px', padding: '8px' }}
    />
  );
};

export default SearchBar;
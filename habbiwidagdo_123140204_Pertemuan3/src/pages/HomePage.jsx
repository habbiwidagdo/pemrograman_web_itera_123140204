import React, { useState, useMemo } from 'react';
import { useBooks } from '../hooks/useBooks';
import { useDebounce } from '../hooks/useDebounce';
import BookList from '../components/BookList';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const { books } = useBooks();
  const [filterStatus, setFilterStatus] = useState('semua'); // 'semua', 'milik', 'baca', 'beli'
  const [searchTerm, setSearchTerm] = useState('');

  // Gunakan useDebounce untuk pencarian
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // useMemo digunakan untuk mengoptimalkan performa
  // Daftar buku hanya akan dihitung ulang jika books, filterStatus, atau debouncedSearchTerm berubah
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Filter berdasarkan Status
        if (filterStatus === 'semua') return true;
        return book.status === filterStatus;
      })
      .filter((book) => {
        // Filter berdasarkan Pencarian (Judul atau Penulis)
        const term = debouncedSearchTerm.toLowerCase();
        return (
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term)
        );
      });
  }, [books, filterStatus, debouncedSearchTerm]);

  return (
    <div>
      <h2>Daftar Bukuku</h2>

      <div>
        Filter Status:
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ margin: '0 10px' }}
        >
          <option value="semua">Semua</option>
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <div style={{ margin: '20px 0' }}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <BookList books={filteredBooks} />
    </div>
  );
};

export default HomePage;
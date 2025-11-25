import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { useBooks } from '../hooks/useBooks';

const AddBookPage = () => {
  const { addBook } = useBooks();
  const navigate = useNavigate();

  const handleSubmit = (bookData) => {
    addBook(bookData);
    navigate('/'); // Kembali ke beranda setelah berhasil
  };

  return (
    <div>
      <h2>Tambah Buku Baru</h2>
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddBookPage;
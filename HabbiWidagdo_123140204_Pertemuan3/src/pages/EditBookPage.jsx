import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { useBooks } from '../hooks/useBooks';

const EditBookPage = () => {
  const { id } = useParams(); // Mengambil 'id' dari URL
  const { getBookById, editBook } = useBooks();
  const navigate = useNavigate();

  const bookToEdit = getBookById(id);

  if (!bookToEdit) {
    return <p>Buku tidak ditemukan!</p>;
  }

  const handleSubmit = (updatedData) => {
    editBook(id, updatedData);
    navigate('/'); // Kembali ke beranda
  };

  return (
    <div>
      <h2>Edit Buku</h2>
      <BookForm onSubmit={handleSubmit} initialData={bookToEdit} />
    </div>
  );
};

export default EditBookPage;
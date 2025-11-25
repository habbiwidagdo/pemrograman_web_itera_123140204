import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';

const BookItem = ({ book }) => {
  const { deleteBook } = useBooks();

  const getStatusLabel = (status) => {
    switch (status) {
      case 'milik': return 'Dimiliki';
      case 'baca': return 'Sedang Dibaca';
      case 'beli': return 'Ingin Dibeli';
      default: return 'N/A';
    }
  };

  return (
    <div style={{ border: '1p solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h3>{book.title}</h3>
      <p>oleh: {book.author}</p>
      <p>
        <strong>Status: {getStatusLabel(book.status)}</strong>
      </p>
      <Link to={`/edit/${book.id}`}>
        <button>Edit</button>
      </Link>
      <button onClick={() => deleteBook(book.id)} style={{ marginLeft: '5px' }}>
        Hapus
      </button>
    </div>
  );
};

export default BookItem;
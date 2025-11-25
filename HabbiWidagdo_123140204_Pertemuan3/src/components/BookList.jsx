import React from 'react';
import BookItem from './BookItem';

const BookList = ({ books }) => {
  if (books.length === 0) {
    return <p>Tidak ada buku yang ditemukan.</p>;
  }

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
import React, { createContext } from 'react'; 
import { useLocalStorage } from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', []);

  const addBook = (bookData) => {
    const newBook = { id: uuidv4(), ...bookData };
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const deleteBook = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const editBook = (id, updatedData) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, ...updatedData } : book
      )
    );
  };

  const getBookById = (id) => {
    return books.find((book) => book.id === id);
  };

  const value = {
    books,
    addBook,
    deleteBook,
    editBook,
    getBookById,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
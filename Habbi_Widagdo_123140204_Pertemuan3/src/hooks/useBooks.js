import { useContext } from 'react';
import { BookContext } from '../context/BookContext';

export const useBooks = () => {
  const context = useContext(BookContext);

  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }

  return context;
};
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';
import BookList from '../components/BookList';
import { MemoryRouter } from 'react-router-dom';
import { BookProvider } from '../context/BookContext'; // Import provider jika diperlukan

// Mock data
const mockBooks = [
  { id: '1', title: 'Buku A', author: 'Penulis A', status: 'milik' },
  { id: '2', title: 'Buku B', author: 'Penulis B', status: 'baca' },
];

// Helper untuk render dengan Router dan Context
const renderWithProviders = (ui) => {
  return render(
    <MemoryRouter>
      <BookProvider> {/* BookItem menggunakan useBooks(), jadi kita butuh Provider */}
        {ui}
      </BookProvider>
    </MemoryRouter>
  );
};

describe('BookList Component', () => {
  test('menampilkan "Tidak ada buku" jika list kosong', () => {
    renderWithProviders(<BookList books={[]} />);
    expect(screen.getByText(/Tidak ada buku yang ditemukan/i)).toBeInTheDocument();
  });

  test('me-render daftar buku dengan benar', () => {
    renderWithProviders(<BookList books={mockBooks} />);
    
    expect(screen.getByText(/Buku A/i)).toBeInTheDocument();
    expect(screen.getByText(/Penulis B/i)).toBeInTheDocument();
  });
});
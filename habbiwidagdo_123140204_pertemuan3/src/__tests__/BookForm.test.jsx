import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest'; // Impor dari 'vitest'
import '@testing-library/jest-dom';
import BookForm from '../components/BookForm';

// Jika Anda tidak menggunakan 'globals: true' di config,
// Anda harus mengimpor 'describe', 'test', 'expect' secara manual.

describe('BookForm Component', () => {
  test('menampilkan pesan error jika judul kosong saat submit', () => {
    const handleSubmit = vi.fn(); // Gunakan vi.fn() (Vitest) sebagai pengganti jest.fn()
    render(<BookForm onSubmit={handleSubmit} />);
    
    fireEvent.click(screen.getByText(/Simpan Buku/i));
    
    expect(screen.getByText(/Judul tidak boleh kosong/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test('menampilkan pesan error jika penulis kosong saat submit', () => {
    const handleSubmit = vi.fn();
    render(<BookForm onSubmit={handleSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/Judul/i), { target: { value: 'Test Judul' } });
    fireEvent.click(screen.getByText(/Simpan Buku/i));
    
    expect(screen.getByText(/Penulis tidak boleh kosong/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
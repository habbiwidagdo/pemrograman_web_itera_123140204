import { renderHook, act } from '@testing-library/react';
import { test, expect, beforeEach, afterEach } from 'vitest';
import { useLocalStorage } from '../hooks/useLocalStorage';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

test('harus mengembalikan nilai default jika localStorage kosong', () => {
  const { result } = renderHook(() => useLocalStorage('testKey', 'default'));
  
  expect(result.current[0]).toBe('default');
});

test('harus menyimpan nilai baru ke localStorage saat state diubah', () => {
  const { result } = renderHook(() => useLocalStorage('testKey', 'default'));

  act(() => {
    result.current[1]('nilai baru');
  });

  expect(result.current[0]).toBe('nilai baru');
  expect(localStorage.getItem('testKey')).toBe(JSON.stringify('nilai baru'));
});
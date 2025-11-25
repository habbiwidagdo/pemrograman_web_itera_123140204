import { useState, useEffect } from 'react';

// Fungsi helper untuk mendapatkan nilai awal dari localStorage
function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key);
  const initial = saved ? JSON.parse(saved) : defaultValue;
  return initial;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  // useEffect ini akan berjalan setiap kali 'value' atau 'key' berubah
  // dan menyimpan 'value' baru ke localStorage.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
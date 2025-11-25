import React, { useState, useEffect } from 'react';

// 'initialData' bersifat opsional. Jika ada, form ini dalam mode "edit".
const BookForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [author, setAuthor] = useState(initialData.author || '');
  const [status, setStatus] = useState(initialData.status || 'milik'); // Default 'milik'
  const [errors, setErrors] = useState({});

  // Sinkronkan state jika initialData berubah (misal: saat mode edit)
  useEffect(() => {
    setTitle(initialData.title || '');
    setAuthor(initialData.author || '');
    setStatus(initialData.status || 'milik');
  }, [initialData.id, initialData.title, initialData.author, initialData.status]); // <-- Diubah

  // Validasi form
  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Judul tidak boleh kosong';
    if (!author) newErrors.author = 'Penulis tidak boleh kosong';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true jika valid
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ title, author, status });
      // Reset form jika bukan mode edit
      if (!initialData.id) {
        setTitle('');
        setAuthor('');
        setStatus('milik');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Judul:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Penulis:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        {errors.author && <span style={{ color: 'red' }}>{errors.author}</span>}
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>
      <button type="submit" style={{ marginTop: '15px' }}>
        Simpan Buku
      </button>
    </form>
  );
};

export default BookForm;
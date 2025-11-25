import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ padding: '20px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
      <h1>Manajemen Buku Pribadi</h1>
      <nav>
        <Link to="/" style={{ marginRight: '10px' }}>
          Beranda
        </Link>
        <Link to="/add">Tambah Buku Baru</Link>
      </nav>
    </header>
  );
};

export default Header;
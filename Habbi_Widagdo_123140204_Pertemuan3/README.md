# Aplikasi Manajemen Buku Pribadi

Aplikasi Manajemen Buku Pribadi adalah aplikasi React sederhana yang dibuat untuk memenuhi tugas praktikum. Aplikasi ini memungkinkan pengguna untuk melacak koleksi buku pribadi mereka, mencatat buku yang sedang dibaca, atau buku yang ingin dibeli.

Data aplikasi disimpan di `localStorage` browser, sehingga data akan tetap ada meskipun browser ditutup.

---

## 📸 Tampilan Antarmuka

### Halaman Utama
Menampilkan daftar semua buku dengan filter status dan fitur pencarian.
![Beranda](beranda.png)


### Halaman Tambah/Edit
Formulir untuk menambah atau mengedit data buku, lengkap dengan validasi error.
![Tambah Buku](tambahbuku.png)


---

## 📚 Tech Stack Utama

* React.js (v18+)
* Vite (sebagai *build tool* dan *dev server*)
* React Router (v6)
* React Hooks (useState, useEffect, useContext)
* Vitest & React Testing Library (untuk *unit testing*)
* Browser `localStorage` (untuk persistensi data)

---

## 🚀 Instalasi dan Menjalankan Proyek

Ikuti langkah-langkah ini untuk menjalankan proyek di komputer lokal Anda.

### 1. Clone Repositori
```bash
git clone [URL_REPOSITORI_ANDA]
cd [NAMA_FOLDER_PROYEK]
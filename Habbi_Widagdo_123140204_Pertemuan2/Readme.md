# Personal Dashboard Sederhana

Ini adalah proyek *frontend* sederhana yang dibuat untuk memenuhi tugas/penilaian. Aplikasi ini berupa *Personal Dashboard* yang memungkinkan pengguna untuk mengelola daftar tugas kuliah dan melihat waktu saat ini.

Aplikasi ini dibuat murni menggunakan **HTML**, **CSS (Bootstrap)**, dan **JavaScript (ES6+)**.

## Fitur-Fitur Utama

* **Manajemen Tugas (To-Do List):**
    * Menambah tugas baru (meliputi Judul Tugas, Mata Kuliah, dan Deadline).
    * Menandai tugas sebagai "Selesai" (dan "Batal" jika tidak sengaja).
    * Menghapus tugas dari daftar.
* **Penyimpanan Lokal:**
    * Semua data tugas disimpan di **`localStorage`** peramban.
    * Data tidak akan hilang meskipun pengguna menutup tab atau me-*refresh* halaman.
* **Widget Waktu Dinamis:**
    * Menampilkan waktu dan tanggal saat ini secara *real-time* untuk zona waktu Jakarta (Asia/Jakarta).
    * Data ini diambil secara asinkron dari API publik (WorldTimeAPI).

## Tangkapan Layar (Screenshot)

![Screenshot Aplikasi Dashboard](Habbi Widagdo_123140204_Pertemuan2/Screenshot 2025-10-27 185805.png)

## Cara Menjalankan

1.  Unduh atau *clone* repositori ini.
2.  Pastikan Anda memiliki file `index.html`, `style.css`, dan `app.js` dalam satu folder.
3.  Buka file `index.html` di peramban web modern (seperti Google Chrome, Firefox, atau Edge).
4.  Aplikasi siap digunakan.

## Daftar Fitur ES6+ yang Diimplementasikan

Sesuai dengan kriteria penilaian, proyek ini mengimplementasikan beberapa fitur inti JavaScript ES6+:

1.  **`let` dan `const`**:
    * `const` digunakan untuk semua seleksi elemen DOM dan deklarasi fungsi yang tidak akan diubah.
    * `let` digunakan untuk *state* aplikasi (array `todos`) yang nilainya dapat berubah.

2.  **Arrow Functions (`=>`)**:
    * Digunakan untuk semua *event listener* (misalnya `handleFormSubmit`, `handleListClick`).
    * Digunakan untuk semua fungsi utilitas (misalnya `saveTasks`, `renderTasks`).
    * Digunakan untuk metode *callback* array (seperti `.forEach`, `.map`, dan `.filter`).

3.  **Template Literals (Backticks ``)**:
    * Digunakan secara ekstensif dalam fungsi `renderTasks()` untuk membuat blok HTML dari setiap item tugas secara dinamis.
    * Juga digunakan di `fetchWaktu()` untuk menampilkan hasil API ke dalam widget.

4.  **Fungsi Asinkron (Async/Await)**:
    * Diimplementasikan pada fungsi `fetchWaktu()` untuk mengambil data dari WorldTimeAPI.
    * Ini memungkinkan aplikasi memuat data waktu tanpa memblokir *thread* utama, dengan penanganan `try...catch` untuk *error*.

5.  **Classes**:
    * Menggunakan `class Task` sebagai *blueprint* (cetak biru) untuk membuat setiap objek tugas.
    * *Class* ini mencakup `constructor` untuk mengatur properti (id, judul, matkul, dll.) dan *method* (seperti `.toggleComplete()`) untuk mengelola status tugas.
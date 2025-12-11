# Tugas Praktikum 6 - Manajemen Matakuliah Pyramid

Aplikasi REST API sederhana untuk pengelolaan data Matakuliah menggunakan **Pyramid Framework** dan **PostgreSQL**. Proyek ini dibuat untuk memenuhi tugas Praktikum Pemrograman Web.

## Identitas Praktikan
* **Nama** : Habbi Widagdo
* **NIM** : 123140204
* **Kelas**: Praktikum Pemrograman Web RA

---

## Deskripsi Proyek
Aplikasi ini menyediakan layanan API (Application Programming Interface) untuk melakukan operasi CRUD (*Create, Read, Update, Delete*) pada entitas Matakuliah. Data disimpan secara persisten menggunakan database PostgreSQL dan diakses menggunakan ORM SQLAlchemy.

### Fitur Utama
* Menampilkan daftar semua matakuliah.
* Menampilkan detail satu matakuliah berdasarkan ID.
* Menambahkan data matakuliah baru.
* Mengubah (update) data matakuliah.
* Menghapus data matakuliah.

---

## Prasyarat (Requirements)
Sebelum menjalankan aplikasi, pastikan perangkat memiliki:
* **Python 3.7** atau lebih baru.
* **PostgreSQL** (Service database harus sudah berjalan).
* **Virtual Environment** (disarankan).

---

## Panduan Instalasi & Setup Project (Detail)

Ikuti langkah-langkah berikut secara berurutan untuk menyiapkan lingkungan pengembangan di mesin lokal (Windows/Linux/macOS).

### 1. Persiapan Folder & Virtual Environment
Buka terminal/PowerShell, arahkan ke folder proyek, lalu buat dan aktifkan virtual environment agar instalasi paket terisolasi.

```bash
# Masuk ke direktori proyek (jika belum)
cd pyramid_matakuliah

# Buat Virtual Environment
python -m venv venv

# Aktifkan Virtual Environment
# Untuk Windows:
.\venv\Scripts\activate
# Untuk macOS/Linux:
source venv/bin/activate
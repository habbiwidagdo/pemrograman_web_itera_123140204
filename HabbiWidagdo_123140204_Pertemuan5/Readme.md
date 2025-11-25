# 📚 Sistem Manajemen Perpustakaan (OOP Python)

Program ini merupakan implementasi konsep **Object-Oriented Programming (OOP)** dalam bahasa Python untuk mensimulasikan sistem manajemen perpustakaan sederhana. Program mendemonstrasikan penggunaan **abstract class**, **inheritance**, **polymorphism**, **encapsulation**, serta **property decorator**.

---

## ✨ Fungsi Program & Fitur-Fitur

### 1. **Manajemen Item Perpustakaan**
Program mampu mengelola dua jenis item:
- **Book**
- **Magazine**

Keduanya merupakan turunan dari abstract class `LibraryItem`.

### 2. **Penambahan Item**
Kelas `Library` menyediakan fungsi `add_item()` untuk menambahkan item ke dalam koleksi perpustakaan. ID item dibuat secara otomatis.

### 3. **Enkapsulasi & Property**
- ISBN pada kelas `Book` merupakan atribut **private** dan hanya bisa diakses melalui **getter/setter**.
- Setter ISBN memvalidasi bahwa ISBN harus 13 digit angka.

### 4. **Peminjaman & Pengembalian**
Setiap item dapat ditandai sebagai:
- **Dipinjam (`mark_as_borrowed`)**
- **Dikembalikan (`mark_as_returned`)**

### 5. **Polymorphism**
Method berikut diimplementasikan berbeda pada tiap subclass:
- `display_info()`
- `get_summary()`

Ketika program menampilkan daftar item atau hasil pencarian, method yang berjalan otomatis menyesuaikan tipe objek.

### 6. **Pencarian Item**
Fitur `search_item()` mendukung pencarian berdasarkan:
- **Judul** (case-insensitive, partial match)
- **ID** (pencarian unik)

---

## 🖥️ Screenshot Hasil Running Program

> **Catatan:** Ganti bagian berikut dengan screenshot milik Anda  
> (cukup tempelkan gambar dalam folder repo dan panggil seperti contoh)

![Screenshot Program](./screenshot-output.png)

---

## 📐 Diagram Class (Opsional – Nilai Tambah)

Berikut diagram class dalam bentuk UML sederhana:

+----------------------+
| <<abstract>> |
| LibraryItem |
+----------------------+
| - _item_id |
| - _title |
| - _year |
| - _is_available |
+----------------------+
| + display_info() |
| + get_summary() |
| + mark_as_borrowed() |
| + mark_as_returned() |
| + get_title() |
| + get_id() |
| + is_available() |
+----------------------+
        ▲
        |
+---------------------------+
| Book |
+---------------------------+
| - _author |
| - __isbn |
+---------------------------+
| + display_info() |
| + get_summary() |
| + isbn (getter/setter) |
+---------------------------+
        ▲
        |
+---------------------------+
| Magazine |
+---------------------------+
| - _issue_number |
+---------------------------+
| + display_info() |
| + get_summary() |
+---------------------------+

+---------------------------+
| Library |
+---------------------------+
| - __collection |
+---------------------------+
| + add_item() |
| + display_available_items()|
| + search_item() |
+---------------------------+

---

## 🏁 Cara Menjalankan Program

1. Pastikan Python 3.x terinstal.
2. Simpan kode ke file bernama `library.py`.
3. Jalankan menggunakan:

```bash
python library.py
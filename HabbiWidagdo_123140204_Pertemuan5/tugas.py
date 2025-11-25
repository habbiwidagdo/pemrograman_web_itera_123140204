import abc # Untuk mendefinisikan Abstract Base Class

# Abstract Class: LibraryItem
class LibraryItem(abc.ABC):
    # Counter untuk menghasilkan ID unik
    _next_id = 1 

    def __init__(self, title: str, year: int):
        # Menggunakan atribut protected
        self._item_id = LibraryItem._next_id
        LibraryItem._next_id += 1
        self._title = title.title() # Mengkapitalisasi setiap kata pada judul
        self._year = year
        self._is_available = True
    
    # Harus diimplementasikan oleh subclass
    @abc.abstractmethod
    def display_info(self):
        pass
        
    # Metode dasar untuk mendapatkan ringkasan informasi
    @abc.abstractmethod
    def get_summary(self):
        return f"ID: {self._item_id}, Judul: {self._title}, Tahun: {self._year}, Tersedia: {'Ya' if self._is_available else 'Tidak'}"
    
    # Metode non-abstrak untuk digunakan oleh subclass
    def mark_as_borrowed(self):
        self._is_available = False
        
    def mark_as_returned(self):
        self._is_available = True
        
    # Getter untuk mengakses atribut protected
    def get_title(self):
        return self._title
        
    def get_id(self):
        return self._item_id
        
    def is_available(self):
        return self._is_available

# Subclass 1: Book (Inheritance)
class Book(LibraryItem):
    def __init__(self, title: str, year: int, author: str, isbn: str):
        # Memanggil konstruktor parent class
        super().__init__(title, year)
        # Atribut spesifik untuk Book
        self._author = author.title() 
        # Atribut private, diakses melalui property
        self.__isbn = isbn 
    
    # Property Decorator Untuk mengakses dan memodifikasi atribut private __isbn
    @property
    def isbn(self):
        return self.__isbn
    
    @isbn.setter
    def isbn(self, new_isbn):
        if len(new_isbn) == 13 and new_isbn.isdigit():
            self.__isbn = new_isbn
        else:
            print("Peringatan: ISBN harus 13 digit angka.")

    # Implementasi Method Abstrak 1
    def display_info(self):
        print("Detail Buku")
        print(f"ID: {self._item_id}")
        print(f"Judul: {self._title}")
        print(f"Penulis: {self._author}")
        print(f"Tahun Terbit: {self._year}")
        print(f"ISBN: {self.__isbn}")
        print(f"Ketersediaan: {'Tersedia' if self._is_available else 'Dipinjam'}")

    # Implementasi Method Abstrak 2 (Polymorphism)
    def get_summary(self):
        base_summary = super().get_summary() # Mengambil ringkasan dasar dari parent
        return f"[Buku] {base_summary}, Penulis: {self._author}"

# Subclass 2: Magazine (Inheritance)
class Magazine(LibraryItem):
    def __init__(self, title: str, year: int, issue_number: int):
        # Memanggil konstruktor parent class
        super().__init__(title, year)
        # Atribut spesifik untuk Magazine
        self._issue_number = issue_number

    # Implementasi Method Abstrak 1
    def display_info(self):
        print("Detail Majalah")
        print(f"ID: {self._item_id}")
        print(f"Judul: {self._title}")
        print(f"Edisi: {self._issue_number}")
        print(f"Tahun Terbit: {self._year}")
        print(f"Ketersediaan: {'Tersedia' if self._is_available else 'Dipinjam'}")
    
    # Implementasi Method Abstrak 2 (Polymorphism)
    def get_summary(self):
        base_summary = super().get_summary() # Mengambil ringkasan dasar dari parent
        return f"[Majalah] {base_summary}, Edisi: {self._issue_number}"

# Class Library (Manajemen Koleksi)
class Library:
    def __init__(self):
        # Enkapsulasi atribut private untuk koleksi item
        self.__collection = [] 

    # Menambahkan item ke perpustakaan
    def add_item(self, item: LibraryItem):
        if isinstance(item, LibraryItem):
            self.__collection.append(item)
            print(f"\nItem '{item.get_title()}' (ID: {item.get_id()}) berhasil ditambahkan.")
        else:
            print("\nError: Item yang ditambahkan harus merupakan objek turunan LibraryItem.")

    # Menampilkan daftar item yang tersedia
    def display_available_items(self):
        available_items = [item for item in self.__collection if item.is_available()]
        
        print("Daftar Item yang Tersedia")
        
        if not available_items:
            print("Tidak ada item yang tersedia saat ini.")
            return

        # Polymorphism memanggil method get_summary() yang berbeda 
        # tergantung pada tipe objek (Book atau Magazine)
        for item in available_items:
            print(item.get_summary())

    # Mencari item berdasarkan judul atau ID
    def search_item(self, query):
        results = []
        query_str = str(query).strip().lower()

        for item in self.__collection:
            # Cari berdasarkan ID (jika input adalah angka)
            if query_str.isdigit() and item.get_id() == int(query_str):
                results.append(item)
                break # ID unik, hentikan pencarian

            # Cari berdasarkan Judul (case-insensitive, partial match)
            if query_str in item.get_title().lower():
                results.append(item)

        print(f"\nHasil Pencarian untuk '{query}' ({len(results)} ditemukan):")
        if not results:
            print("Tidak ada item yang cocok.")
            return

        # Polymorphism: Memanggil display_info() yang berbeda
        for item in results:
            item.display_info()
            
# Implementasi & Demo

# Inisialisasi Perpustakaan
my_library = Library()

## Menambahkan Item ke Perpustakaan (Demonstrasi add_item)
book1 = Book("The Python Programming Language", 2023, "Guido van Rossum", "9781234567890")
mag1 = Magazine("Computer Weekly", 2024, 52)
book2 = Book("Clean Code: A Handbook of Agile Software Craftsmanship", 2008, "Robert C. Martin", "9780132350884")
mag2 = Magazine("National Geographic", 2024, 3)

my_library.add_item(book1)
my_library.add_item(mag1)
my_library.add_item(book2)
my_library.add_item(mag2)

## Demonstrasi Enkapsulasi & Property Decorator
print("\nDemonstrasi Enkapsulasi & Property")
# Mengakses ISBN melalui property getter
print(f"ISBN Book 1 (Awal): {book1.isbn}") 
# Mengubah ISBN melalui property setter (valid)
book1.isbn = "1234567890123"
print(f"ISBN Book 1 (Baru): {book1.isbn}") 
# Mencoba mengubah ISBN dengan input tidak valid
book1.isbn = "invalid_isbn" 
print(f"ISBN Book 1 (Setelah Gagal): {book1.isbn}")

## Demonstrasi Ketersediaan
book2.mark_as_borrowed()
mag2.mark_as_borrowed()

## Menampilkan Daftar Item yang Tersedia (Demonstrasi display_available_items & Polymorphism)
my_library.display_available_items()

## Mencari Item (Demonstrasi search_item & Polymorphism)
# Cari berdasarkan Judul (partial match)
my_library.search_item("code") 

# Cari berdasarkan ID
my_library.search_item(1)

# Cari item yang tidak tersedia (Polymorphism: display_info)
my_library.search_item("National Geographic")
# Program Pengelolaan Data Mahasiswa
# Nama: Habbi Widagdo
# NIM: 123140204

# Fungsi untuk menghitung nilai UTS, UAS, Tugas, dan Nilai Akhir
# Bobot: UTS 30%, UAS 40%, Tugas 30%
def hitung_uts(nilai_uts):
    return (nilai_uts * 30)/100

def hitung_uas(nilai_uas):
    return (nilai_uas * 40)/100

def hitung_tugas(nilai_tugas):
    return (nilai_tugas * 30)/100

# Menjumlahkan semua komponen untuk mendapatkan nilai akhir
def hitung_akhir(nilai_uts, nilai_uas, nilai_tugas):
    return hitung_uts(nilai_uts) + hitung_uas(nilai_uas) + hitung_tugas(nilai_tugas)

# Menentukan grade berdasarkan nilai akhir
def grade(nilai_akhir):
    if nilai_akhir >= 80:
        return 'A'
    elif nilai_akhir >= 70:
        return 'B'
    elif nilai_akhir >= 60:
        return 'C'
    elif nilai_akhir >= 50:
        return 'D'
    else:
        return 'E'
    
# Menampilkan data mahasiswa dalam format tabel
def view(data_mahasiswa):
    """
    Menampilkan data mahasiswa dalam format tabel.
    """
    #Cetak Header Tabel
    print("=" * 91)
    print(f"{'No':>3} | {'Nama':<18} | {'NIM':<12} | {'UTS':>5} | {'UAS':>5} | {'Tugas':>7} | {'Nilai Akhir':>12} | {'Grade':^7}")
    print("-" * 91)
    
    no = 1
    #Loop data dan cetak baris
    for mhs in data_mahasiswa:

        nama = mhs["nama"]
        nim = mhs["nim"]
        uts = mhs["nilai_uts"]
        uas = mhs["nilai_uas"]
        tugas = mhs["nilai_tugas"]
        nilai_akhir = hitung_akhir(uts, uas, tugas)
        nilai_grade = grade(nilai_akhir)

        print(f"{no:>3} | {nama:<18} | {nim:<12} | {uts:>5} | {uas:>5} | {tugas:>7} | {nilai_akhir:>12.2f} | {nilai_grade:^7}")
        no += 1
        
    print("=" * 91)

# Mencari nilai tertinggi dan terendah dari data mahasiswa   
def search(data_mahasiswa):
    # Inisialisasi nilai tertinggi dan terendah
    temp_high = 0
    temp_low = 100
    # Loop data mahasiswa untuk mencari nilai tertinggi dan terendah
    for mhs in data_mahasiswa:
        uts = mhs["nilai_uts"]
        uas = mhs["nilai_uas"]  
        tugas = mhs["nilai_tugas"]
        nilai_akhir = hitung_akhir(uts, uas, tugas)
        # Cek dan update nilai tertinggi dan terendah
        if temp_high <= nilai_akhir:
            temp_high = nilai_akhir
        if temp_low >= nilai_akhir:
            temp_low = nilai_akhir
    return print(f"Hasil pencarian nilai tertinggi: {temp_high} \nHasil pencarian nilai terendah: {temp_low}")

# Fungsi untuk input data mahasiswa baru
def input_mahasiswa():
    nama = input("Masukkan nama mahasiswa: ")
    nim = input("Masukkan NIM mahasiswa: ")
    nilai_uts = int(input("Masukkan nilai UTS: "))
    nilai_uas = int(input("Masukkan nilai UAS: "))
    nilai_tugas = int(input("Masukkan nilai Tugas: "))
    # Mengembalikan data mahasiswa dalam bentuk dictionary
    return {
        "nama": nama,
        "nim": nim,
        "nilai_uts": nilai_uts,
        "nilai_uas": nilai_uas,
        "nilai_tugas": nilai_tugas
    }

# Fungsi untuk memfilter mahasiswa berdasarkan grade tertentu    
def filter_grade(data_mahasiswa, target_grade):
    # Membuat list kosong untuk menyimpan mahasiswa yang sesuai dengan grade
    filtered_students = []
    # Loop data mahasiswa dan cek grade
    for mhs in data_mahasiswa:
        uts = mhs["nilai_uts"]
        uas = mhs["nilai_uas"]
        tugas = mhs["nilai_tugas"]
        nilai_akhir = hitung_akhir(uts, uas, tugas)
        nilai_grade = grade(nilai_akhir)
        # Cek apakah grade sesuai dengan target
        if nilai_grade == target_grade:
            # Jika sesuai, tambahkan ke list filtered_students
            filtered_students.append(mhs)
    return filtered_students

# Fungsi untuk menghitung rata-rata nilai akhir mahasiswa
def avg_mahasiswa(data_mahasiswa):
    total = 0
    for mhs in data_mahasiswa:
        uts = mhs["nilai_uts"]
        uas = mhs["nilai_uas"]
        tugas = mhs["nilai_tugas"]
        nilai_akhir = hitung_akhir(uts, uas, tugas)
        total += nilai_akhir
    return total / len(data_mahasiswa)

# Menu utama program
def menu_utama():
    print("Menu Utama:")
    print("1. Lihat Data Mahasiswa")
    print("2. Cari Nilai Tertinggi dan Terendah")
    print("3. Input Data Mahasiswa Baru")
    print("4. Filter Mahasiswa Berdasarkan Grade")
    print("5. Hitung Rata-rata Nilai Akhir Mahasiswa")
    print("6. Keluar")
    selection = input("Pilih menu (1-6): ")
    if selection == '1':
        view(mahasiswa)
    elif selection == '2':
        search(mahasiswa)
    elif selection == '3':
        input_baru = input_mahasiswa()
        mahasiswa.append(input_baru)
        print("Data mahasiswa baru telah ditambahkan.")
    elif selection == '4':
        target = input("Masukkan grade yang ingin difilter (A, B, C, D, E): ")
        filtered = filter_grade(mahasiswa, target)
        view(filtered)
    elif selection == '5':
        rata_rata = avg_mahasiswa(mahasiswa)
        print(f"Rata-rata nilai akhir mahasiswa: {rata_rata:.2f}")
    elif selection == '6':
        print("Terima kasih telah menggunakan program ini.")
        exit()

# Data awal mahasiswa
mahasiswa = [
    {"nama": "Budi Santoso",
    "nim": "987654321",
    "nilai_uts" : 85,
    "nilai_uas" : 90,
    "nilai_tugas" : 80},
    {"nama": "Siti Aminah",
    "nim": "123456789",
    "nilai_uts" : 75,
    "nilai_uas" : 80,
    "nilai_tugas" : 70},
    {"nama": "Andi Wijaya",
    "nim": "192837465",
    "nilai_uts" : 65,
    "nilai_uas" : 70,
    "nilai_tugas" : 60},
    {"nama": "Dewi Lestari",
    "nim": "564738291",
    "nilai_uts" : 70,
    "nilai_uas" : 75,
    "nilai_tugas" : 65},
    {"nama": "Rina Kurnia",
    "nim": "102938475",
    "nilai_uts" : 90,
    "nilai_uas" : 95,
    "nilai_tugas" : 85}
]

print("Selamat datang di program pengelolaan data mahasiswa!\n")
# Loop menu utama hingga user memilih keluar
while True:
    menu_utama()
    print("\n")
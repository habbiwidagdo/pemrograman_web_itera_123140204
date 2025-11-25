#DATA AWAL MAHASISWA
data_mahasiswa = [
    {
        'nama': 'Andi',
        'nim': '2023001',
        'nilai_uts': 85,
        'nilai_uas': 90,
        'nilai_tugas': 78
    },
    {
        'nama': 'Budi',
        'nim': '2023002',
        'nilai_uts': 65,
        'nilai_uas': 70,
        'nilai_tugas': 60
    },
    {
        'nama': 'Cindy',
        'nim': '2023003',
        'nilai_uts': 75,
        'nilai_uas': 80,
        'nilai_tugas': 72
    },
    {
        'nama': 'Doni',
        'nim': '2023004',
        'nilai_uts': 45,
        'nilai_uas': 50,
        'nilai_tugas': 48
    },
    {
        'nama': 'Eka',
        'nim': '2023005',
        'nilai_uts': 95,
        'nilai_uas': 88,
        'nilai_tugas': 92
    },
]

#FUNGSI-FUNGSI UTAMA
#Menghitung Nilai Akhir
def hitung_nilai_akhir(uts, uas, tugas):
    nilai_akhir = (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)
    return round(nilai_akhir, 2)
# Menentukan Grade berdasarkan Nilai Akhir
def tentukan_grade(nilai_akhir):
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
# Memproses data mahasiswa untuk menambahkan Nilai Akhir dan Grade
def proses_data_mahasiswa(data):
    data_lengkap = []
    for mhs in data:
        na = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        mhs_baru = mhs.copy() # Salin data agar tidak mengubah data asli saat iterasi
        mhs_baru['nilai_akhir'] = na
        mhs_baru['grade'] = tentukan_grade(na)
        data_lengkap.append(mhs_baru)
    return data_lengkap
# Menampilkan data dalam format tabel
def tampilkan_data_tabel(data_lengkap):
    if not data_lengkap:
        print("\n[!] Data mahasiswa kosong.")
        return

    #Header Tabel
    print("\n" + "="*75)
    header = "| {:<10} | {:<15} | {:<5} | {:<5} | {:<5} | {:<10} | {:<5} |".format(
        "NIM", "NAMA", "UTS", "UAS", "TGS", "N. AKHIR", "GRADE"
    )
    print(header)
    print("="*75)

    #Isi Tabel
    for mhs in data_lengkap:
        row = "| {:<10} | {:<15} | {:<5} | {:<5} | {:<5} | {:<10.2f} | {:<5} |".format(
            mhs['nim'], mhs['nama'], mhs['nilai_uts'], mhs['nilai_uas'],
            mhs['nilai_tugas'], mhs['nilai_akhir'], mhs['grade']
        )
        print(row)
    print("="*75)

#FITUR TAMBAHAN
def input_data_baru(data):
    print("\nInput Data Mahasiswa Baru")
    nama = input("Masukkan Nama: ")
    nim = input("Masukkan NIM: ")
    while True:
        try:
            uts = int(input("Masukkan Nilai UTS (0-100): "))
            uas = int(input("Masukkan Nilai UAS (0-100): "))
            tugas = int(input("Masukkan Nilai Tugas (0-100): "))
            if 0 <= uts <= 100 and 0 <= uas <= 100 and 0 <= tugas <= 100:
                break
            else:
                print("Nilai harus antara 0 sampai 100. Coba lagi.")
        except ValueError:
            print("Input nilai harus berupa angka bulat. Coba lagi.")
    # Menambahkan data baru ke dalam list
    mahasiswa_baru = {
        'nama': nama,
        'nim': nim,
        'nilai_uts': uts,
        'nilai_uas': uas,
        'nilai_tugas': tugas
    }
    data.append(mahasiswa_baru)
    print("\n[Data berhasil ditambahkan!]")
# Mencari Nilai Tertinggi dan Terendah
def cari_nilai_ekstrem(data_lengkap, tipe='tertinggi'):
    # Memastikan data tidak kosong
    if not data_lengkap:
        print("\n[!] Data mahasiswa kosong.")
        return
    # Menentukan mahasiswa dengan nilai ekstrem berdasarkan tipe
    if tipe == 'tertinggi':
        mhs_ekstrem = max(data_lengkap, key=lambda mhs: mhs['nilai_akhir'])
        judul = "Nilai Akhir Tertinggi"
    else: # tipe == 'terendah'
        mhs_ekstrem = min(data_lengkap, key=lambda mhs: mhs['nilai_akhir'])
        judul = "Nilai Akhir Terendah"

    print(f"\nMahasiswa dengan {judul}")
    print(f"Nama: {mhs_ekstrem['nama']}")
    print(f"NIM: {mhs_ekstrem['nim']}")
    print(f"Nilai Akhir: {mhs_ekstrem['nilai_akhir']:.2f}")
    print(f"Grade: {mhs_ekstrem['grade']}")
# Filter Mahasiswa Berdasarkan Grade
def filter_berdasarkan_grade(data_lengkap):
    if not data_lengkap:
        print("\n[!] Data mahasiswa kosong.")
        return
    # Meminta input grade dari user
    grade_target = input("\nMasukkan Grade yang ingin difilter (A/B/C/D/E): ").upper()
    if grade_target not in ['A', 'B', 'C', 'D', 'E']:
        print("[!] Grade tidak valid. Gunakan A, B, C, D, atau E.")
        return
    # Melakukan filter data berdasarkan grade
    hasil_filter = [mhs for mhs in data_lengkap if mhs['grade'] == grade_target]

    print(f"\nHasil Filter Mahasiswa Grade '{grade_target}' ({len(hasil_filter)} Mahasiswa)")
    tampilkan_data_tabel(hasil_filter)
# Menghitung Rata-rata Nilai Kelas
def hitung_rata_rata_kelas(data_lengkap):
    if not data_lengkap:
        print("\n[!] Data mahasiswa kosong.")
        return

    total_nilai_akhir = sum(mhs['nilai_akhir'] for mhs in data_lengkap)
    rata_rata = total_nilai_akhir / len(data_lengkap)

    print("\nRata-rata Nilai Kelas")
    print(f"Total Mahasiswa: {len(data_lengkap)}")
    print(f"Rata-rata Nilai Akhir Kelas: {rata_rata:.2f}")

# PROGRAM UTAMA (MAIN MENU)
def menu_utama():
    # Menyimpan data mahasiswa secara global
    global data_mahasiswa
    
    while True:
        # Proses data setiap kali menu ditampilkan untuk mendapatkan Nilai Akhir & Grade terbaru
        data_lengkap = proses_data_mahasiswa(data_mahasiswa)

        print("\n" + "="*40)
        print("SISTEM PENGELOLAAN DATA NILAI MAHASISWA")
        print("="*40)
        print("1. Tampilkan Semua Data Nilai")
        print("2. Input Data Mahasiswa Baru")
        print("3. Cari Nilai Tertinggi")
        print("4. Cari Nilai Terendah")
        print("5. Filter Mahasiswa Berdasarkan Grade")
        print("6. Hitung Rata-rata Nilai Kelas")
        print("0. Keluar Program")
        print("-"*40)

        pilihan = input("Masukkan pilihan Anda (0-6): ")

        if pilihan == '1':
            tampilkan_data_tabel(data_lengkap)
        elif pilihan == '2':
            input_data_baru(data_mahasiswa)
        elif pilihan == '3':
            cari_nilai_ekstrem(data_lengkap, tipe='tertinggi')
        elif pilihan == '4':
            cari_nilai_ekstrem(data_lengkap, tipe='terendah')
        elif pilihan == '5':
            filter_berdasarkan_grade(data_lengkap)
        elif pilihan == '6':
            hitung_rata_rata_kelas(data_lengkap)
        elif pilihan == '0':
            print("\n[Program Selesai]")
            break
        else:
            print("\n[!] Pilihan tidak valid. Silakan masukkan angka antara 0 sampai 6.")

# Menjalankan menu utama
if __name__ == "__main__":
    menu_utama()
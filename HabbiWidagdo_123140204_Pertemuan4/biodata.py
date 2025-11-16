nama = "Habbi Widagdo"
nim = "123140204"
jurusan = "Informatika"
IPK = 3.75

print(f"Nama:\t{nama}")
print(f"NIM:\t{nim}")
print(f"Jurusan:\t{jurusan}")
print(f"IPK:\t{IPK}")

value1 = input("Masukkan nilai yang ingin Anda masukkan: ")
operasi = input("Masukkan operasi yang ingin dilakukan (misal: tambah, kurang, kali, bagi): ")
value2 = input("Masukkan nilai kedua: ")
if operasi == "tambah":
    print(f"Hasil penambahan nilai {value1} dan {value2} adalah: {float(value1) + float(value2)}")
elif operasi == "kurang":
    print(f"Hasil pengurangan nilai {value1} dan {value2} adalah: {float(value1) - float(value2)}")
elif operasi == "kali":
    print(f"Hasil perkalian nilai {value1} dan {value2} adalah: {float(value1) * float(value2)}")
elif operasi == "bagi":
    print(f"Hasil pembagian nilai {value1} dibagi {value2} adalah: {float(value1) / float(value2)}")
    
print(f"Ini merupakan program convert nilai.")
nilai_input = input("Masukkan nilai angka (0-100): ")
nilai = float(nilai_input)

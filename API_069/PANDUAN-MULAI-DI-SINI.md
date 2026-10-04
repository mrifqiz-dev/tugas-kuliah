# Tugas Web — Asset, Mahasiswa, dan Peminjaman

Proyek ini memakai template Bootstrap SB Admin 2 yang kamu kirim. Buka folder proyek di VS Code, lalu ikuti panduan ini secara urut.

## 1. Pahami dulu fungsi masing-masing

| Bagian | Fungsinya pada tugas ini |
| --- | --- |
| VS Code | Tempat membuka dan mengedit kode HTML, CSS, serta JavaScript. |
| Bootstrap / SB Admin 2 | Menyediakan tampilan sidebar, tabel, tombol, dan formulir. |
| Browser | Menjalankan halaman web yang dibuat. |
| API dosen | Menerima permintaan untuk membaca dan mengelola data pada server. |
| Postman | Mengirim permintaan ke API dan melihat jawabannya tanpa harus melalui halaman web. |
| Collection JSON | Kumpulan permintaan API yang sudah disiapkan dosen untuk diimpor ke Postman. |

Contoh: klik **Send** pada GET di Postman → API mengirim daftar asset dalam bentuk JSON. Di web, JavaScript mengirim GET yang sama lalu menampilkan hasilnya sebagai tabel.

Postman bukan database dan tidak harus tetap terbuka agar web berjalan. Kamu tidak perlu membuat database lokal, menjalankan XAMPP, atau menjalankan `npm install` untuk proyek ini. Koneksi internet tetap diperlukan untuk mengakses API.

## 2. Cakupan tugas dari gambar

| Menu | Fitur yang diminta dan dibuat |
| --- | --- |
| Master Asset | Create, Read, Update, Delete: tambah, lihat/detail, edit, hapus. |
| Master Mahasiswa | Create, Read, Update, Delete. |
| Transaksi Peminjaman | Create dan Read: tambah, lihat daftar, lihat detail. |

Dashboard adalah halaman pembuka tambahan. Produk dan transaksi penjualan dalam collection dosen tidak termasuk instruksi gambar, sehingga tidak dibuatkan menu.

## 3. Buka proyek di VS Code

1. Unduh ZIP hasil pengerjaan, kemudian klik kanan → **Extract All / Ekstrak Semua**. Jangan membuka proyek langsung dari dalam ZIP.
2. Kamu boleh menaruh folder hasil ekstraksi di `D:\Tugas-API\`.
3. Buka VS Code → **File → Open Folder**.
4. Pilih folder `startbootstrap-sb-admin-2-gh-pages` yang langsung berisi `index.html`, `asset.html`, `mahasiswa.html`, dan `peminjaman.html`.
5. Buka Extensions dengan **Ctrl+Shift+X**.
6. Cari **Live Server**, penerbit **Ritwick Dey**, lalu klik **Install**.
7. Klik kanan `index.html` di Explorer VS Code → **Open with Live Server**. Alternatifnya, buka `index.html` lalu klik **Go Live** pada status bar.
8. Browser akan membuka alamat lokal, biasanya `http://127.0.0.1:5500/index.html`. Port dapat berbeda.
9. Dashboard akan mengambil jumlah catatan dari API. Klik menu **Master Asset** untuk melihat tabelnya.

Simpan perubahan kode dengan **Ctrl+S**. Gunakan **Ctrl+F5** di browser jika perubahan belum terlihat.

## 4. Pertama kali memakai Postman

Gunakan aplikasi desktop Postman yang sudah terpasang. Pada beberapa versi tampilan menu bisa sedikit berbeda.

1. Buka workspace Postman.
2. Klik **Import**. Pada tampilan baru, pilih **Use resources or import → Import**. Kamu juga bisa menyeret file JSON ke Postman.
3. Pilih `postman_collection.json` di dalam folder proyek ini. Ini salinan collection dosen tanpa perubahan.
4. Setelah impor selesai, buka collection **API Praktikum (Asset, Mahasiswa, Peminjaman, Produk, Transaksi)** di panel kiri.
5. Buka folder **Master Asset** → **Read All Asset**.
6. Pastikan method-nya **GET** dan alamatnya `{{base_url}}/asset/read.php`.
7. Klik **Send**.
8. Lihat bagian response di bawah: status HTTP dan isi **Body**. Jika berhasil, API ini mengirim array JSON berisi data asset. HTTP `200 OK` menunjukkan permintaan HTTP berhasil; tetap baca isi responsnya.

`{{base_url}}` adalah variabel, yaitu nama pendek untuk alamat utama API. Pada collection dosen nilainya sudah diisi `https://api.melangkah.my.id`.

Jika variabel tersebut merah atau tidak terbaca, klik nama collection → **Variables** → isi nilai `base_url` dengan alamat tadi. Jika versi Postman menampilkan kolom Current Value, isi kolom itu. Simpan. Pastikan environment aktif tidak menimpa variabel ini dengan nilai berbeda.

Istilah yang perlu diketahui:

| Istilah | Contoh dan arti |
| --- | --- |
| Method | GET untuk membaca, POST untuk tambah/edit pada API ini, DELETE untuk menghapus. |
| URL / endpoint | Alamat fitur API, misalnya `https://api.melangkah.my.id/asset/read.php`. |
| Params | Parameter di URL, misalnya `id=25` untuk memilih satu data. |
| Headers | Informasi permintaan, misalnya `Content-Type: application/json`. |
| Body | Isi data yang dikirim pada POST. |
| Response | Jawaban API setelah kamu menekan Send. |
| ID | Nomor identitas data dari server. ID mahasiswa berbeda dengan NIM. |

## 5. Latihan CRUD Master Asset di Postman

Gunakan data latihan buatan sendiri. Collection dosen berisi contoh ID 1 dan 3; jangan langsung mengirim Update/Delete dengan ID tersebut, karena itu bisa mengenai data orang lain. Jangan menjalankan seluruh collection sekaligus dengan Runner.

### A. Read / lihat

Pilih **Read All Asset** → **Send**. Perhatikan nama field: `id`, `nama_asset`, `kategori`, `jumlah`, `kondisi`, `lokasi`, `status`.

### B. Create / tambah

1. Pilih **Create Asset**. Method sudah POST.
2. Buka tab **Body → raw** dan pilih format **JSON**.
3. Ganti isinya dengan contoh di bawah. Ubah `NAMAMU` menjadi penanda unik milikmu.

```json
{
  "nama_asset": "LATIHAN_NAMAMU_Mouse_01",
  "kategori": "Elektronik",
  "jumlah": 2,
  "kondisi": "Baik",
  "lokasi": "Lab Komputer",
  "status": "Tersedia"
}
```

4. Periksa header `Content-Type` bernilai `application/json`, lalu klik **Send** satu kali.
5. Baca pesan hasilnya. Kirim **Read All Asset** lagi, cari nama unik tadi, lalu catat `id` yang diberikan server. Jangan menebak ID.
6. Di halaman web Master Asset, klik **Muat ulang**. Data yang sama seharusnya muncul jika penyimpanan berhasil.

### C. Read detail

Pilih **Detail Asset** → tab **Params** → ganti nilai `id` dengan ID data latihanmu → **Send**.

### D. Update / edit

1. Buka **Update Asset** → **Body**.
2. Isi `id` dengan ID data latihanmu. Kirim seluruh field seperti contoh Create ditambah `id`.
3. Ubah `lokasi` menjadi `Lab Komputer 2`. Contohnya, jika ID dari server adalah 25, tambahkan `"id": 25,` di awal objek. Angka 25 hanya ilustrasi.
4. Klik **Send** → kirim GET lagi untuk memastikan lokasi berubah.

API dosen menggunakan **POST ke `update.php`**, sehingga jangan menggantinya menjadi PUT hanya karena operasi ini bernama update.

### E. Delete / hapus

1. Gunakan asset latihan yang belum dipakai pada transaksi peminjaman.
2. Buka **Delete Asset** → **Params** → isi `id` milik data latihan tersebut.
3. Periksa ID dan nama dari hasil GET terlebih dahulu, lalu klik **Send**.
4. Kirim GET lagi untuk memastikan data latihan itu hilang.

Jika ingin memakai asset untuk peminjaman, pertahankan data itu dan buat satu asset latihan terpisah untuk uji hapus.

## 6. CRUD Master Mahasiswa

Langkahnya sama: **Read All Mahasiswa → Create → Read → Detail → Update → Read → Delete → Read**. Lakukan uji hapus pada mahasiswa latihan yang belum dipakai untuk transaksi.

Contoh Body Create (ganti NIM dan nama dengan data latihan unik milikmu):

```json
{
  "nim": "99926004001",
  "nama": "LATIHAN_NAMAMU",
  "jurusan": "Teknologi Rekayasa Perangkat Lunak",
  "angkatan": 2026,
  "email": "latihan.namamu@example.com",
  "telepon": "080000000001"
}
```

Jika NIM sudah terpakai, buat NIM latihan lain sesuai ketentuan dosen. Untuk Update, tambahkan `id` dari server dan kirim seluruh field. Untuk Detail dan Delete, gunakan `?id=ID_DATA_LATIHAN`. NIM serta telepon berupa teks agar angka nol di awal tetap tersimpan.

## 7. Create dan Read transaksi peminjaman

Siapkan satu mahasiswa latihan dan satu asset latihan yang masih ada pada API. Catat ID keduanya dari hasil GET.

1. Pilih **Transaksi Peminjaman → Create Peminjaman**.
2. Buka **Body → raw → JSON**.
3. Ganti `id_mahasiswa` dan `id_asset` dengan ID yang benar-benar kamu buat. Angka 25 dan 26 pada contoh ini hanya ilustrasi.
4. Sesuaikan tanggal pinjam/kembali. Tanggal kembali tidak boleh sebelum tanggal pinjam.

```json
{
  "id_mahasiswa": 25,
  "id_asset": 26,
  "jumlah": 1,
  "tanggal_pinjam": "2026-10-04",
  "tanggal_kembali": "2026-10-05",
  "keterangan": "Latihan tugas API NAMAMU",
  "status_peminjaman": "Pending"
}
```

5. Klik **Send**, baca hasilnya, lalu jalankan **Read All Peminjaman**.
6. Catat `id_peminjaman` dari transaksi buatanmu.
7. Untuk detail, buka **Detail Peminjaman** lalu isi parameter **id_peminjaman**, bukan `id`.

Pada web, buka **Transaksi Peminjaman → Tambah Peminjaman**. Pilih mahasiswa dan asset dari dropdown. JavaScript akan mengirim ID dari pilihan tersebut. Status awal `Pending` mengikuti contoh create dalam collection. Pilihan status/kondisi master dan aturan stok lebih lanjut mengikuti validasi API; spesifikasi lengkap aturan tersebut tidak disertakan dalam lampiran.

Instruksi tugas hanya CR untuk peminjaman. Tidak perlu menguji Update/Delete Peminjaman meskipun request-nya ada dalam collection.

## 8. Cara menguji web dan API bersama

1. Jalankan web dengan Live Server.
2. Tambahkan satu asset dari formulir web → klik **Simpan**.
3. Di Postman, kirim **Read All Asset**. Cari data tadi untuk memastikan web benar-benar menyimpan ke API.
4. Edit data itu lewat web → kirim GET lagi di Postman.
5. Hapus satu data latihan lewat web → kirim GET lagi di Postman.
6. Ulangi pengujian master mahasiswa.
7. Buat transaksi lewat web dengan data latihan yang masih tersedia → periksa menggunakan **Read All Peminjaman** di Postman.
8. Coba pencarian tabel, pindah halaman tabel, tombol Detail, serta validasi kolom wajib.

| Pengujian | Hasil yang diharapkan | Hasil aktualmu |
| --- | --- | --- |
| GET daftar asset | Daftar JSON tampil | Isi setelah mencoba |
| Tambah asset di web | Tampil pada GET Postman | Isi setelah mencoba |
| Edit asset | Perubahan tampil pada GET | Isi setelah mencoba |
| Hapus asset latihan | ID tersebut tidak ada pada GET | Isi setelah mencoba |
| Tambah/edit/hapus mahasiswa | Perubahan sesuai pada GET | Isi setelah mencoba |
| Tambah peminjaman | Tampil pada GET peminjaman | Isi setelah mencoba |
| Detail data | Sesuai ID yang dipilih | Isi setelah mencoba |
| Kolom wajib kosong | Formulir menolak penyimpanan | Isi setelah mencoba |
| Tanggal kembali sebelum pinjam | Formulir menampilkan pesan kesalahan | Isi setelah mencoba |

Jika diminta bukti tugas, ambil screenshot request dan response Postman serta tabel/formulir web setelah kamu mengujinya sendiri.

## 9. File mana yang perlu dipelajari?

| File | Isi |
| --- | --- |
| `index.html` | Kerangka dashboard. |
| `asset.html` | Kerangka halaman CRUD asset. |
| `mahasiswa.html` | Kerangka halaman CRUD mahasiswa. |
| `peminjaman.html` | Kerangka halaman CR peminjaman. |
| `js/config.js` | Alamat API dosen dan waktu tunggu. |
| `js/api.js` | Fungsi `request()` untuk fetch, pengiriman JSON, dan penanganan error. |
| `js/praktikum.js` | Kolom tabel, formulir, dropdown, validasi, simpan/edit/hapus/detail. |
| `css/praktikum.css` | Penyesuaian tampilan template. |
| `postman_collection.json` | Salinan collection asli untuk impor. |
| `vendor/` dan `css/sb-admin-2.min.css` | Bootstrap, jQuery, DataTables, ikon, dan tampilan bawaan. |

Alur tombol Simpan: event `submit` → `formPayload()` membaca kolom → `api.request()` mengirim POST → API memberi respons → `loadData()` mengambil ulang daftar → tabel diperbarui.

Alur halaman daftar: `loadData()` → GET `read.php` → respons JSON → DataTables menampilkan baris. Data tidak disimpan dalam localStorage. File contoh template lain seperti `prodi.html`, `penilaian.html`, dan login tetap ada sebagai bawaan proyek lama, tetapi tidak dipakai dalam menu tugas ini.

## 10. Jika ada kendala

| Kendala | Yang perlu diperiksa |
| --- | --- |
| Import tidak terlihat | Coba seret JSON ke workspace atau cari Use resources or import. |
| `{{base_url}}` merah | Periksa Variables pada collection. |
| Could not send request | Periksa koneksi, alamat URL, serta apakah API tersedia. |
| Respons HTML, bukan JSON | Pastikan URL menuju endpoint `.php` yang benar; server mungkin sedang bermasalah. |
| Data tidak ditemukan | Ambil ID yang masih ada dari GET terbaru. |
| NIM duplikat | Gunakan NIM latihan unik. |
| Hapus ditolak | Data mungkin dipakai oleh transaksi; uji dengan data latihan yang belum direferensikan. |
| Postman berhasil, web gagal | Jalankan Live Server, lalu periksa Console browser (F12). Jika tertulis CORS, server API perlu mengizinkan origin, method, dan header terkait. Jangan memakai `mode: no-cors` karena hasil JSON tidak bisa dibaca. |
| Tampilan tanpa CSS / ikon | Pastikan ZIP diekstrak lengkap dan folder vendor/css tetap berada di samping HTML. |
| Simpan timeout / jaringan putus | Muat ulang daftar atau jalankan GET dahulu sebelum mencoba simpan lagi; server mungkin sudah menerima permintaan pertama. |

## 11. Status pemeriksaan paket

GET daftar dan detail asset, mahasiswa, serta peminjaman telah dicoba langsung ke API pada 4 Oktober 2026. Struktur datanya dipakai untuk menyusun tabel dan formulir. JavaScript diperiksa sintaksnya dan transport API diperiksa dengan respons uji terkontrol.

Pemeriksaan visual browser dan pengujian tulis/hapus pada server dosen belum dilakukan dari lingkungan pengerjaan. Lakukan uji formulir di komputer kamu dengan data latihan milikmu menggunakan urutan di atas. Hasil aktual pengujian belum diisi dan tidak boleh dianggap sudah lulus seluruhnya.

## Referensi langkah aplikasi

- Postman — impor collection: https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-data/
- Postman — memulai dan mengirim request: https://learning.postman.com/docs/getting-started/quick-start/
- Live Server (Ritwick Dey): https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
- Endpoint, method, dan contoh field: `postman_collection.json` yang dilampirkan pada tugas.
- Template dan lisensi: SB Admin 2; lihat `LICENSE` dan `README.md` bawaan.

# Panduan modifikasi · Inventaris (Bootstrap)

## Mulai dari proyek Vite sendiri

Salin seluruh isi `src/` dari folder ini ke `src/` proyek Vite React JavaScript milikmu, termasuk `format.js` dan folder `components/`. Jalankan `npm install bootstrap@5` di folder proyekmu. Jalankan `npm run dev`. Jika memakai folder dari ZIP sebagai proyek mandiri, jalankan `npm install` terlebih dahulu.

## Dari form sampai ringkasan

| Mau mengubah apa? | Buka file | Bagian yang dicari |
|---|---|---|
| Data contoh atau cara menyimpan | `src/App.jsx` | Array awal di `useState`, fungsi `tambah` dan `hapus` |
| Input, validasi, reset | `src/components/FormBarang.jsx` | `awal`, `ubah`, `simpan` |
| Jenis, total unit, rata-rata, nilai persediaan | `src/components/Ringkasan.jsx` | Perulangan di `useEffect` dengan dependensi `[barang]` |
| Search, kolom, tombol hapus | `src/components/TabelBarang.jsx` | `cari`, `hasil`, `hasil.map` |
| Tampilan angka rupiah | `src/format.js` | `rupiah` |

Saat kamu mengetik, `ubah` memperbarui objek `form` berdasarkan atribut `name`. Klik **Simpan** menjalankan `simpan`, lalu `onTambah({ nama, stok, harga })` memanggil fungsi dari App. Array baru diteruskan melalui props ke tabel dan ringkasan. Kolom nilai stok memakai `stok × harga`. Ringkasan menjumlahkan nilai semua baris. Nama yang sama, meski kapitalisasinya berbeda, dihitung sebagai satu jenis. Rata-rata = total unit dibagi jumlah jenis.

## Bikin harga opsional

Di `FormBarang.jsx`, pertahankan `const harga = Number(form.harga)`. Ganti blok validasi di `simpan` dengan berikut.

```jsx
if (!nama || !Number.isInteger(stok) || stok <= 0) {
  setPesan("Isi nama barang dan jumlah stok berupa bilangan bulat positif.");
  return;
}
```

Biarkan input harga tanpa `required`. Harga kosong menghasilkan 0 ketika dikonversi. Coba simpan Penghapus, stok 2, harga kosong. Nilai stok di baris itu harus Rp0.

## Kembali ke soal dua input dan tiga kartu

1. Di `FormBarang.jsx`, hapus properti harga dari `awal`, input harga, konversi serta validasi harga. Kirim `onTambah({ nama, stok })`.
2. Di `App.jsx`, hapus harga dari data contoh. Fungsi `tambah` sudah menerima objek dari form.
3. Di `TabelBarang.jsx`, hapus dua judul kolom **Harga satuan** dan **Nilai stok** beserta dua sel yang memanggil `rupiah`. Ubah `colSpan={6}` menjadi `colSpan={4}`.
4. Di `Ringkasan.jsx`, hapus `nilai` dari state awal dan objek `setData`, baris `let nilai = 0`, baris penjumlahannya, dan kartu `className="utama"`. Pertahankan perhitungan jenis, stok, dan rata-rata di dalam effect untuk soal yang mewajibkan `useEffect`.
5. Hapus import `rupiah` dari komponen yang sudah tidak memakainya. Uji hapus semua data. Ketiga kartu seharusnya menampilkan nol.

## Tambah filter stok di samping pencarian

Di `TabelBarang.jsx`, tambahkan state ini di bawah state `cari`, lalu **ganti** deklarasi `hasil` yang lama.

```jsx
const [filterStok, setFilterStok] = useState("semua");
const hasil = barang.filter((item) => {
  const cocokNama = item.nama.toLowerCase().includes(cari.trim().toLowerCase());
  const cocokStok = filterStok === "semua" ||
    (filterStok === "rendah" && item.stok <= 10) ||
    (filterStok === "cukup" && item.stok > 10);
  return cocokNama && cocokStok;
});
```

Bungkus label pencarian lama dan label baru berikut dalam satu `<div className="alat">`. Di `App.css`, tambahkan `.alat { justify-content: space-between; align-items: end; }` untuk menempatkan filter di kanan.

```jsx
<label>Filter stok
  <select className="form-select" value={filterStok}
    onChange={(e) => setFilterStok(e.target.value)}>
    <option value="semua">Semua stok</option>
    <option value="rendah">Maksimal 10 unit</option>
    <option value="cukup">Di atas 10 unit</option>
  </select>
</label>
```

Ringkasan tetap menerima seluruh `barang`. Dengan data awal, filter maksimal 10 menampilkan Pulpen (8 unit), sementara ringkasan tetap menunjukkan 20 unit.

## Tambah satu field sendiri

Untuk menambah lokasi rak, tambahkan `rak: ""` ke `awal` dan input dengan `name="rak"`, `value={form.rak}`, serta `onChange={ubah}`. Sertakan `rak: form.rak.trim()` di objek yang diberikan ke `onTambah`. Di tabel, tambahkan judul **Rak** dan sel `<td>{item.rak || "—"}</td>`. Naikkan `colSpan` satu angka. Cek bahwa baris contoh lama juga tetap tampil.

## Uji cepat

Data awal memberi 2 jenis, 20 unit, rata-rata 10 unit, nilai Rp84.000. Tambah Penghapus 4 unit dengan harga Rp2.000. Harus menjadi 3 jenis, 24 unit, rata-rata 8 unit, nilai Rp92.000. Cari Penghapus, lalu hapus. Hasil ringkasan kembali ke angka awal.

## Ganti tema kuning menjadi biru

Tambahkan aturan ini di bagian akhir `src/App.css`. Header menggunakan selector `h1`, dan latar aplikasi menggunakan `body`.

```css
body { background: #f2f6fc; color: #172c45; }
h1 { background: #1452a0; color: white; }
.statistik .utama { background: #e5efff; }
.table th { background: #eef4ff; }
```
Untuk tombol utama, cari `btn btn-warning` di FormBarang.jsx dalam `src/components/`, lalu ubah menjadi `btn btn-primary`. `main.jsx` mengimpor Bootstrap lebih dahulu, kemudian App.css. Class lokal seperti `layout` dan `statistik` mengatur susunan halaman.

## Atur lebar form dan tabel

Di selector `.layout` dalam App.css, `grid-template-columns` mengatur lebar kedua kolom. Contoh untuk memperlebar form di desktop:

```css
@media (min-width: 801px) {
  .layout { grid-template-columns: minmax(280px, 1.2fr) minmax(0, 2fr); }
}
```

Pertahankan aturan layar kecil agar form dan tabel tersusun vertikal. Untuk mengubah judul halaman, edit teks `<h1>` di `src/App.jsx`. Untuk judul tab browser, edit `<title>` di `index.html`.

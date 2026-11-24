# Panduan modifikasi UTS React 1 & 2 • Kasir Alat Tulis

Taruh README.md ini sejajar dengan package.json. Buka di VS Code dan tekan **Ctrl+Shift+V** untuk melihat preview. Setiap latihan dimulai dari template kasir awal, kecuali bagian filter kategori yang memakai hasil latihan kategori. Pilih bagian sesuai perintah soal.

## Mulai dari project Vite sendiri

1. Salin App.jsx, main.jsx, hitung.js, dan folder components dari src template ke src project Vite React kamu.
2. Jalankan `npm install bootstrap` lalu `npm run dev`. Buka alamat Local di terminal.
3. Cek kondisi awal. Buku tulis Rp12.000 × 2 dan pulpen Rp3.000 × 2 menghasilkan Rp30.000. Tambah penggaris Rp20.000 × 1. Sekarang ada tiga baris, diskon Rp5.000, dan total bayar Rp45.000.
4. Refresh untuk kembali ke dua barang awal. Semua latihan menggunakan data lokal di memori.

## Kalau soal meminta ini, buka file mana?

| Perubahan | File di dalam src | Yang dicari dengan Ctrl+F |
|---|---|---|
| Ubah data contoh atau mulai dari kosong | App.jsx | dataAwal |
| Tambah atau kurangi input | components/FormBarang.jsx | formAwal, handleSubmit |
| Tambah kolom atau tombol per baris | components/TabelBarang.jsx | thead, daftar.map |
| Ubah diskon atau tambah total unit | components/Ringkasan.jsx | const total |
| Ubah rumus per barang | hitung.js | subtotal |
| Ubah warna tombol | components/FormBarang.jsx | btn-primary |
| Ubah lebar form dan tabel | App.jsx | col-lg-4, col-lg-8 |

**Alur yang perlu kamu bisa tulis ulang:** input mengubah objek `form`. Saat submit, `onTambah(barang)` memanggil fungsi `tambahBarang` milik App. App memasukkan barang ke array `daftar`. Melalui `<Ringkasan daftar={daftar} />`, komponen Ringkasan menerima array itu di parameter `{ daftar }`. Jadi Ringkasan bisa membaca harga dan jumlah tiap barang tanpa mengimpor App.

## 1. Ubah diskon atau hilangkan diskon

**Contoh soal:** diskon 15% jika total belanja minimal Rp100.000. Di Ringkasan.jsx, ganti deklarasi diskon dengan baris berikut. Biarkan rumus totalBayar memakai total dikurangi diskon.

```jsx
const diskon = total >= 100000 ? Math.round(total * 0.15) : 0;
```

Ubah juga tulisan di JSX menjadi **Diskon 15% (min. Rp100.000)**. Cek dua batas dengan refresh sebelum masing-masing percobaan. Dari total awal Rp30.000, tambah Rp69.999 × 1 → bayar Rp99.999. Tambah Rp70.000 × 1 pada percobaan kedua → bayar Rp85.000.

**Kalau soal meminta tanpa diskon**, hapus deklarasi diskon dan paragraf JSX yang menampilkan diskon. Hapus deklarasi totalBayar, lalu ganti `rupiah(totalBayar)` menjadi `rupiah(total)`. Cek total Rp50.000 menghasilkan pembayaran Rp50.000.

## 2. Tambah dropdown kategori

**Contoh soal:** setiap barang punya kategori Buku atau Alat tulis. Ikuti satu nilai dari input sampai ke tabel.

1. Di App.jsx, tambahkan `kategori: "Buku"` pada objek buku tulis dan `kategori: "Alat tulis"` pada objek pulpen.
2. Di FormBarang.jsx, ganti formAwal dengan:

```jsx
const formAwal = { nama: "", kategori: "Buku", harga: "", jumlah: "" };
```

3. Di dalam form, sisipkan dropdown setelah input nama. Nama properti, atribut name, dan value harus cocok agar handleChange yang sudah ada bisa dipakai.

```jsx
<label htmlFor="kategori" className="form-label">Kategori</label>
<select id="kategori" name="kategori" className="form-select mb-3"
  value={form.kategori} onChange={handleChange}>
  <option>Buku</option>
  <option>Alat tulis</option>
</select>
```

4. Di dalam objek `onTambah({ ... })` pada handleSubmit, sisipkan `kategori: form.kategori,` setelah nama.
5. Di TabelBarang.jsx, tambahkan `<th>Kategori</th>` setelah judul kolom Barang. Pada baris di dalam map, tambahkan `<td>{barang.kategori}</td>` tepat setelah sel nama.

**Cek:** pilih Alat tulis lalu tambahkan Penghapus. Tabel menampilkan Penghapus dengan kategori Alat tulis. Setelah submit, dropdown kembali ke Buku lewat setForm(formAwal).

## 3. Tambah pencarian nama dan filter kategori

**Pencarian saja:** di App.jsx, taruh kode ini setelah deklarasi state daftar, di dalam fungsi App sebelum return.

```jsx
const [kataKunci, setKataKunci] = useState("");
const daftarTampil = daftar.filter((barang) =>
  barang.nama.toLowerCase().includes(kataKunci.trim().toLowerCase())
);
```

Letakkan input ini tepat di atas pemanggilan TabelBarang:

```jsx
<label htmlFor="cari" className="form-label">Cari nama barang</label>
<input id="cari" className="form-control mb-3" value={kataKunci}
  onChange={(event) => setKataKunci(event.target.value)} />
```

Ganti prop tabel menjadi `<TabelBarang daftar={daftarTampil} />`. Pertahankan `<Ringkasan daftar={daftar} />` agar total belanja tetap mencakup seluruh transaksi. Kalau soal meminta **total hasil pencarian**, kirim daftarTampil ke Ringkasan juga.

**Cek:** ketik PUL. Hanya Pulpen yang muncul. Kosongkan pencarian untuk menampilkan semua barang kembali.

**Tambahkan filter kategori** setelah menyelesaikan bagian 2. Di App.jsx, pertahankan state kataKunci, tambahkan state kategoriPilihan, lalu **ganti** deklarasi daftarTampil sebelumnya:

```jsx
const [kategoriPilihan, setKategoriPilihan] = useState("Semua");

const daftarTampil = daftar.filter((barang) => {
  const cocokNama = barang.nama.toLowerCase().includes(kataKunci.trim().toLowerCase());
  const cocokKategori = kategoriPilihan === "Semua" || barang.kategori === kategoriPilihan;
  return cocokNama && cocokKategori;
});
```

Tempatkan dropdown ini di atas input pencarian:

```jsx
<label htmlFor="filter" className="form-label">Filter kategori</label>
<select id="filter" className="form-select mb-2" value={kategoriPilihan}
  onChange={(event) => setKategoriPilihan(event.target.value)}>
  <option>Semua</option>
  <option>Buku</option>
  <option>Alat tulis</option>
</select>
```

**Cek:** pilih Buku dan ketik pul. Tabel kosong karena kedua kondisi harus terpenuhi. Ganti kategori ke Semua, maka Pulpen muncul lagi.

## 4. Tambah tombol Hapus per baris

Yang menyimpan daftar adalah App, sedangkan tombolnya muncul di TabelBarang. Hubungkan keduanya lewat prop fungsi.

**App.jsx** — di bawah fungsi tambahBarang, sebelum return:

```jsx
function hapusBarang(id) {
  setDaftar((sebelumnya) => sebelumnya.filter((barang) => barang.id !== id));
}
```

Tambahkan prop pada pemanggilan tabel: `<TabelBarang daftar={daftar} onHapus={hapusBarang} />`. Kalau sudah memakai pencarian, pertahankan daftarTampil sebagai nilai prop daftar.

**TabelBarang.jsx** — ubah parameter komponen menjadi `TabelBarang({ daftar, onHapus })`. Tambahkan `<th>Aksi</th>` di akhir baris judul dan sel berikut di akhir baris dalam map:

```jsx
<td>
  <button type="button" className="btn btn-outline-danger btn-sm"
    onClick={() => onHapus(barang.id)}>
    Hapus
  </button>
</td>
```

**Cek:** hapus Pulpen dari data awal. Buku tulis tetap muncul dan total berubah menjadi Rp24.000. Hapus Buku tulis juga. Total menjadi Rp0 karena reduce memakai nilai awal 0.

## 5. Tambah total unit dan jumlah baris

Di Ringkasan.jsx, sebelum return:

```jsx
const totalUnit = daftar.reduce((hasil, barang) => hasil + barang.jumlah, 0);
const jumlahBaris = daftar.length;
```

Di bawah judul Ringkasan pembayaran, tambahkan:

```jsx
<p>Jumlah baris: {jumlahBaris}</p>
<p>Total unit: {totalUnit}</p>
```

**Cek:** data awal menghasilkan 2 baris dan 4 unit. Kalau hasil unit terlihat seperti 022, cek handleSubmit. Jumlah perlu dikirim sebagai `Number(form.jumlah)` karena nilai input HTML berbentuk string.

## 6. Kurangi kolom atau hapus field sepenuhnya

**Kalau hanya diminta menyembunyikan harga satuan**, di TabelBarang.jsx hapus judul kolom Harga satuan dan sel yang memanggil `rupiah(barang.harga)`. Harga tetap tersimpan sehingga subtotal dan total bayar masih bisa dihitung. Cek bahwa judul dan isi setiap kolom tetap sejajar.

**Kalau diminta menghapus harga dari seluruh aplikasi**, ubah kasusnya menjadi **daftar stok dengan total unit**. Gunakan urutan ini supaya tidak ada rumus yang membaca harga yang sudah dihapus.

1. Di Ringkasan.jsx, ganti import dari hitung.js, seluruh deklarasi perhitungan, dan JSX lama dengan isi file berikut:

```jsx
export default function Ringkasan({ daftar }) {
  const totalUnit = daftar.reduce((hasil, barang) => hasil + barang.jumlah, 0);

  return (
    <section className="card card-body bg-primary-subtle">
      <h2 className="h5">Ringkasan stok</h2>
      <p className="mb-0">Total persediaan: {totalUnit} unit</p>
    </section>
  );
}
```

2. Di TabelBarang.jsx, hapus import dari hitung.js, dua judul kolom Harga satuan dan Subtotal, serta kedua sel yang memanggil rupiah. Sisakan kolom Barang dan Jumlah.
3. Di FormBarang.jsx, hapus harga dari formAwal, pasangan label/input harga, dan baris `harga: Number(form.harga),` di handleSubmit.
4. Di App.jsx, hapus properti harga dari setiap objek dataAwal. Sesuaikan judul menjadi **Persediaan Alat Tulis**. File hitung.js boleh dihapus setelah tidak ada lagi file yang mengimpornya.

**Cek:** stok awal 4 unit. Tambah Penghapus sejumlah 3 tanpa memasukkan harga. Tabel bertambah satu baris dan ringkasan menjadi 7 unit. Ketiga komponen di luar App tetap terpakai.

## 7. Mulai dengan tabel kosong

Di App.jsx, ubah data awal menjadi `const dataAwal = [];`. Agar pengguna tahu kenapa tabelnya kosong, letakkan potongan berikut di TabelBarang.jsx, tepat setelah tag pembuka tbody dan sebelum daftar.map:

```jsx
{daftar.length === 0 && (
  <tr>
    <td colSpan={4} className="text-center text-secondary py-3">
      Tidak ada barang untuk ditampilkan.
    </td>
  </tr>
)}
```

Angka 4 mengikuti empat kolom template awal. Sesuaikan jika menambah atau menghapus kolom. **Cek:** ringkasan dimulai dari Rp0. Setelah tambah satu barang, pesan hilang dan baris pertama muncul.

## 8. Ubah tampilan Bootstrap

Bootstrap sudah dimuat lewat main.jsx. Untuk perubahan berikut, cukup edit className di JSX.

| Permintaan | Ubah di | Contoh |
|---|---|---|
| Tombol tambah hijau | FormBarang.jsx | btn-primary → btn-success |
| Kepala tabel biru menjadi gelap | TabelBarang.jsx | table-primary → table-dark |
| Form dan tabel sama lebar di laptop | App.jsx | col-lg-4 dan col-lg-8 → keduanya col-lg-6 |
| Ringkasan lebih menonjol | Ringkasan.jsx | Tambahkan shadow-sm pada className section |

**Cek:** kecilkan lebar browser. Dengan class col-lg-*, form dan tabel akan tersusun vertikal di layar kecil.

## Simulasi 3 jam tanpa autocomplete

| Waktu | Tantangan | Cara cek sendiri |
|---|---|---|
| 0–35 menit | Jalankan template, telusuri satu submit, lalu tulis ulang handleChange dan handleSubmit pada salinan | Ketik nama lalu jumlah. Nama tetap ada, submit menambah tepat satu baris, form kembali kosong. |
| 35–80 menit | Ubah aturan diskon, lalu tambahkan total unit | Uji di bawah ambang dan tepat pada ambang. Bedakan jumlah baris dan jumlah unit. |
| 80–130 menit | Tambah kategori, pencarian, dan filter | Data lama dan baru sama-sama bisa dicari. Mengosongkan filter mengembalikan semua baris. |
| 130–180 menit | Mulai lagi dari template awal. Ubah kasir menjadi daftar stok dan tambahkan tombol hapus tanpa melihat contoh | Awalnya 4 unit. Tambah 3 menjadi 7. Hapus baris yang baru dibuat sehingga kembali ke 4. |

Setelah setiap perubahan, jalankan `npm run build` untuk mengecek impor dan sintaks. Lalu uji satu aksi di browser untuk mengecek hasil hitung dan perubahan tampilan.

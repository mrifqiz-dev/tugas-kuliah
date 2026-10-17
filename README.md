# Tugas Kuliah — satu deployment Vercel

Semua tugas HTML dan lima aplikasi React disajikan melalui satu situs. Navigasi
tetap memakai `<a href="...">` pada `index.html` utama dan daftar Framework.

## Penyebab 404

Daftar Framework sudah menunjuk ke `<nama-aplikasi>/dist/index.html`. Kelima
folder `dist` ada di komputer lokal, tetapi diabaikan `.gitignore` masing-masing
aplikasi dan tidak tercatat di Git. Sebelumnya tidak ada build di root repository
yang membuat file tersebut di Vercel. Karena itu, file tujuan tidak tersedia.

Kelima konfigurasi Vite sudah memakai `base: './'`, sehingga tidak perlu diubah.
React Compiler, Babel, CSS, dan logika aplikasi dipertahankan. Referensi sprite
ikon Hello World diperbaiki dari `/icons.svg` menjadi
`import.meta.env.BASE_URL + 'icons.svg'` agar mengikuti lokasi aplikasi.

## Build lokal

Gunakan Node.js 24 dan npm. Jalankan dari root repository:

```sh
npm run install:apps
npm run build
npm run test:deployment
npm run preview
```

`install:apps` menjalankan `npm ci --include=dev` pada kelima aplikasi dengan
lockfile masing-masing. `build` menjalankan `npm run build` di setiap aplikasi,
kemudian menyalin tugas HTML lama serta hasil build ke `dist/` di root.
Build berhenti jika salah satu aplikasi gagal. Tidak ada dependency npm baru.

Preview tersedia di <http://127.0.0.1:4173/index.html>. Uji HTTP otomatis membuat
server sementara pada port bebas, memeriksa link kedua daftar, JS/CSS/favicon,
referensi CSS lokal, semua file hasil build React, serta memastikan aset yang
tidak ada benar-benar mengembalikan 404. Pemeriksaan HTTP tidak mengeksekusi
JavaScript; pengujian interaksi React dilakukan melalui browser.

Struktur source tidak berubah. Output deployment yang dihasilkan:

```text
dist/
├── index.html
├── API_069/
├── Kuis-069/
├── Kuis_069/
├── Kuis_069.zip
├── ModifikasiBOOTSTRAP-069/
├── W1-Pratikum01_069/
├── W2-Pratikum01_069/
├── W2-Pratikum02_069/
├── W2-Pratikum03_069/
├── W2-Pratikum04_069/
└── TRPL_PRG_FRAMEWORK_M4_P1_069/
    ├── index.html
    ├── my-react-app/dist/
    ├── bmi-calculator/dist/
    ├── name-formatter/dist/
    ├── diskon-konsonan/dist/
    └── diskon-palindrom/dist/
```

Setiap folder `dist` aplikasi berisi `index.html`, `assets/`, `favicon.svg`, dan
`icons.svg`. Folder `dist/` terluar menjadi root situs, sehingga URL tetap:

```text
/TRPL_PRG_FRAMEWORK_M4_P1_069/my-react-app/dist/index.html
/TRPL_PRG_FRAMEWORK_M4_P1_069/bmi-calculator/dist/index.html
/TRPL_PRG_FRAMEWORK_M4_P1_069/name-formatter/dist/index.html
/TRPL_PRG_FRAMEWORK_M4_P1_069/diskon-konsonan/dist/index.html
/TRPL_PRG_FRAMEWORK_M4_P1_069/diskon-palindrom/dist/index.html
```

## Pengaturan Vercel

Gunakan proyek Vercel yang sudah ada. Pastikan **Root Directory adalah root
repository** (kosong/default atau `.`), bukan salah satu aplikasi React.

`vercel.json` mengatur:

| Pengaturan | Nilai |
| --- | --- |
| Framework Preset | Other (`framework: null`) |
| Install Command | `npm run install:apps` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Node.js 24 ditentukan oleh `engines.node` dalam `package.json`. Nilai build,
install, output, dan framework dari file konfigurasi mengesampingkan pengaturan
terkait di dashboard. Tidak perlu membuat proyek Vercel tambahan atau rewrite
SPA global. Dokumentasi: [konfigurasi Vercel](https://vercel.com/docs/project-configuration/vercel-json).

Setelah commit dan push ke branch deployment yang terhubung, Vercel membangun
ulang dari source. Semua `dist` tetap diabaikan Git: hasil build dibuat di
lingkungan deployment dan disertakan melalui `outputDirectory`, bukan diambil
dari commit. Commit perubahan source dan lockfile jika dependency diperbarui.

Jika menambahkan tugas HTML baru di root, tambahkan foldernya ke `staticEntries`
di `scripts/build.mjs` serta tautannya ke `index.html`. Jika menambahkan aplikasi
React baru, tambahkan namanya ke `apps` dan tautannya ke daftar Framework.

## Commit dan push

Periksa perubahan, kemudian jalankan sendiri ketika siap. Push ke branch
deployment dapat otomatis memicu deployment Vercel.

```sh
git diff --check
git add .gitignore package.json package-lock.json vercel.json scripts README.md TRPL_PRG_FRAMEWORK_M4_P1_069/my-react-app/src/App.jsx
git commit -m "fix: build all React assignments for one Vercel deployment"
git push origin main
```

## Hasil verifikasi lokal (17 Oktober 2026)

- `npm run install:apps`: berhasil untuk kelima lockfile.
- `npm run build`: kelima build Vite berhasil; output gabungan tersedia.
- `npm run test:deployment`: 127 halaman/aset lokal lulus melalui HTTP.
- Delapan halaman tugas lama dari daftar utama dapat diakses.
- 7.685 file tugas lama pada output identik byte-per-byte dengan source.
- Navigasi klik dari daftar utama ke daftar Framework dan kelima aplikasi lulus.
- JS, CSS, favicon, gambar, dan sprite ikon aplikasi termuat; tidak ada error
  atau warning console pada kelima aplikasi ketika diuji.

| Halaman/aplikasi | Hasil browser |
| --- | --- |
| Daftar utama dan Framework | Terbuka dan link menuju lokasi yang benar |
| Hello World | Counter berubah dari 0 ke 1; gambar dan enam ikon termuat |
| BMI | 70 kg / 175 cm menghasilkan 22,9, kategori normal; input nol ditolak |
| Format nama | Budi Santoso menghasilkan BS - BUDI SANTOSO; nama kosong ditolak |
| Diskon konsonan | Rp100.000, Budi Santoso: diskon 12%, harga akhir Rp88.000 |
| Diskon palindrom | Rp100.000, Anna: diskon 25%, harga akhir Rp75.000 |

Nama yang hanya berisi spasi juga ditolak pada kedua aplikasi diskon.
Validasi ini mencakup build, navigasi, aset, dan interaksi dasar. Perbandingan
visual dengan baseline belum dilakukan karena repository tidak memiliki baseline.
Website produksi lama masih mengembalikan 404 untuk kelima link saat diperiksa;
perbaikan belum di-push atau di-deploy. Hasil deployment Vercel perlu diperiksa
setelah pengguna melakukan push.

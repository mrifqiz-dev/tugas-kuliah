
import { useState } from 'react';

function DiskonPalindrom() {
  const [totalHarga, setTotalHarga] = useState('');
  const [namaPelanggan, setNamaPelanggan] = useState('');
  const [hasil, setHasil] = useState(null);

  const cekDanHitung = (e) => {
    e.preventDefault();

    const harga = Number(totalHarga);
    const nama = namaPelanggan.trim();

    // Validasi input
    if (!nama || !Number.isFinite(harga) || harga <= 0) {
      alert('Masukkan nama dan total harga yang valid!');
      setHasil(null);
      return;
    }

    // Mengabaikan spasi dan huruf besar/kecil
    const namaNormal = nama.toLowerCase().replace(/\s/g, '');

    // Membalik karakter nama
    const namaTerbalik = [...namaNormal].reverse().join('');

    // Mengecek apakah nama palindrom
    const isPalindrom = namaNormal === namaTerbalik;

    // Menghitung jumlah karakter unik
    const jumlahKarakterUnik = new Set(namaNormal).size;

    // Menentukan status nama
    const statusNama = isPalindrom
      ? 'Palindrom'
      : 'Bukan Palindrom';

    // Diskon 25% untuk palindrom minimal 3 karakter
    // Bukan palindrom: 1% per karakter unik
    let persentaseDiskon = 0;

    if (isPalindrom && namaNormal.length >= 3) {
      persentaseDiskon = 25;
    } else if (!isPalindrom) {
      persentaseDiskon = jumlahKarakterUnik;
    }

    // Menghitung harga setelah diskon
    const totalPotongan = harga * persentaseDiskon / 100;
    const hargaAkhir = harga - totalPotongan;

    setHasil({
      statusNama,
      jumlahKarakterUnik,
      persentaseDiskon,
      hargaAkhir
    });
  };

  // Format angka ke Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(angka);
  };

  return (
    <div className="card">
      <h1>Program Diskon Palindrom Nama</h1>

      <form onSubmit={cekDanHitung}>
        <div className="field">
          <label>Total Harga Pembelian:</label>
          <input
            type="number"
            min="0.01"
            step="any"
            value={totalHarga}
            onChange={(e) => setTotalHarga(e.target.value)}
            placeholder="Masukkan total harga"
            required
          />
        </div>

        <div className="field">
          <label>Nama Pelanggan:</label>
          <input
            type="text"
            value={namaPelanggan}
            onChange={(e) => setNamaPelanggan(e.target.value)}
            placeholder="Masukkan nama pelanggan"
            required
          />
        </div>

        <button type="submit">Cek & Hitung</button>
      </form>

      {hasil && (
        <div className="hasil">
          <h2>Hasil Perhitungan Diskon</h2>

          <p>
            Status Nama:
            <strong> {hasil.statusNama}</strong>
          </p>

          <p>
            Jumlah Karakter Unik:
            <strong> {hasil.jumlahKarakterUnik}</strong>
          </p>

          <p>
            Persentase Diskon:
            <strong> {hasil.persentaseDiskon}%</strong>
          </p>

          <p>
            Harga Pembelian Setelah Diskon:
            <strong> {formatRupiah(hasil.hargaAkhir)}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default DiskonPalindrom;

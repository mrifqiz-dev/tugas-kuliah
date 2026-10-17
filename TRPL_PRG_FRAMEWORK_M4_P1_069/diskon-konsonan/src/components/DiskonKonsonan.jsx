
import { useState } from 'react';

function DiskonKonsonan() {
  const [totalHarga, setTotalHarga] = useState('');
  const [namaPelanggan, setNamaPelanggan] = useState('');
  const [hasil, setHasil] = useState(null);

  const hitungDiskon = (e) => {
    e.preventDefault();

    const harga = Number(totalHarga);
    const nama = namaPelanggan.trim();

    // Validasi input
    if (!nama || !Number.isFinite(harga) || harga <= 0) {
      alert('Masukkan nama dan total harga yang valid!');
      setHasil(null);
      return;
    }

    // Menghitung jumlah huruf konsonan
    const konsonan = nama.match(/[bcdfghjklmnpqrstvwxyz]/gi) || [];
    const jumlahKonsonan = konsonan.length;

    // Menghitung jumlah kata pada nama
    const jumlahKata = nama.split(/\s+/).length;

    // Setiap konsonan memberikan diskon 2%
    const diskonKonsonan = jumlahKonsonan * 2;

    // Bonus 5% apabila lebih dari 2 kata
    const bonusDiskon = jumlahKata > 2 ? 5 : 0;

    // Maksimal diskon 20%
    const persentaseDiskon = Math.min(
      diskonKonsonan + bonusDiskon,
      20
    );

    // Menghitung potongan dan harga akhir
    const totalPotongan = harga * persentaseDiskon / 100;
    const hargaAkhir = harga - totalPotongan;

    setHasil({
      jumlahKonsonan,
      jumlahKata,
      persentaseDiskon,
      totalPotongan,
      hargaAkhir
    });
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(angka);
  };

  return (
    <div className="card">
      <h1>Program Diskon Huruf Konsonan</h1>

      <form onSubmit={hitungDiskon}>
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

        <button type="submit">Hitung Diskon</button>
      </form>

      {hasil && (
        <div className="hasil">
          <h2>Hasil Perhitungan Diskon</h2>

          <p>Jumlah Huruf Konsonan:
            <strong> {hasil.jumlahKonsonan}</strong>
          </p>

          <p>Jumlah Kata:
            <strong> {hasil.jumlahKata}</strong>
          </p>

          <p>Persentase Diskon:
            <strong> {hasil.persentaseDiskon}%</strong>
          </p>

          <p>Total Potongan Harga:
            <strong> {formatRupiah(hasil.totalPotongan)}</strong>
          </p>

          <p>Harga Pembelian Setelah Diskon:
            <strong> {formatRupiah(hasil.hargaAkhir)}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default DiskonKonsonan;

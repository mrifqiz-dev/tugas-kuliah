import { useEffect, useState } from "react";
import { rupiah } from "../format";

function hitungRingkasan(barang) {
  const jenis = barang.length;
  const stok = barang.reduce((total, item) => total + item.stok, 0);
  const nilai = barang.reduce((total, item) => total + item.stok * item.harga, 0);
  const rata = jenis > 0 ? stok / jenis : 0;
  return { jenis, stok, rata, nilai };
}

export default function Ringkasan({ barang }) {
  const [ringkasan, setRingkasan] = useState(() => hitungRingkasan(barang));

  // Sesuai soal, hitung ulang setiap kali daftar barang berubah.
  useEffect(() => {
    setRingkasan(hitungRingkasan(barang));
  }, [barang]);

  return (
    <section className="ringkasan" aria-label="Ringkasan stok">
      <div className="metrik"><span>Jumlah Jenis Barang</span><strong>{ringkasan.jenis} Jenis</strong></div>
      <div className="metrik sorot"><span>Total Stok</span><strong>{ringkasan.stok} Unit</strong></div>
      <div className="metrik"><span>Rata-rata Stok</span><strong>{ringkasan.rata.toLocaleString("id-ID", { maximumFractionDigits: 2 })} Unit</strong></div>
      <div className="metrik nilai"><span>Total Nilai Barang</span><strong>{rupiah(ringkasan.nilai)}</strong></div>
    </section>
  );
}

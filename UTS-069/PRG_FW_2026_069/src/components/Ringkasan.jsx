import { useEffect, useState } from "react";

function hitungRingkasan(materi) {
  const jenis = materi.length;
  const durasi = materi.reduce((total, item) => total + item.durasi, 0);
  const rata = jenis > 0 ? durasi / jenis : 0;
  return { jenis, durasi, rata };
}

export default function Ringkasan({ materi }) {
  const [ringkasan, setRingkasan] = useState(() => hitungRingkasan(materi));

  // Sesuai soal, hitung ulang setiap kali daftar materi berubah.
  useEffect(() => {
    setRingkasan(hitungRingkasan(materi));
  }, [materi]);

  return (
    <section className="card">
      <header className="card-header">
      <h2>Ringkasan Belajar</h2>
      </header>
    <section className="ringkasan" aria-label="Ringkasan durasi">
      <div className="metrik"><span>Jumlah Sesi</span><strong>{ringkasan.jenis} Sesi</strong></div>
      <div className="metrik sorot"><span>Total Durasi</span><strong>{ringkasan.durasi} Menit</strong></div>
      <div className="metrik"><span>Rata-rata Durasi</span><strong>{ringkasan.rata.toLocaleString("id-ID", { maximumFractionDigits: 2 })} menit</strong></div>
    </section>
    </section>
  );
}

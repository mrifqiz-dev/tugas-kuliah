import { useEffect, useState } from "react";
import { rupiah } from "../format";

export default function Ringkasan({ barang }) {
  const [data, setData] = useState({ jenis: 0, stok: 0, rata: 0, nilai: 0 });

  useEffect(() => {
    const jenis = new Set(barang.map((item) => item.nama.toLowerCase())).size;
    let stok = 0;
    let nilai = 0;
    for (const item of barang) {
      stok += item.stok;
      nilai += item.stok * item.harga;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData({ jenis, stok, rata: jenis ? stok / jenis : 0, nilai });
  }, [barang]);

  return (
    <section className="statistik" aria-label="Ringkasan inventaris">
      <div>Jenis barang<strong>{data.jenis}</strong></div>
      <div>Total stok<strong>{data.stok} unit</strong></div>
      <div>Rata-rata per jenis<strong>{data.rata.toLocaleString("id-ID")} unit</strong></div>
      <div className="utama">Total nilai persediaan<strong>{rupiah(data.nilai)}</strong></div>
    </section>
  );
}

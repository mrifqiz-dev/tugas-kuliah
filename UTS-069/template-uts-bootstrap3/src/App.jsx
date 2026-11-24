import { useState } from "react";
import Ringkasan from "./components/Ringkasan";
import FormBarang from "./components/FormBarang";
import DaftarBarang from "./components/DaftarBarang";

const dataAwal = [
  { id: 1, nama: "Buku Tulis A5", stok: 30, harga: 12000 },
  { id: 2, nama: "Pulpen Gel", stok: 25, harga: 5000 },
  { id: 3, nama: "Map Dokumen A4", stok: 12, harga: 8000 },
];

export default function App() {
  const [barang, setBarang] = useState(dataAwal);

  function tambahBarang(item) {
    setBarang((sebelumnya) => [...sebelumnya, item]);
  }

  function hapusBarang(id) {
    setBarang((sebelumnya) => sebelumnya.filter((item) => item.id !== id));
  }

  return (
    <main className="dashboard">
      <header className="kepala">
        <h1>Catatan Stok Gudang</h1>
        <span className="label-header">Barang - Stok - Harga</span>
      </header>
      <div className="isi">
        <Ringkasan barang={barang} />
        <div className="panel-grid">
          <FormBarang onTambah={tambahBarang} />
          <DaftarBarang barang={barang} onHapus={hapusBarang} />
        </div>
      </div>
    </main>
  );
}

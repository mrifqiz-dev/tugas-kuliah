import { useState } from "react";
import FormBarang from "./components/FormBarang";
import Ringkasan from "./components/Ringkasan";
import TabelBarang from "./components/TabelBarang";

export default function App() {
  const [barang, setBarang] = useState([
    { id: 1, nama: "Buku Tulis", stok: 12, harga: 5000 },
    { id: 2, nama: "Pulpen", stok: 8, harga: 3000 },
  ]);

  function tambah(data) {
    const item = { ...data, id: crypto.randomUUID() };
    setBarang((lama) => [...lama, item]);
  }

  function hapus(id) {
    setBarang((lama) => lama.filter((item) => item.id !== id));
  }

  return (
    <main className="container">
      <h1>Inventaris toko</h1>
      <Ringkasan barang={barang} />
      <div className="layout">
        <FormBarang onTambah={tambah} />
        <TabelBarang barang={barang} onHapus={hapus} />
      </div>
    </main>
  );
}

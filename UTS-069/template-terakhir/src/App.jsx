import { useState } from "react";
import FormBarang from "./components/FormBarang";
import TabelBarang from "./components/TabelBarang";
import Ringkasan from "./components/Ringkasan";

const dataAwal = [
  { id: 1, nama: "Buku tulis", harga: 12000, jumlah: 2 },
  { id: 2, nama: "Pulpen", harga: 3000, jumlah: 2 },
];

export default function App() {
  const [daftar, setDaftar] = useState(dataAwal);

  function tambahBarang(barang) {
    const barangBaru = { ...barang, id: crypto.randomUUID() };
    setDaftar((sebelumnya) => [...sebelumnya, barangBaru]);
  }

  return (
    <main className="container py-5">
      <h1 className="text-primary mb-4">Kasir Alat Tulis</h1>
      <div className="row g-4">
        <div className="col-lg-4">
          <FormBarang onTambah={tambahBarang} />
        </div>
        <div className="col-lg-8">
          <TabelBarang daftar={daftar} />
          <Ringkasan daftar={daftar} />
        </div>
      </div>
    </main>
  );
}

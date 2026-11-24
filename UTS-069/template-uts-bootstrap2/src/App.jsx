import { useState } from "react";
import FormPesanan from "./components/FormPesanan";
import Ringkasan from "./components/Ringkasan";
import TabelPesanan from "./components/TabelPesanan";

export default function App() {
  const [pesanan, setPesanan] = useState([]);

  function tambah(data) {
    const baru = { ...data, id: crypto.randomUUID(), status: "Belum Bayar", tunai: 0, kembali: 0 };
    setPesanan((lama) => [...lama, baru]);
  }

  function bayar(id, tunai) {
    setPesanan((lama) => lama.map((item) => {
      if (item.id !== id || item.status === "Lunas" ||
          !Number.isInteger(tunai) || tunai < item.tagihan) return item;
      return { ...item, status: "Lunas", tunai, kembali: tunai - item.tagihan };
    }));
  }

  return (
    <main className="container">
      <h1>Kasir kantin</h1>
      <Ringkasan pesanan={pesanan} />
      <div className="layout">
        <FormPesanan onTambah={tambah} />
        <TabelPesanan pesanan={pesanan} onBayar={bayar} />
      </div>
    </main>
  );
}

import { useState } from "react";
import Ringkasan from "./components/Ringkasan";
import FormMateri from "./components/FormMateri";
import DaftarMateri from "./components/DaftarMateri";

const dataAwal = [
  { id: 1, nama: "React Hooks", durasi: 60},
  { id: 2, nama: "Bootstrap Grids", durasi: 45 },
  { id: 3, nama: "JavaScript Array", durasi: 75},
];

export default function App() {
  const [materi, setMateri] = useState(dataAwal);

  function tambahMateri(item) {
    setMateri((sebelumnya) => [...sebelumnya, item]);
  }

  function hapusMateri(id) {
    setMateri((sebelumnya) => sebelumnya.filter((item) => item.id !== id));
  }

  return (
    <main className="dashboard">
      <header className="kepala">
        <h1>Catatan Durasi Belajar</h1>
        <h6>Pantau sesi belajar dan ringkasan waktu belajar anda</h6>
      </header>
      <div className="isi">
        <FormMateri onTambah={tambahMateri} />
      <div className="panel-grid">
        <DaftarMateri materi={materi} onHapus={hapusMateri} />
        <Ringkasan materi={materi} />
          </div>
        </div>
        </main>
  );
}

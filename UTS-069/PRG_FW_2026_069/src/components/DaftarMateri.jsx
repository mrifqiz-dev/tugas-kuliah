import { useState } from "react";

export default function Daftarmateri({ materi, onHapus }) {
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("semua");

  const hasil = materi.filter((item) => {
    const cocokNama = item.nama.toLowerCase().includes(keyword.trim().toLowerCase());
    if (filter === "rendah") return cocokNama && item.durasi <= 10;
    if (filter === "tinggi") return cocokNama && item.durasi > 10;
    return cocokNama;
  });

  return (
    <section className="card">
    <header className="card-header">
      <h2>Daftar Sesi Belajar</h2>
      <label htmlFor="pencarian" className="form-label mt-2">Pencarian:</label>
      <div className="row g-10 mb-3">
        <input id="pencarian" className="form-control mt-10"  type="search" placeholder="Cari nama materi..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </div>
      </header>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered align-middle mb-0">
            <thead className="table-light text-center">
              <tr>{["No", "Nama Materi", "Durasi (Menit)", "Aksi"].map((judul) => <th key={judul} scope="col">{judul}</th>)}</tr>
            </thead>
            <tbody>
              {hasil.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{item.nama}</td>
                  <td className="text-end">{item.durasi} Menit</td>
                  <td className="text-center"><button className="btn btn-danger btn-sm" onClick={() => onHapus(item.id)}>Hapus</button></td>
                </tr>
              ))}
              {!hasil.length && <tr><td colSpan="6" className="text-center text-secondary py-3">{materi.length ? "Materi tidak ditemukan" : "Belum ada materi."}</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

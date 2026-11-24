import { useState } from "react";
import { rupiah } from "../format";

export default function DaftarBarang({ barang, onHapus }) {
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("semua");

  const hasil = barang.filter((item) => {
    const cocokNama = item.nama.toLowerCase().includes(keyword.trim().toLowerCase());
    if (filter === "rendah") return cocokNama && item.stok <= 10;
    if (filter === "tinggi") return cocokNama && item.stok > 10;
    return cocokNama;
  });

  return (
    <section className="card">
      <h2 className="card-header">Daftar Stok Barang</h2>
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between gap-2 mb-2 flex-wrap">
          <label htmlFor="pencarian" className="form-label mb-0">Pencarian Barang</label>
          <select aria-label="Filter jumlah stok" className="form-select form-select-sm w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="semua">Semua stok</option>
            <option value="rendah">Stok ≤ 10 unit</option>
            <option value="tinggi">Stok &gt; 10 unit</option>
          </select>
        </div>
        <input id="pencarian" className="form-control mb-3" type="search" placeholder="Masukkan nama barang..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <div className="table-responsive">
          <table className="table table-bordered align-middle mb-0">
            <thead className="table-light text-center">
              <tr>{["No", "Nama Barang", "Jumlah Stok", "Harga Satuan", "Harga Total", "Aksi"].map((judul) => <th key={judul} scope="col">{judul}</th>)}</tr>
            </thead>
            <tbody>
              {hasil.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{item.nama}</td>
                  <td className="text-end">{item.stok} Unit</td>
                  <td className="text-end">{rupiah(item.harga)}</td>
                  <td className="text-end">{rupiah(item.stok * item.harga)}</td>
                  <td className="text-center"><button className="btn btn-danger btn-sm" onClick={() => onHapus(item.id)}>Hapus</button></td>
                </tr>
              ))}
              {!hasil.length && <tr><td colSpan="6" className="text-center text-secondary py-3">{barang.length ? "Barang tidak ditemukan." : "Belum ada barang."}</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

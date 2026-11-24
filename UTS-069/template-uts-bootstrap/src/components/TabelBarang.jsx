import { useState } from "react";
import { rupiah } from "../format";

export default function TabelBarang({ barang, onHapus }) {
  const [cari, setCari] = useState("");
  const hasil = barang.filter((item) => item.nama.toLowerCase().includes(cari.trim().toLowerCase()));

  return (
    <section className="card panel">
      <h2>Daftar barang</h2>
      <label>Cari nama barang<input className="form-control" type="search" value={cari} onChange={(e) => setCari(e.target.value)} /></label>
      <div className="gulir">
        <table className="table">
          <thead><tr><th>No</th><th>Nama barang</th><th>Stok</th><th>Harga satuan</th><th>Nilai stok</th><th>Aksi</th></tr></thead>
          <tbody>
            {hasil.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td><td>{item.nama}</td><td>{item.stok}</td>
                <td>{rupiah(item.harga)}</td><td>{rupiah(item.stok * item.harga)}</td>
                <td><button className="btn btn-outline-danger" onClick={() => onHapus(item.id)}>Hapus</button></td>
              </tr>
            ))}
            {hasil.length === 0 && <tr><td colSpan={6}>Tidak ada barang yang ditampilkan.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

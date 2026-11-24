import { useState } from "react";

const formAwal = { nama: "", harga: "", jumlah: "" };

export default function FormBarang({ onTambah }) {
  const [form, setForm] = useState(formAwal);

  function handleChange(event) {
    const { name, value } = event.target;
    // name pada input sama dengan nama properti di form.
    setForm((sebelumnya) => ({ ...sebelumnya, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.nama.trim()) return;

    // Nilai input HTML berupa string. Ubah angka saat menyimpan.
    onTambah({
      nama: form.nama.trim(),
      harga: Number(form.harga),
      jumlah: Number(form.jumlah),
    });
    setForm(formAwal);
  }

  return (
    <form className="card card-body shadow-sm" onSubmit={handleSubmit}>
      <h2 className="h5 mb-3">Tambah barang</h2>
      <label className="form-label" htmlFor="nama">Nama barang</label>
      <input className="form-control mb-3" id="nama" name="nama"
        value={form.nama} onChange={handleChange} required />

      <label className="form-label" htmlFor="harga">Harga satuan (Rp)</label>
      <input className="form-control mb-3" id="harga" name="harga" type="number"
        value={form.harga} onChange={handleChange} />

      <label className="form-label" htmlFor="jumlah">Jumlah</label>
      <input className="form-control mb-4" id="jumlah" name="jumlah" type="number"
        value={form.jumlah} onChange={handleChange} min="1" required />

      <button className="btn btn-primary" type="submit">Tambah barang</button>
    </form>
  );
}

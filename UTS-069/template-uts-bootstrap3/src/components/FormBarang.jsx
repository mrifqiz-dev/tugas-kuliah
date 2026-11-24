import { useState } from "react";

const formAwal = { nama: "", stok: "", harga: "" };

export default function FormBarang({ onTambah }) {
  const [form, setForm] = useState(formAwal);
  const [pesan, setPesan] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((sebelumnya) => ({ ...sebelumnya, [name]: value }));
    setPesan("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.nama.trim()) {
      setPesan("Nama barang wajib diisi.");
      return;
    }
    const stok = Number(form.stok);
    if (!Number.isFinite(stok) || stok <= 0) {
      setPesan("Jumlah stok harus berupa angka lebih dari 0.");
      return;
    }
    onTambah({
      id: crypto.randomUUID(),
      nama: form.nama.trim(),
      stok,
      harga: Number(form.harga),
    });
    setForm(formAwal);
  }

  return (
    <section className="card">
      <h2 className="card-header">Tambah Barang</h2>
      <form className="card-body" onSubmit={handleSubmit} noValidate>
        <label className="form-label" htmlFor="nama">Nama Barang</label>
        <input className="form-control mb-3" id="nama" name="nama" placeholder="Laptop geming" value={form.nama} onChange={handleChange} />
        <label className="form-label" htmlFor="stok">Jumlah Stok</label>
        <input className="form-control mb-3" type="number" id="stok" name="stok" placeholder="67" value={form.stok} onChange={handleChange} />
        <label className="form-label" htmlFor="harga">Harga Satuan (Rp)</label>
        <input className="form-control mb-3" type="number" id="harga" name="harga" placeholder="67676767" value={form.harga} onChange={handleChange} />
        {pesan && <p className="text-danger small" role="alert">{pesan}</p>}
        <button className="btn btn-primary w-100 fw-semibold" type="submit">Simpan</button>
      </form>
    </section>
  );
}

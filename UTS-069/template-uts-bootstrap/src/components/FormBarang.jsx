import { useState } from "react";

const awal = { nama: "", stok: "", harga: "" };

export default function FormBarang({ onTambah }) {
  const [form, setForm] = useState(awal);
  const [pesan, setPesan] = useState("");

  function ubah(event) {
    const { name, value } = event.target;
    setForm((lama) => ({ ...lama, [name]: value }));
  }

  function simpan(event) {
    event.preventDefault();
    const nama = form.nama.trim();
    const stok = Number(form.stok);
    const harga = Number(form.harga);
    if (!nama || !Number.isInteger(stok) || stok <= 0 ||
        !Number.isInteger(harga) || harga <= 0) {
      setPesan("Isi nama barang serta stok dan harga dengan bilangan bulat positif.");
      return;
    }
    onTambah({ nama, stok, harga });
    setForm(awal);
    setPesan("");
  }

  return (
    <section className="card panel">
      <h2>Tambah barang</h2>
      <form onSubmit={simpan} noValidate>
        <label>Nama barang<input className="form-control" name="nama" value={form.nama} onChange={ubah} /></label>
        <label>Jumlah stok<input className="form-control" type="number" name="stok" value={form.stok} onChange={ubah} /></label>
        <label>Harga satuan (Rp)<input className="form-control" type="number" name="harga" value={form.harga} onChange={ubah} /></label>
        {pesan && <p role="alert">{pesan}</p>}
        <button className="btn btn-warning">Simpan</button>
      </form>
    </section>
  );
}

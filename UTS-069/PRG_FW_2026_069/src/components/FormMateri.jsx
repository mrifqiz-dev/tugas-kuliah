import { useState } from "react";

const formAwal = { nama: "", durasi: ""};

export default function FormMateri({ onTambah }) {
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
      setPesan("Nama materi wajib diisi.");
      return;
    }
    const durasi = Number(form.durasi);
    if (!Number.isFinite(durasi) || durasi <= 0) {
      setPesan("Menit harus berupa angka lebih dari 0.");
      return;
    }
    onTambah({
      id: crypto.randomUUID(),
      nama: form.nama.trim(),
      durasi,
    });
    setForm(formAwal);
  }

  return (
    <section className="card">
      <h2 className="kepala">Tambah Sesi Belajar</h2>
      <form className="card-body" onSubmit={handleSubmit} noValidate>
        <div className="row g-10 mb-3">
        <label className="form-label" htmlFor="nama">Nama Materi</label>
        <input className="form-control mb-3" id="nama" name="nama" placeholder="React Props & State" value={form.nama} onChange={handleChange} />
        <label className="form-label" htmlFor="durasi">Durasi (Menit)</label>
        <input className="form-control mb-3" type="number" id="durasi" name="durasi" placeholder="50" value={form.durasi} onChange={handleChange} />
        {pesan && <p className="text-danger small" role="alert">{pesan}</p>}
        <button className="btn btn-dark w-100 fw-semibold" type="submit">Simpan</button>
        </div>
      </form>
    </section>
  );
}

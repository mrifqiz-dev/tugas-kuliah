import { useEffect, useState } from "react";
import { rupiah } from "../format";

const awal = { kode: "", jumlah: "" };

export default function FormPesanan({ onTambah }) {
  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState(awal);
  const [pesan, setPesan] = useState("");

  useEffect(() => {
    async function ambilMenu() {
      try {
        const response = await fetch(import.meta.env.BASE_URL + "menu.json");
        if (!response.ok) throw new Error();
        setMenu(await response.json());
      } catch {
        setPesan("Menu gagal dimuat. Silakan muat ulang halaman.");
      }
    }
    ambilMenu();
  }, []);

  const pilihan = menu.find((item) => item.kode === form.kode);
  const jumlah = Number(form.jumlah);
  const valid = pilihan && Number.isInteger(jumlah) && jumlah > 0;
  const subtotal = valid ? pilihan.harga * jumlah : 0;
  const diskon = subtotal >= 50000 ? subtotal * 0.1 : 0;
  const tagihan = subtotal - diskon;

  function ubah(event) {
    const { name, value } = event.target;
    setForm((lama) => ({ ...lama, [name]: value }));
  }

  function simpan(event) {
    event.preventDefault();
    if (!valid) {
      setPesan("Pilih menu dan isi jumlah dengan bilangan bulat positif.");
      return;
    }
    onTambah({ nama: pilihan.nama, jumlah, subtotal, diskon, tagihan });
    setForm(awal);
    setPesan("");
  }

  return (
    <section className="card panel">
      <h2>Tambah pesanan</h2>
      <form onSubmit={simpan} noValidate>
        <label>Menu<select className="form-select" name="kode" value={form.kode} onChange={ubah}>
          <option value="">Pilih menu</option>
          {menu.map((item) => <option key={item.kode} value={item.kode}>{item.nama} · {rupiah(item.harga)}</option>)}
        </select></label>
        <label>Jumlah porsi<input className="form-control" type="number" name="jumlah" value={form.jumlah} onChange={ubah} /></label>
        <p>Subtotal: {rupiah(subtotal)}<br />Diskon: {rupiah(diskon)}<br /><strong>Tagihan: {rupiah(tagihan)}</strong></p>
        {pesan && <p role="alert">{pesan}</p>}
        <button className="btn btn-warning" disabled={!menu.length}>Tambah pesanan</button>
      </form>
    </section>
  );
}

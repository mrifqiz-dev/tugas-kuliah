import { useState } from "react";
import { rupiah } from "../format";

export default function TabelPesanan({ pesanan, onBayar }) {
  const [cari, setCari] = useState("");
  const [status, setStatus] = useState("Semua");
  const [idBayar, setIdBayar] = useState(null);
  const [uang, setUang] = useState("");
  const [pesan, setPesan] = useState("");

  const hasil = pesanan.filter((item) =>
    item.nama.toLowerCase().includes(cari.trim().toLowerCase()) &&
    (status === "Semua" || status === item.status)
  );

  function mulaiBayar(id) {
    setIdBayar(id);
    setUang("");
    setPesan("");
  }

  function konfirmasi(event, item) {
    event.preventDefault();
    const tunai = Number(uang);
    if (!uang || !Number.isInteger(tunai) || tunai <= 0) {
      setPesan("Masukkan nominal rupiah positif.");
      return;
    }
    if (tunai < item.tagihan) {
      setPesan("Uang kurang " + rupiah(item.tagihan - tunai) + ".");
      return;
    }
    onBayar(item.id, tunai);
    setIdBayar(null);
  }

  return (
    <section className="card panel">
      <h2>Daftar pesanan</h2>
      <div className="alat">
        <label>Cari menu<input className="form-control" type="search" value={cari} onChange={(e) => setCari(e.target.value)} /></label>
        <label>Status<select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Semua</option><option>Belum Bayar</option><option>Lunas</option>
        </select></label>
      </div>
      <div className="gulir">
        <table className="table">
          <thead><tr><th>Menu</th><th>Porsi</th><th>Diskon</th><th>Tagihan</th><th>Status</th><th>Pembayaran</th></tr></thead>
          <tbody>
            {hasil.map((item) => (
              <tr key={item.id}>
                <td>{item.nama}</td><td>{item.jumlah}</td><td>{rupiah(item.diskon)}</td>
                <td>{rupiah(item.tagihan)}</td><td>{item.status}</td>
                <td>
                  {item.status === "Lunas" ? (
                    <>Tunai {rupiah(item.tunai)}<br />Kembali {rupiah(item.kembali)}</>
                  ) : idBayar === item.id ? (
                    <form onSubmit={(e) => konfirmasi(e, item)} noValidate>
                      <label>Uang diterima<input className="form-control" type="number" value={uang} onChange={(e) => setUang(e.target.value)} /></label>
                      {pesan && <span role="alert">{pesan}</span>}
                      <button className="btn btn-warning">Konfirmasi</button>
                      <button className="btn btn-light" type="button" onClick={() => setIdBayar(null)}>Batal</button>
                    </form>
                  ) : (
                    <button className="btn btn-warning" onClick={() => mulaiBayar(item.id)}>Bayar</button>
                  )}
                </td>
              </tr>
            ))}
            {!hasil.length && <tr><td colSpan={6}>Tidak ada pesanan yang ditampilkan.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

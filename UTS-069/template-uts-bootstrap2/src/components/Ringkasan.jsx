import { rupiah } from "../format";

export default function Ringkasan({ pesanan }) {
  const lunas = pesanan.filter((item) => item.status === "Lunas");
  const penerimaan = lunas.reduce((total, item) => total + item.tagihan, 0);

  return (
    <section className="statistik" aria-label="Ringkasan kasir">
      <div>Pesanan masuk<strong>{pesanan.length}</strong></div>
      <div>Belum bayar<strong>{pesanan.length - lunas.length}</strong></div>
      <div>Penerimaan bersih<strong>{rupiah(penerimaan)}</strong></div>
    </section>
  );
}

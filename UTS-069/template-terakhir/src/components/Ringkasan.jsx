import { rupiah, subtotal } from "../hitung";

export default function Ringkasan({ daftar }) {
  const total = daftar.reduce((hasil, barang) => hasil + subtotal(barang), 0);
  const diskon = total >= 50000 ? Math.round(total * 0.1) : 0;
  const totalBayar = total - diskon;

  return (
    <section className="card card-body bg-primary-subtle border-primary-subtle">
      <h2 className="h5 mb-3">Ringkasan pembayaran</h2>
      <p className="d-flex justify-content-between">Total belanja <span>{rupiah(total)}</span></p>
      <p className="d-flex justify-content-between gap-2">
        Diskon 10% (min. Rp50.000) <span>{rupiah(diskon)}</span>
      </p>
      <p className="d-flex justify-content-between fw-bold border-top pt-2 mb-0">
        Total bayar <span>{rupiah(totalBayar)}</span>
      </p>
    </section>
  );
}

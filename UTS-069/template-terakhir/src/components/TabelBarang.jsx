import { rupiah, subtotal } from "../hitung";

export default function TabelBarang({ daftar }) {
  return (
    <section className="card card-body shadow-sm mb-3">
      <h2 className="h5 mb-3">Daftar belanja</h2>
      <div className="table-responsive">
        <table className="table table-striped align-middle mb-0">
          <thead className="table-primary">
            <tr>
              <th>Barang</th>
              <th className="text-end">Harga satuan</th>
              <th className="text-end">Jumlah</th>
              <th className="text-end">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {daftar.map((barang) => (
              <tr key={barang.id}>
                <td>{barang.nama}</td>
                <td className="text-end">{rupiah(barang.harga)}</td>
                <td className="text-end">{barang.jumlah}</td>
                <td className="text-end">{rupiah(subtotal(barang))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

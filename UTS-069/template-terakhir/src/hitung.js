export function subtotal(barang) {
  return barang.harga * barang.jumlah;
}

export function rupiah(nilai) {
  return "Rp" + nilai.toLocaleString("id-ID");
}

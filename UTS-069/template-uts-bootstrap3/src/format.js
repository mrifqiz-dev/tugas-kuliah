export function rupiah(nilai) {
  return "Rp" + nilai.toLocaleString("id-ID", { maximumFractionDigits: 2 });
}

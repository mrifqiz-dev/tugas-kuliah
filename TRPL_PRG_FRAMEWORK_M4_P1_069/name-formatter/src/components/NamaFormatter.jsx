
 // src/components/NamaFormatter.jsx
import { useState } from 'react';

const NameFormatter = () => {
  const [namaLengkap, setNamaLengkap] = useState('');
  const [hasil, setHasil] = useState(null);

  const handleFormat = (e) => {
    e.preventDefault();

    if (!namaLengkap.trim()) {
      alert('Harap masukkan nama lengkap terlebih dahulu!');
      return;
    }

    const namaKapital = namaLengkap.toUpperCase();
    const arrayKata = namaLengkap.trim().split(/\s+/);
    const inisial = arrayKata.map(kata => kata.charAt(0).toUpperCase()).join('');
    const gabunganFormat = `${inisial} - ${namaKapital}`;

    setHasil({
      namaKapital,
      inisial,
      gabunganFormat
    });
  };

  return (
    <div>
      <h2>Format Nama & Inisial</h2>
      <form onSubmit={handleFormat}>
        <div>
          <label>Masukkan Nama Lengkap: </label>
          <input
            type="text"
            value={namaLengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
            placeholder="Contoh: Budi Santoso"
          />
        </div>
        <br />
        <button type="submit">Format Teks</button>
      </form>

      {hasil && (
        <div>
          <h3>Hasil Pemrosesan:</h3>
          <p><strong>Nama Kapital:</strong> {hasil.namaKapital}</p>
          <p><strong>Inisial Nama:</strong> {hasil.inisial}</p>
          <hr />
          <p><strong>Hasil Penggabungan:</strong> {hasil.gabunganFormat}</p>
        </div>
      )}
    </div>
  );
};

export default NameFormatter;

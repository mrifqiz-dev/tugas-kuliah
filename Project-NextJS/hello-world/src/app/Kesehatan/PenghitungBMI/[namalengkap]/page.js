"use client";

import hitungBMI from "../../../../lib/bmi";
import { useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

function NamaSapaan() {
  const params = useParams();
  const nama = decodeURIComponent(params.namalengkap)
    .replaceAll("-", " ");

  return <h1>Halo, {nama}</h1>;
}

export default function Page() {

    const [berat, setBerat] = useState("");
    const [tinggi, setTinggi] = useState("");
    const [hasil, setHasil] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        setHasil(hitungBMI(Number.parseFloat(berat), Number.parseFloat(tinggi)));
    }
    function handleReset() {
        setBerat("");
        setTinggi("");
        setHasil(null);
    }
            
    return (
        <main style={{ maxWidth: 360, margin: "40px auto", padding: "0 16px" }}>
            <Suspense fallback={<h1>Memuat nama...</h1>}>
                    <NamaSapaan />
        </Suspense>
            <p>Silahkan masukkan berat badan dan tinggi kamu!</p>

            <form
            onSubmit={handleSubmit} 
            style={{ display: "grid", gap: 12, marginTop: 16 }}
            >

                <label>
                    <label htmlFor="berat">Berat (kg)</label>
                    <input
                    type="number"
                    step="any"
                    min="1"
                    value={berat}
                    onChange={(e) => setBerat(e.target.value)}
                    required
                    style={{ display: "block", width: "100%", padding: 6 }}
                    />
                </label>

                <label>
                    <label htmlFor="tinggi">Tinggi (cm)</label>
                    <input
                    type="number"
                    step="any"
                    min="1"
                    value={tinggi}
                    onChange={(e) => setTinggi(e.target.value)}
                    required
                    style={{ display: "block", width: "100%", padding: 6 }}
                    />
                </label>

                <button type="submit" style={{ padding: 8 }}>
                Hitung
                </button>
                <button type="button" style={{ padding: 6 }} onClick={handleReset}>Reset</button>
                </form>

                {hasil && (
                    <p style={{ marginTop: 16, color: hasil.color}}>
                        BMI kamu: <strong>{hasil.bmi}</strong> ({hasil.kategori})
                    </p>
                )}
                <Link href="/"><h5 style={{marginTop: 10, textAlign: "center"}}>Bukan kamu? ganti nama</h5>
                </Link>
                </main>
    );
}
export default function hitungBMI(beratKg, tinggiCm) {
    const m = tinggiCm / 100;
    const bmi = beratKg / (m * m);

    let kategori;
    let color;
    if (bmi < 18.5) { kategori = "Berat badan kurang"; color = "blue" }
    else if (bmi < 25) { kategori = "Normal"; color = "green"; }
    else if (bmi < 30) {kategori = "Berat badan berlebih"; color = "yellow"; }
    else { kategori = "Obesitas"; color = "red"; }

    

    return {    
        bmi: bmi.toFixed(1),
        kategori: kategori,
        color: color
     };
}

// Fungsi untuk mengkonversi suhu
function konversiSuhu(suhu, dari, ke) {
    let hasil;
    if (dari === ke) {
        hasil = suhu;
    } else if (dari === 'Celsius') {
        if (ke === 'Fahrenheit') {
            hasil = (suhu * 9/5) + 32;
        } else if (ke === 'Reamur') {
            hasil = suhu * 4/5;
        }
    } else if (dari === 'Fahrenheit') {
        if (ke === 'Celsius') {
            hasil = (suhu - 32) * 5/9;
        } else if (ke === 'Reamur') {
            hasil = (suhu - 32) * 4/9;
        }
    } else if (dari === 'Reamur') {
        if (ke === 'Celsius') {
            hasil = suhu * 5/4;
        } else if (ke === 'Fahrenheit') {
            hasil = (suhu * 9/4) + 32;
        }
    }
    return hasil;
}


document.getElementById('formKonversi').addEventListener('submit', function (event) {
    event.preventDefault();

   
    const inputSuhu = document.getElementById('suhu').value;
    const dari = document.getElementById('dari').value;
    const ke = document.getElementById('ke').value;


    const suhu = parseFloat(inputSuhu);


    if (isNaN(suhu)) {
        document.getElementById('hasil').innerText = "Masukkan suhu yang valid!";
        return;
    }


    const hasilKonversi = konversiSuhu(suhu, dari, ke);


    document.getElementById('hasil').innerText = `${suhu} ${dari} = ${hasilKonversi.toFixed(2)} ${ke}`;
});
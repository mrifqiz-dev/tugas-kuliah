var angka = [10, 20, 30, 40, 50];

function hitungArray(arr) {
  var min = arr[0];
  var max = arr[0];
  var total = 0;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
    if (arr[i] > max) {
      max = arr[i];
    }
    total = total + arr[i];
  }

  var rata = total / arr.length;

  document.write("Nilai Minimum: " + min + "<br>");
  document.write("Nilai Maksimum: " + max + "<br>");
  document.write("Nilai Rata-rata: " + rata + "<br>");
}

hitungArray(angka);

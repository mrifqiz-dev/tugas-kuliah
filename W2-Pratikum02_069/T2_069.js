for (var i = 1; i <= 100; i++) {
  if (i % 15 == 0) {
    document.write("MI2A");
  } else if (i % 3 == 0) {
    document.write("MI");
  } else if (i % 5 == 0) {
    document.write("2A");
  } else {
    document.write(i);
  }

  if (i < 100) {
    document.write(", ");
  }
}

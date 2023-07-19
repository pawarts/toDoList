  // Отримуємо посилання на елемент input
  var input = document.getElementById('myDateTimeInput');

  // Отримуємо поточну дату та час
  var currentDateTime = new Date().toISOString().slice(0, 16);

  // Встановлюємо мінімальне значення для елемента input
  input.min = currentDateTime;
// Открытие QR-модального окна
document.querySelector('.primary').addEventListener('click', () => {
  document.getElementById('qrModal').style.display = 'block';
});

// Закрытие QR-модального окна
function closeModal() {
  document.getElementById('qrModal').style.display = 'none';
}

// Нажатие "Отправить документ" — делимся PDF или открываем его
document.querySelector('.secondary').addEventListener('click', async () => {
  const pdfUrl = '060131500086-20250603111642292.pdf'; // Имя файла — должен быть рядом с HTML
  const pdfName = '060131500086-20250603111642292.pdf';

  try {
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const file = new File([blob], pdfName, { type: 'application/pdf' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: 'Удостоверение личности',
        text: 'Моё удостоверение личности',
        files: [file],
      });
    } else {
      // fallback — просто откроем PDF
      window.open(pdfUrl, '_blank');
    }
  } catch (err) {
    // alert('Не удалось поделиться файлом'); // убрали уведомление
    console.error(err); // можно оставить для разработчика
  }
});

function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab');
  const cards = document.querySelectorAll('.card');
  const indicator = document.querySelector('.tab-indicator');

  tabs.forEach((btn) => btn.classList.remove('active'));
  cards.forEach((card) => card.classList.remove('active'));

  document.querySelector(`[onclick*="${tabId}"]`).classList.add('active');
  document.getElementById(tabId).classList.add('active');

  // Перемещение индикатора
  const index = tabId === 'document' ? 0 : 1;
  indicator.style.transform = `translateX(${index * 100}%)`;
}


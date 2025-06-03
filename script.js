// Открытие QR-модального окна
document.querySelector('.primary').addEventListener('click', () => {
  document.getElementById('qrModal').style.display = 'block';
});

// Закрытие QR-модального окна
function closeModal() {
  document.getElementById('qrModal').style.display = 'none';
}

// Нажатие "Отправить документ" — делимся PDF или открываем его
document.querySelectorAll('.secondary').forEach((button) => {
  button.addEventListener('click', async () => {
    const pdfUrl = '060131500086-20250603111642292.pdf';
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
        window.open(pdfUrl, '_blank');
      }
    } catch (err) {
      console.error(err);
    }
  });
});


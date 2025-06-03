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
  const pdfUrl = 'document.pdf'; // Имя файла — должен быть рядом с HTML
  const pdfName = 'Удостоверение.pdf';

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
    alert('Не удалось поделиться файлом');
    console.error(err);
  }
});

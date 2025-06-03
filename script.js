document.querySelector('.primary').addEventListener('click', () => {
  document.getElementById('qrModal').style.display = 'block';
});

function closeModal() {
  document.getElementById('qrModal').style.display = 'none';
}

document.querySelector('.secondary').addEventListener('click', async () => {
  const pdfUrl = 'document.pdf'; // Имя файла — он должен быть рядом с HTML
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
      // fallback — откроем просто сам PDF в новой вкладке
      window.open(pdfUrl, '_blank');
    }
  } catch (err) {
    alert('Не удалось поделиться файлом');
    console.error(err);
  }
});


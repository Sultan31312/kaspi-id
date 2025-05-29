document.querySelector('.primary').addEventListener('click', () => {
  document.getElementById('qrModal').style.display = 'block';
});

function closeModal() {
  document.getElementById('qrModal').style.display = 'none';
}

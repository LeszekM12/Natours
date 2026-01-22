function toggleCardNumber() {
  const el = document.getElementById('cardNumber');
  const btn = document.getElementById('cardToggle');
  const isHidden = el.textContent.includes('*');

  el.textContent = isHidden ? '4242 4242 4242 4242' : '**** **** **** 4242';
  btn.classList.toggle('showing', isHidden);
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('cardToggle');
  if (btn) btn.addEventListener('click', toggleCardNumber);
});

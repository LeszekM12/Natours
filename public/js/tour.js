const addReviewBtn = document.querySelector('#add-review');
const reviewModal = document.querySelector('#review-modal');
const overlay = document.querySelector('.modal__overlay');

if (addReviewBtn) {
  addReviewBtn.addEventListener('click', () => {
    reviewModal.classList.remove('hidden');
  });
}

if (overlay) {
  overlay.addEventListener('click', () => {
    reviewModal.classList.add('hidden');
  });
}

const closeBtn = document.querySelector('.modal__close');

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    reviewModal.classList.add('hidden');
  });
}


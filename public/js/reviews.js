// Modal elements myReviews.pug
const modal = document.getElementById('review-modal');
const textInput = document.getElementById('reviewText');
const ratingInput = document.getElementById('reviewRating');
const saveBtn = document.getElementById('reviewSubmitBtn');


// DELETE REVIEW
document.addEventListener('click', async e => {
  const btn = e.target.closest('.reviews__delete');
  if (!btn) return;

  const reviewId = btn.dataset.reviewId;

  try {
    const res = await fetch(`/api/v1/reviews/${reviewId}`, {
      method: 'DELETE'
    });

    if (res.status === 204) {
      const card = btn.closest('.reviews__card');
      card.style.opacity = '0';
      setTimeout(() => {
        card.remove();
        window.setTimeout(() => {
          location.reload();
        }, 150);
      }, 300);
    }
  } catch (err) {
    console.error(err);
  }
});


// EDIT REVIEW
let editMode = false;
let currentReviewId = null;

document.addEventListener('click', e => {
  const btn = e.target.closest('.reviews__edit');
  if (!btn) return;

  editMode = true;
  currentReviewId = btn.dataset.reviewId;

  const card = btn.closest('.reviews__card');
  const text = card.querySelector('.reviews__text').textContent;
  let rating = card.querySelector('.reviews__rating').textContent.trim();

  if (!rating || isNaN(rating)) {
    rating = 5;
  }

  textInput.value = text;
  ratingInput.value = rating;

  document.querySelector('.modal__title').textContent = 'Edit your review';
  saveBtn.textContent = 'Save changes';

  const rect = card.getBoundingClientRect();
  modal.style.top = `${rect.top + window.scrollY + -220}px`;
  modal.style.left = `${rect.right + 30}px`;



  modal.classList.remove('hidden');
});


// SUBMIT (PATCH)
if (saveBtn)
saveBtn.addEventListener('click', async e => {
  e.preventDefault();

  const newText = textInput.value;
  const newRating = ratingInput.value;

  try {
    const res = await fetch(`/api/v1/reviews/${currentReviewId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        review: newText,
        rating: newRating
      })
    });

    if (res.status === 200) {
      modal.classList.add('hidden');
      window.setTimeout(() => {
        location.reload();
      }, 200);
    }
  } catch (err) {
    console.error(err);
  }
});


document.addEventListener('click', async e => {
  const btn = e.target.closest('.reviews__delete');
  if (!btn) return;

  const reviewId = btn.dataset.reviewId;

  try {
    const res = await fetch(`/api/v1/reviews/${reviewId}`, {
      method: 'DELETE'
    });

    if (res.status === 204) {
      // Delete DOM
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

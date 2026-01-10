/* eslint-disable */
const stripe = Stripe('pk_test_51SmzubA6Mjyk41hlO8KGDRlLCfvQTBwUMVUpc9rXw2RFmiBprfSAJTq6xiEZ9cdyV0o8xgPACznsbaiEaXHKhxuD00e8pg1MDC');

const bookTour = async tourId => {
  try {
    // Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    })
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

const bookBtn = document.getElementById('book-tour');

if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...'
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
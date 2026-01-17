const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// GET /tours/id/reviews
// POST /tours/id/reviews

router.use(authController.protect);

router.route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router.route('/:id')
  .get(reviewController.getReview)
  .patch(authController.restrictTo('user', 'admin'),
    reviewController.updateReview)
  .delete(authController.restrictTo('user', 'admin'),
    reviewController.deleteReview);

router.post(
  '/:tourId',
  authController.protect,
  reviewController.canReview,
  reviewController.createReview
);


module.exports = router;
const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const Tour = require('./../models/tourModel');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if(!req.body.tour) req.body.tour = req.params.tourId;
  if(!req.body.user) req.body.user = req.user.id;
  next();
};

exports.canReview = catchAsync(async (req, res, next) => {
  const booking = await Booking.findOne({
    user: req.user.id,
    tour: req.params.tourId
  });

  if (!booking) {
    return next(new AppError('You can only review tours you have booked.', 403));
  }
  next();
});

exports.createReview = catchAsync(async (req, res, next) => {
  try {
    await Review.create({
      review: req.body.review,
      rating: req.body.rating,
      tour: req.params.tourId,
      user: req.user.id
    });

    const tour = await Tour.findById(req.params.tourId);
    return res.redirect(`/tour/${tour.slug}?alert=review-success`);
  } catch (err) {
    if (err.code === 11000) {
      const tour = await Tour.findById(req.params.tourId);
      return res.redirect(`/tour/${tour.slug}?alert=review-duplicate`);
    }

    return next(err);
  }
});



exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);


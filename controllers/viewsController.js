const Tour =  require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  //  Get all tour data from collection
  const tours = await Tour.find();
  // Build template

  // Render that template using tour data from first step
  res.status(200).render('overview', {
    title: 'All tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findOne({slug: req.params.slug}).populate({
    path: 'reviews',
    fields: 'review rating, user',
  });

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.logInForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log in to your account',
  });
};
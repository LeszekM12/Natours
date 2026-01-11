const path = require('path');
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

// Global Middlewares
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
// Set Security HTTP headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        'https://js.stripe.com',
        "'unsafe-inline'", // Parcel może generować inline scripts
        "'unsafe-eval'",   // Parcel może używać eval w dev
        "https://api.mapbox.com",
        "https://cdnjs.cloudflare.com"
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://api.mapbox.com",
        "https://fonts.googleapis.com"
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "https://api.mapbox.com"
      ],
      frameSrc: [ "'self'", 'https://js.stripe.com' ],
      connectSrc: [
        "'self'",
        "https://*.mapbox.com",
        "https://cdnjs.cloudflare.com",
        "ws://127.0.0.1:65307", // WebSocket dla Parcel dev (wildcarda)
        "blob:"
      ],
      imgSrc: ["'self'", "data:", "https://*.mapbox.com"],
      workerSrc: ["'self'", "blob:"],
    },
  })
);

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Limit request from same API
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'To many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against no SQL query injections // e.g. "email": { "$gt": ""} always true with password to login
app.use(mongoSanitize());

//  Data sanitization against no XSS // e.g. "name": "<div id='bad-code'>Name</div>"
app.use(xss());

// Preventing Parameter Pollution  // e.g. /api/v1/tours?sort=duration&sort=price
app.use(hpp({
  whitelist: [
    'duration',
    'ratingsQuantity',
    'ratingsAverage',
    'maxGroupSize',
    'difficulty',
    'price'
  ]
}));

// Test middleware
app.use((req,res,next)=>{
  // console.log('Hello form the middleware!');
  next();
});

app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// Routes
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
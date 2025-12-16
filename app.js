const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Global Middlewares

// Set Security HTTP headers
app.use(helmet())
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

// Data sanitization against no SQL query injections // e.g. "email": { "$gt": ""} always true with password to login
app.use(mongoSanitize());
//  Data sanitization against no XSS // e.g. "name": "<div id='bad-code'>Name</div>"
app.use(xss());

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req,res,next)=>{
  console.log('Hello form the middleware!');
  next();
});

app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
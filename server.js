// Loading environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './config.env' });
} else {
  require('dotenv').config(); // Render uses its variables
}
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
    process.exit(1);
});

const app = require('./app')

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
console.log('MongoDB URI:', DB); // checking error
mongoose.connect(DB, {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
}).then(() => console.log('Connected to DB'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

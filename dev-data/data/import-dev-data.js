const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('Connected to DB'));

// Read Json File
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, { encoding: 'utf8' }));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, { encoding: 'utf8' }));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, { encoding: 'utf8' }));

// Import Data into Database
const importData = async () => {
  try {
    await Tour.create(tours, { validateBeforeSave: false });
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data loaded successfully!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete All Data From DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data deleted successfully!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
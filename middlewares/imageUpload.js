const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');
const AppError = require('../utils/appError');

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please upload only images.', 400), false);
  }
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'natours/tours',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [
      { width: 2000, height: 1333, crop: 'fill', gravity: 'auto' }
    ]
  }
});


const upload = multer({ multerFilter, storage });

module.exports = upload;

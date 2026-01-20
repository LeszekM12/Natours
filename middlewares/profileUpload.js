const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');
const AppError = require('../utils/appError');

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new AppError('Please upload only images.', 400), false);
};

const userStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'natours/users',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [
      { width: 500, height: 500, crop: 'fill', gravity: 'face' }
    ]
  }
});

const uploadUserPhoto = multer({
  storage: userStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
});

module.exports = uploadUserPhoto;

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Please provide a valid email address'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    unique: true,
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE method
      validator: function(value) {
        return value === this.password;
      },
      message: 'Passwords are not the same'
    }
  },
  passwordChangedAt: { type: Date },
  photo: String,
});

userSchema.pre('save', async function(next) {
  // Only run this fn if password was modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
  const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimestamp;
  }

  return false;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
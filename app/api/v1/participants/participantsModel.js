const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const participantSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Nama Depan harus diisi'],
      minlength: [3, 'Panjang nama minimal 3 karakter'],
      maxlength: [50, 'Panjang nama maksimal 50 karakter'],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email harus diisi'],
    },
    password: {
      type: String,
      required: [true, 'Password harus diisi'],
      minlength: [6, 'Panjang password minimal 6 karakter'],
    },
    role: {
      type: String,
      default: '-',
    },
    status: {
      type: String,
      enum: ['aktif', 'tidak aktif'],
      default: 'tidak aktif',
    },
    otp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

participantSchema.pre('save', async function (next) {
  const User = this;
  if (User.isModified('password')) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

participantSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
module.exports = mongoose.model('Participant', participantSchema);

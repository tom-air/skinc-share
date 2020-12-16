const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      index: {
        unique: true
      },
      required: true,
    },
    username: {
      type: String,
      index: {
        unique: true
      },
      required: true,
    },
    hash: String,
    salt: String,
  },
  { timestamps: true }
);

UserSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

module.exports = mongoose.model('User', UserSchema);

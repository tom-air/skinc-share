const crypto = require('crypto');
const { User } = require('../models');

const comparePassword = (password, hash, salt) => {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
};

const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return {
    salt,
    hash,
  };
};

const createUser = async function(user, callback) {
  if (await User.isEmailTaken(user.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const newUser = {...user};

  const { salt, hash } = genPassword(user.password);
  // const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync(newUser.password, salt);
  newUser.salt = salt;
  newUser.hash = hash;
  await User.create(newUser);
  callback();
};

const getUserByUsername = function(username, callback) {
  const query = { username: username };
  User.findOne(query, callback); // findOne() is a mongoose function that takes query as argument
};

const getUserById = function(id, callback) {
  User.findOne(id, callback);
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  comparePassword,
}
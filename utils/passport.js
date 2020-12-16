const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserService = require('../services/user.service');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      UserService.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
          return done(null, false, { message: 'Unknown User' });
        }
        const isMatch = UserService.comparePassword(password, user.hash, user.salt);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid password' });
        }
      });
    })
  );
};

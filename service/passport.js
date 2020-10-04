const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('Users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	if (user) {
		done(null, user);
	}
});

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.findOne({ username });
			if (!user) {
				return done(null, false);
			}
			if (!User.comparePassword(password)) {
				return done(null, false);
			}
			return done(null, user);
		} catch (err) {
			return done(err);
		}
	})
);

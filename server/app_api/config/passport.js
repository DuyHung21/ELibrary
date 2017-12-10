const LocalStrategy = require('passport-local').Strategy;
const ctrlUser = require('../controller/users');
const passport = require('passport')

passport.use(new LocalStrategy(function(username, password, done) {
	ctrlUser.validateUser(username, password, function(err, user) {
		if (err) return done(err);
		if (!user) return done(null, false, {message: 'Incorrect username or password'});
		return done(null, user);
	})
}))
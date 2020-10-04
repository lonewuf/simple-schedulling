const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
const requireLogin = require('../../middleware/requireLogin');

const User = mongoose.model('Users');

router.get('/', (req, res) => {
	res.json({ test: 'test me' });
});

router.get('/test-auth', requireLogin, (req, res) => {
	res.json({ test: 'test me' });
});

router.post('/login', (req, res) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			console.log(1);
			return res.send({ error: 'Something went wrong. Try again' });
		}
		if (!user) {
			console.log(2);
			return res.send({ error: 'Incorrect username or password.' });
		}
		req.login(user, (err) => {
			if (err) {
				console.log(3);
				return res.send({ error: 'Something went wrong. Try again' });
			}
			console.log(4);
			return res.redirect('/dashboard');
		});
	});
});

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

router.post('/register', async (req, res) => {
	const { username, password, email } = req.body;
	const user = await User.findOne({ username });
	if (user) {
		return res
			.status(400)
			.json({ error: 'Username is already taken. Choose another one.' });
	}
	const newUser = new User({ username, password, email });
	await newUser.save();
	res.send({ message: 'success' });
});

module.exports = router;

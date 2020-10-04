const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
});

userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified()) {
		return next();
	}
	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(user.password, salt);
		user.password = hash;
		next();
	} catch (err) {
		next(err);
	}
});

userSchema.methods.comparePassword = function (candidatePassword) {
	const user = this;
	return new Promise((resolve, reject) => {
		bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
			if (err) {
				return reject(err);
			}

			if (!isMatch) {
				return reject(false);
			}

			resolve(true);
		});
	});
};

mongoose.model('Users', userSchema);

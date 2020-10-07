require('./models/yearMonth');
require('./models/user');
require('./models/schedule');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const cors = require('cors');

const scheduleRoutes = require('./routes/api/schedule');
const userRoutes = require('./routes/api/user');

mongoose
	.connect(keys.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	})
	.then(() => console.log('Connected to the databasee'))
	.catch((err) => console.log(`Error when connecting to database: ${err}`));

require('./service/passport');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
	cookieSession({
		maxAge: 30 * 24 ** 60 * 60 * 60 * 1000,
		keys: [keys.secretKey],
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/schedule', scheduleRoutes);
app.use('/user', userRoutes);

const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';
app.listen(port, host, () => console.log(`Listening on port ${port}`));

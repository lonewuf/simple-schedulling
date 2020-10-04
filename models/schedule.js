const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
	eventname: {
		type: String,
		required: true,
	},
	details: {
		type: String,
		required: true,
	},
	organizer: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		// required: true,
	},
	timeTo: {
		type: String,
		required: true,
	},
	timeFrom: {
		type: String,
		required: true,
	},
});

mongoose.model('Schedules', scheduleSchema);

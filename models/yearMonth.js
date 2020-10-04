const mongoose = require('mongoose');

const yearMonthSchema = mongoose.Schema({
	year: {
		type: Number,
		required: true,
	},
	month: {
		type: Number,
		required: true,
	},
	events: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Schedules',
		},
	],
});

mongoose.model('YearMonths', yearMonthSchema);

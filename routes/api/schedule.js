const router = require('express').Router();
const { check, body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Schedule = mongoose.model('Schedules');
const YearMonth = mongoose.model('YearMonths');

// @route   GET
// @desc    Test this route
// @access  Public
router.get('/test', (req, res) => {
	res.json({ test: 'schedule' });
});

// @route   GET
// @desc    Test this route
// @access  Public
router.get('/', (req, res) => {
	res.json({ test: '/' });
});

// @route   POSt
// @desc    Add new schedule
// @access  Private
router.post(
	'/',
	[
		body('eventname', 'Event name is empty').not().isEmpty(),
		body('organizer', 'Organizer is empty').not().isEmpty(),
		body('details', 'Details is required').not().isEmpty(),
		body('date', 'Date is required').not().isEmpty(),
		body('timeFrom', 'Time from is required').not().isEmpty(),
		body('timeTo', 'Time to is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { date } = req.body;
			const year = new Date(date).getFullYear();
			const month = new Date(date).getMonth() + 1;
			const checkYearAndMonth = await YearMonth.findOne({ year, month });
			const newSchedule = new Schedule(req.body);
			await newSchedule.save();
			if (checkYearAndMonth) {
				checkYearAndMonth.events.push(newSchedule);
				await checkYearAndMonth.save();
			} else {
				const newYearAndMonth = new YearMonth({ year, month });
				newYearAndMonth.events.push(newSchedule);
				await newYearAndMonth.save();
			}
			res.json(newSchedule);
		} catch (err) {
			console.log(err);
		}
	}
);

// @route   GET
// @desc    Test this route
// @access  Public
router.get('/all', async (req, res) => {
	const schedules = await Schedule.find({});
	res.json(schedules);
});

// @route   GET
// @desc    Find the list of schedules
// @access  Public
router.get('/find/:year/:month', async (req, res) => {
	const { year, month } = req.params;
	const listOfSchedules = await YearMonth.findOne({ year, month }).populate(
		'events'
	);
	if (listOfSchedules) {
		return res.json(listOfSchedules.events);
	}
	res.json([]);
});

// @route   GET
// @desc    Retrieve specific schedule
// @access  Public
router.get('/:id', async (req, res) => {
	const schedule = await Schedule.findById(req.params.id);
	res.json(schedule);
});

// @route   PUT
// @desc    Edit specific schedule
// @access  Public
router.put('/edit/:id', async (req, res) => {
	// const { eventname, details, organizer, date, time } = req.body;
	console.log(req.body);
	console.log(req.params.id);
	const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.json(schedule);
});

module.exports = router;

export default (schedules, candiDateTimeFrom, candiDateTimeTo) => {
	const result = {
		isTimeOverlapped: false,
		timeFromMessage: '',
		timeToMessage: '',
	};
	for (const schedule of schedules) {
		const { timeFrom, timeTo } = schedule;
		if (+candiDateTimeFrom === timeFrom) {
			result.isTimeOverlapped = true;
			result.timeFromMessage =
				'This time is overlapped on existing schedule. Choose another.';
		}
		if (+candiDateTimeTo === timeTo) {
			result.isTimeOverlapped = true;
			result.timeToMessage =
				'This time is overlapped on existing schedule. Choose another.';
		}
		if (+candiDateTimeFrom >= timeFrom && +candiDateTimeFrom <= timeTo) {
			result.isTimeOverlapped = true;
			result.timeFromMessage =
				'This time is overlapped on existing schedule. Choose another.';
		}
		if (+candiDateTimeTo >= timeFrom && +candiDateTimeTo <= timeTo) {
			result.isTimeOverlapped = true;
			result.timeToMessage =
				'This time is overlapped on existing schedule. Choose another.';
		}
		if (+candiDateTimeFrom < timeFrom && +candiDateTimeTo > timeTo) {
			result.isTimeOverlapped = true;
			result.timeToMessage =
				'This time is overlapped on existing schedule. Choose another.';
			result.timeFromMessage =
				'This time is overlapped on existing schedule. Choose another.';
		}
		// if()
		// if (timeFrom >= +candiDateTimeFrom && timeTo <= +candiDateTimeFrom) {
		// 	result.isTimeOverlapped = true;
		// 	result.timeFromMessage =
		// 		'This time is overlapped on existing schedule. Choose another.';
		// }
		// if (timeFrom >= +candiDateTimeTo && timeTo <= +candiDateTimeTo) {
		// 	result.isTimeOverlapped = true;
		// 	result.timeFromMessage =
		// 		'This time is overlapped on existing schedule. Choose another.';
		// }
		if (result.isTimeOverlapped) return result;
	}
	return result;
};

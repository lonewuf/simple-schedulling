import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

const Schedule = ({ eventsOnDay }) => {
	const renderListOfEvents = () => {
		if (eventsOnDay.length === 0) {
			return <p className='display-5'>No schedules</p>;
		}
		const sortedEvents = _.sortBy(eventsOnDay, ['timeFrom']);
		return sortedEvents.map((event) => (
			<div key={event._id} className='card mb-2'>
				<div className='card-body'>
					{event.eventname} - {event.timeFrom.replace('.', ':')} -{' '}
					{event.timeTo.replace('.', ':')}{' '}
					<Link to={`/schedule/edit/${event._id}`} className='btn btn-warning'>
						Edit
					</Link>
				</div>
			</div>
		));
	};

	return <div>{renderListOfEvents()}</div>;
};

export default Schedule;

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import ScheduleForm from './ScheduleForm';
import Schedule from './Schedule';
import Spinner from '../common/Spinner';
import {
	addSchedule,
	getEventsBasedOnSelectedDay,
} from '../../actions/scheduleActions';

class AddSchedule extends React.Component {
	state = { time: ['', ''], selectedDate: new Date() };

	onChangeTime = (time) => {
		this.setState({ time });
	};

	onChangeSelectedDate = (selectedDate) => {
		this.setState({ selectedDate });
		const year = new Date(selectedDate).getFullYear();
		const month = new Date(selectedDate).getMonth() + 1;
		this.props.getEventsBasedOnSelectedDay(year, month);
	};

	componentDidMount() {
		const year = new Date(this.state.selectedDate).getFullYear();
		const month = new Date(this.state.selectedDate).getMonth() + 1;
		this.props.getEventsBasedOnSelectedDay(year, month);
	}

	onSubmit = (formValues) => {
		this.props.addSchedule({ ...formValues });
	};

	renderListOfSchedules = () => {
		const listOfEvents = this.props.eventsBasedOnSelectedDay.filter(
			(event) =>
				new Date(this.state.selectedDate).getDate() ===
				new Date(event.date).getDate()
		);
		return <Schedule eventsOnDay={listOfEvents} />;
	};

	render() {
		return (
			<div className='container'>
				<h1 className='text-center'>Add Schedule</h1>
				<div className='row justify-content-around'>
					<div className='col-md-4'>
						<h5>Search for other schedules</h5>
						<DatePicker
							value={this.state.selectedDate}
							onChange={(value) => this.onChangeSelectedDate(value)}
						/>
						{this.props.eventsBasedOnSelectedDay && !this.props.loading ? (
							this.renderListOfSchedules()
						) : (
							<Spinner />
						)}
					</div>
					<div className='col-md-4'>
						<ScheduleForm
							onSubmit={this.onSubmit}
							time={this.state.time}
							onChangeTime={this.onChangeTime}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	schedule: state.schedule.schedule,
	eventsBasedOnSelectedDay: state.schedule.eventsBasedOnSelectedDay,
	loading: state.schedule.loading,
});

export default connect(mapStateToProps, {
	addSchedule,
	getEventsBasedOnSelectedDay,
})(AddSchedule);

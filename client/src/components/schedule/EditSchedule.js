import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import Schedule from './Schedule';
import Spinner from '../common/Spinner';
import ScheduleForm from './ScheduleForm';
import {
	editSchedule,
	getSchedule,
	getEventsBasedOnSelectedDay,
} from '../../actions/scheduleActions';

class EditSchedule extends React.Component {
	state = {
		initialDate: '',
		time: ['', ''],
		selectedDate: new Date(),
	};

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
		this.props.getSchedule(this.props.match.params.id);
		const year = new Date(this.state.selectedDate).getFullYear();
		const month = new Date(this.state.selectedDate).getMonth() + 1;
		this.props.getEventsBasedOnSelectedDay(year, month);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.schedule) {
			this.setState({ time: nextProps.schedule.time });
		}
	}

	onSubmit = (formValues) => {
		this.props.editSchedule({ ...formValues }, this.props.match.params.id);
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
		if (!this.props.schedule || this.props.loading) {
			return <Spinner />;
		}

		return (
			<div className='container'>
				<h1>Edit Schedule</h1>
				<div className='row'>
					<div className='col-md-6'>
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
					<div className='col-md-6'>
						<ScheduleForm
							onSubmit={this.onSubmit}
							time={
								this.props.schedule.time
									? this.props.schedule.time
									: this.state.time
							}
							initialDate={
								this.props.schedule.date
									? this.props.schedule.date
									: this.state.initialDate
							}
							onChangeDate={this.onChangeDate}
							onChangeTime={this.onChangeTime}
							// eventName={schedule.eventname ? schedule.eventName : ''}
							// organizer={schedule.organizer ? schedule.organizer : ''}
							// details={schedule.details ? schedule.details : ''}
							initialValues={_.pick(
								this.props.schedule,
								'eventname',
								'date',
								'details',
								'organizer',
								'timeFrom',
								'timeTo'
							)}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		schedule: state.schedule.schedule,
		eventsBasedOnSelectedDay: state.schedule.eventsBasedOnSelectedDay,
		loading: state.schedule.loading,
	};
};

export default connect(mapStateToProps, {
	editSchedule,
	getSchedule,
	getEventsBasedOnSelectedDay,
})(EditSchedule);
// export const EditSchedule = (props) => {
// 	const [schedule, setSchedule] = useState({});
// 	const selectedSchedule = useSelector((state) => state.schedule.schedule);

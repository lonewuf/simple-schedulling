import React from 'react';
import './MainCalendar.css';
import 'react-calendar/dist/Calendar.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	getSchedules,
	getEventsBasedOnSelectedDay,
} from '../../actions/scheduleActions';
import Calendar from 'react-calendar';
import Schedule from '../schedule/Schedule';
import Spinner from '../common/Spinner';

class MainCalendar extends React.Component {
	state = { date: new Date(), selectedDate: '' };

	onChangeDate = (value) => {
		this.setState({ date: value });
		// const year = new Date(this.state.date).getFullYear();
		// const month = new Date(this.state.date).getMonth() + 1;
		// this.props.getEventsBasedOnSelectedDay(year, month);
	};

	componentDidMount() {
		this.props.getSchedules();
		const year = new Date(this.state.date).getFullYear();
		const month = new Date(this.state.date).getMonth() + 1;
		this.props.getEventsBasedOnSelectedDay(year, month);
	}

	changeDayWithSchedule = (date, view) => {
		if (
			this.props.listOfEvents.find(
				(d) => new Date(d.date).getTime() === date.getTime()
			) &&
			view === 'month'
		) {
			return 'highlight';
		}
		return null;
	};

	getEventsBasedOnClickedDay = (date) => {
		this.setState({ selectedDate: new Date(date) });
		const year = new Date(date).getFullYear();
		const month = new Date(date).getMonth() + 1;
		this.props.getEventsBasedOnSelectedDay(year, month);
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
				<div className='row'>
					<div className='h-100 d-flex justify-content-center align-items-center col-md-5'>
						<Calendar
							value={this.state.date}
							onChange={(value) => this.onChangeDate(value)}
							onClickDay={(value) =>
								this.getEventsBasedOnClickedDay(value.toString())
							}
							tileClassName={({ activeStartDate, date, view }) =>
								this.changeDayWithSchedule(date, view)
							}
						/>
					</div>
					<div className='h-100 d-flex justify-content-center align-items-center col-md-7'>
						<div>
							{this.props.eventsBasedOnSelectedDay && !this.props.loading ? (
								this.renderListOfSchedules()
							) : (
								<Spinner />
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	eventsBasedOnSelectedDay: state.schedule.eventsBasedOnSelectedDay,
	loading: state.schedule.loading,
	listOfEvents: state.schedule.schedules,
});

export default connect(mapStateToProps, {
	getSchedules,
	getEventsBasedOnSelectedDay,
})(MainCalendar);

// const MainCalendar = () => {
// 	const [date, setDate] = useState(new Date());
// 	const [clickedDate, setClickedDate] = useState(null);
// 	const [eventsBasedOnClickedDay, setEventsBasedOnClickedDay] = useState([]);
// 	const dispatch = useDispatch();
// 	const listOfEvents = useSelector((state) => state.schedule.schedules);

// 	useEffect(() => {
// 		dispatch(getSchedules());
// 	}, []);

// 	const changeDayWithSchedule = (date, view) => {
// 		if (
// 			listOfEvents.find((d) => new Date(d.date).getTime() === date.getTime()) &&
// 			view === 'month'
// 		) {
// 			return 'highlight';
// 		}
// 		return null;
// 	};

// 	const getEventsBasedOnClickedDay = (value) => {
// 		const listOfEventsBasedOnClickedDay = listOfEvents.filter(
// 			(event) => new Date(event.date).getTime() === new Date(value).getTime()
// 		);
// 		setEventsBasedOnClickedDay(listOfEventsBasedOnClickedDay);
// 		setClickedDate(value);
// 	};

// 	return (
// 		<div className='container'>
// 			<div className='row'>
// 				<div className='h-100 d-flex justify-content-center align-items-center col-md-5'>
// 					<Calendar
// 						value={date}
// 						onChange={setDate}
// 						onClickDay={(value) => getEventsBasedOnClickedDay(value.toString())}
// 						tileClassName={({ activeStartDate, date, view }) =>
// 							changeDayWithSchedule(date, view)
// 						}
// 					/>
// 				</div>
// 				<div className='h-100 d-flex justify-content-center align-items-center col-md-7'>
// 					<Schedule eventsOnDay={eventsBasedOnClickedDay} />
// 				</div>
// 			</div>
// 			<div className='mt-5'>
// 				<Link to='/schedule' className='btn btn-primary'>
// 					Add Schedule
// 				</Link>
// 			</div>
// 		</div>
// 	);
// };

// export default MainCalendar;

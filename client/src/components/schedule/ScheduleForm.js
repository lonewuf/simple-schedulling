import React from 'react';
import { Field, formValues, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import checkIfTimeOverlaps from '../../utils/checkIfTimeOverlaps';
import { getSchedules } from '../../actions/scheduleActions';
import scheduleFormFields from './scheduleFormFields';

class ScheduleForm extends React.Component {
	componentDidMount() {
		this.props.getSchedules();
	}

	onSubmitForm = (formValues) => {
		this.props.onSubmit({ ...formValues });
	};

	renderError({ error, touched }) {
		if (touched && error) {
			return <div className='invalid-feedback'>{error}</div>;
		}
	}

	renderDatePicker = ({ input, label, meta }) => {
		const dateValue = input.value ? new Date(input.value) : '';
		const className = `form-control ${
			meta.error && meta.touched ? 'is-invalid' : ''
		}`;
		const errorMessage =
			meta.error && meta.touched ? (
				<div className='invalid-feedback' style={{ display: 'block' }}>
					{meta.error}
				</div>
			) : null;
		return (
			<div className='form-group'>
				<label htmlFor='time'>Enter Date</label>
				<div>
					<DatePicker
						{...input}
						selected={dateValue}
						autoComplete='off'
						dateFormat='yyyy/MM/dd'
						className={className}
					/>
				</div>
				<div>{errorMessage}</div>
			</div>
		);
	};

	renderTimeRangePicker = (timeValue) => {
		return (
			<div className='form-group'>
				<label htmlFor='time'>Enter Time Range</label>
				<div className='d-flex justify-content-center'>
					<TimeRangePicker
						value={this.props.time}
						onChange={(value) => this.props.onChangeTime(value)}
						className='form-control'
					/>
				</div>
			</div>
		);
	};

	renderTimePicker = ({ input, label, meta }) => {
		const options = [];
		const className = `custom-select ${
			meta.error && meta.touched ? 'is-invalid' : ''
		}`;
		for (let index = 0; index < 24; index++) {
			options.push({ value: `${index}.00`, label: `${index}:00` });
			options.push({ value: `${index}.30`, label: `${index}:30` });
		}

		const renderOptions = options.map((option) => {
			return (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			);
		});

		return (
			<div className='form-group'>
				<label htmlFor={input.name}>{label}</label>
				<select className={className} {...input}>
					<option value='' defaultValue>
						Select time
					</option>
					{renderOptions}
				</select>
				{this.renderError(meta)}
			</div>
		);
	};

	renderInput = ({ input, label, meta }) => {
		const className = `form-control ${
			meta.error && meta.touched ? 'is-invalid' : ''
		}`;
		return (
			<div className='form-group'>
				<label htmlFor={input.name}>{label}</label>
				<input {...input} className={className} autoComplete='off' required />
				{this.renderError(meta)}
			</div>
		);
	};

	renderFields = () => {
		return scheduleFormFields.map(({ label, name }) => {
			if (name === 'date') {
				return (
					<Field
						key={name}
						name={name}
						label={label}
						component={this.renderDatePicker}
					/>
				);
			}
			if (name === 'timeFrom' || name === 'timeTo') {
				return (
					<Field
						key={name}
						name={name}
						label={label}
						component={this.renderTimePicker}
					/>
				);
			}
			return (
				<Field
					key={name}
					name={name}
					label={label}
					component={this.renderInput}
				/>
			);
		});
	};

	render() {
		return (
			<form
				onSubmit={this.props.handleSubmit(this.onSubmitForm)}
				className='needs-validation'
				noValidate>
				{/* <Field
					name='date'
					label='Enter Date'
					component={this.renderDatePicker}
				/>
				<Field name='timeFrom' label='From' component={this.renderTimePicker} />
				<Field name='timeTo' label='To' component={this.renderTimePicker} />
				<Field
					name='eventname'
					label='Enter Event Name'
					component={this.renderInput}
				/>
				<Field
					name='details'
					label='Enter details'
					component={this.renderInput}
				/>
				<Field
					name='organizer'
					label='Enter name of organizer'
					component={this.renderInput}
				/> */}
				{this.renderFields()}
				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
			</form>
		);
	}
}

const validate = (formValues, { schedules }) => {
	const errors = {};
	scheduleFormFields.forEach(({ name, noValueError }) => {
		if (!formValues[name]) {
			errors[name] = noValueError;
		}
	});

	const { timeFrom, timeTo, date } = formValues;

	if (timeFrom && timeTo) {
		let from = parseFloat(timeFrom);
		let to = parseFloat(timeTo);
		if (from > to) {
			errors.timeFrom = 'From should not be greater than To';
		}
		if (from === to) {
			errors.timeTo = 'From and to should not be equal';
			errors.timeFrom = 'From and to should not be equal';
		}
		if (date) {
			const schedulesBasedOnDate = schedules.filter(
				(schedule) =>
					new Date(schedule.date).toDateString() ===
					new Date(date).toDateString()
			);
			const {
				isTimeOverlapped,
				timeFromMessage,
				timeToMessage,
			} = checkIfTimeOverlaps(schedulesBasedOnDate, timeFrom, timeTo);
			if (isTimeOverlapped) {
				if (timeFromMessage) errors.timeFrom = timeFromMessage;
				if (timeToMessage) errors.timeTo = timeToMessage;
			}
		}
	}

	return errors;
};

const mapStateToProps = (state) => {
	return { schedules: state.schedule.schedules };
};

export default connect(mapStateToProps, { getSchedules })(
	reduxForm({ form: 'scheduleForm', validate })(ScheduleForm)
);

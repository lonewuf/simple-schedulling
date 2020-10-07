import {
	ADD_SCHEDULE,
	GET_SCHEDULES,
	GET_SCHEDULE,
	SET_EVENTS_SCHEDULES_ON_SELECTED_DAY,
	GET_EVENTS_BASED_ON_SELECTED_DAY,
	SET_SCHEDULE_LOADING,
	EDIT_SCHEDULE,
} from './types';
import axios from 'axios';
import history from '../history';

export const addSchedule = (data) => async (dispatch) => {
	const response = await axios.post('/schedule', data);
	dispatch({
		type: ADD_SCHEDULE,
		payload: response.data,
	});

	history.push('/');
};

export const getSchedules = () => async (dispatch) => {
	const response = await axios.get('/schedule/all');
	dispatch({
		type: GET_SCHEDULES,
		payload: response.data,
	});
};

export const getSchedule = (id) => async (dispatch) => {
	dispatch(setScheduleLoading());
	const response = await axios.get(`/schedule/${id}`);
	dispatch({
		type: GET_SCHEDULE,
		payload: response.data,
	});
};

export const editSchedule = (data, id) => async (dispatch) => {
	const response = await axios.put(`/schedule/edit/${id}`, data);
	dispatch({
		type: EDIT_SCHEDULE,
		payload: response.data,
	});

	history.push('/');
};

export const setEventsSchedulesOnThisDay = (data) => async (dispatch) => {
	dispatch({
		type: SET_EVENTS_SCHEDULES_ON_SELECTED_DAY,
		payload: data,
	});
};

export const getEventsBasedOnSelectedDay = (year, month) => async (
	dispatch
) => {
	dispatch(setScheduleLoading());
	const response = await axios.get(`/schedule/find/${year}/${month}`);
	dispatch({
		type: GET_EVENTS_BASED_ON_SELECTED_DAY,
		payload: response.data,
	});
};

export const setScheduleLoading = () => {
	return {
		type: SET_SCHEDULE_LOADING,
	};
};

import {
	ADD_SCHEDULE,
	GET_SCHEDULES,
	GET_SCHEDULE,
	SET_EVENTS_SCHEDULES_ON_SELECTED_DAY,
	GET_EVENTS_BASED_ON_SELECTED_DAY,
	SET_SCHEDULE_LOADING,
	EDIT_SCHEDULE,
} from '../actions/types';

const INITIAL_STATE = {
	schedules: [],
	loading: false,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_SCHEDULE_LOADING:
			return { ...state, loading: true };
		case ADD_SCHEDULE:
			return { ...state, schedules: [...state.schedules, action.payload] };
		case EDIT_SCHEDULE:
			return {
				...state,
				schedules: [
					...state.schedules.filter(
						(schedule) => schedule._id !== action.payload._id
					),
					action.payload,
				],
			};
		case GET_SCHEDULES:
			return { ...state, schedules: [...action.payload] };
		case GET_SCHEDULE:
			return { ...state, schedule: action.payload, loading: false };
		case SET_EVENTS_SCHEDULES_ON_SELECTED_DAY:
			return { ...state, eventsOnSelectedDay: action.payload };
		case GET_EVENTS_BASED_ON_SELECTED_DAY:
			return {
				...state,
				eventsBasedOnSelectedDay: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

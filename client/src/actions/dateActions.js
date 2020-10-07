import { SET_CLICKED_DAY } from './types';

export const setClickedDay = (clickedDay) => {
	return {
		type: SET_CLICKED_DAY,
		payload: clickedDay,
	};
};

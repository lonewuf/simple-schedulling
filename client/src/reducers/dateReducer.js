import { SET_CLICKED_DAY } from '../actions/types';

const INITIAL_STATE = {
  clickedDate: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CLICKED_DAY:
      return { ...state, clickedDate: action.payload };
    default:
      return state;
  }
};

import { combineReducers } from 'redux';
import dateReducer from './dateReducer';
import scheduleReducer from './scheduleReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  date: dateReducer,
  schedule: scheduleReducer,
  form: formReducer,
});

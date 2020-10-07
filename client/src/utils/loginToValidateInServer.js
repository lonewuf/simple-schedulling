import api from '../api/api';
import {} from 'redux-form';

const postToAPI = ({ username, password }) => {
	return api.post('/user/login', { username, password });
};

export const loginToValidateInServer = async (values) => {
	try {
		const response = await postToAPI(values);
		if (response.data.error) {
		}
	} catch (err) {
		console.log(err);
	}
};

import React from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import api from '../../api/api';

class Login extends React.Component {
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

	renderError({ error, touched }) {
		if (touched && error) {
			return <div className='invalid-feedback'>{error}</div>;
		}
	}

	handleSubmit = () => {
		return new Promise(async (resolve, reject) => {
			const response = await api.post('/user/login', {});
			console.log('response');
			console.log(response);
			if (response.data.error) {
				throw new SubmissionError({
					password: response.error,
				});
			}
		});
	};

	render() {
		console.log('state');
		console.log(this.state);
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-md-4'></div>
					<div className='col-md-4'>
						<div className='card'>
							<div className='card-header text-center'>Login</div>
							<div className='card-body'>
								<form onSubmit={this.handleSubmit} noValidate>
									<Field
										name='username'
										label='Username'
										component={this.renderInput}
									/>
									<Field
										name='password'
										label='Password'
										type='password'
										component={this.renderInput}
									/>
									<button type='submit' className='btn btn-success'>
										Login
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className='col-md-4'></div>
			</div>
		);
	}
}

const validate = ({ username, password }) => {
	const errors = {};
	if (!username) {
		errors.username = 'Username is empty';
	}
	if (!password) {
		errors.usernampassworde = 'Password is empty';
	}
};

export default reduxForm({ form: 'loginForm', validate })(Login);

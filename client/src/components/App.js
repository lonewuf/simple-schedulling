import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import MainCalendar from './calendar/MainCalendar';
import AddSchedule from './schedule/AddSchedule';
import { Header } from './layout/Header';
import EditSchedule from './schedule/EditSchedule';
import Login from './auth/Login';
import Landing from './layout/Landing';

class App extends React.Component {
	render() {
		return (
			<div>
				<Router history={history}>
					<Header />
					<Switch>
						{/* <Route path='/landing' exact component={Landing} />
						<Route path='/login' exact component={Login} /> */}
						<Route path='/' exact component={MainCalendar} />
						<Route path='/schedule' exact component={AddSchedule} />
						<Route path='/schedule/edit/:id' exact component={EditSchedule} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;

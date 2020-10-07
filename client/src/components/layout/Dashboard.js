import React from 'react';
import MainCalendar from '../calendar/MainCalendar';
import Schedule from '../schedule/Schedule';

const Dashboard = () => {
  return (
    <div className='row mt-5'>
      <div className='col-md-5'>
        <MainCalendar />
      </div>
      <div className='col-md-7'>
        <Schedule />
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import Job from '../components/Job';
import { useContext } from 'react';
import { SharedContext } from '../pages/Home';
import Cookies from 'js-cookie';

const JobList = () => {
  const { jobs } = useContext(SharedContext);
  // to do
  // fetch component to grab our job

  const jobsArray = [];

  function newJob() {
    const userId = Cookies.get('userIdCookie');
    //  get req to DB for empty job data (id should be the only non-null)
    //    we could also send the null obj if necessary
    fetch('http://localhost:4000/createJobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userIdCookie: userId,
       }),
    })
      .then((res) => res.json())
      .then(window.location.reload());
  }

  // iterate through job state and put a Job <job/> component into an array for each applciation in state

  for (let i = 0; i < jobs.length; i++) {
    const jobComponentData = jobs[i];
    jobsArray.push(<Job data={jobComponentData} />);
  }

  return (
    <div>
      <div className='topbar'>
        <h1>Job List</h1>
        <button onClick={() => newJob()}>Create New Job</button>
      </div>
      <div className='jobs-array'>{jobsArray}</div>
    </div>
  );
};

export default JobList;

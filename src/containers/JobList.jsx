import React from 'react';
import Job from '../components/Job';
import { useContext } from 'react';
import { SharedContext } from '../pages/Home';

const JobList = () => {
  const { jobs } = useContext(SharedContext)
  // to do
  // fetch component to grab our job

  const jobsArray = [];

  // iterate through job state and put a Job <job/> component into an array for each applciation in state

  for(let i = 0; i < jobs.length; i++) {
    jobsArray.push(<Job data={jobs[i]} />);
  }

  return (
    <div>
      <div className='topbar'>
        <h1>Job List</h1>
        <button>create new job</button>
      </div>
      <div className='jobs-array'>{jobsArray}</div>
    </div>
  );
};

export default JobList;

import React from 'react';
import Job from '../components/Job';
import { useContext } from 'react';
import { SharedContext } from '../pages/Home';

const JobList = () => {
  const { jobs } = useContext(SharedContext);
  // to do
  // fetch component to grab our job

  const jobsArray = [];

  function newJob() {
    //  get req to DB for empty job data (id should be the only non-null)
    //    we could also send the null obj if necessary
    fetch('http://localhost:4000/createJobs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //       company: null,
      //       position: null,
      //       link: null,
      //       app_contact: null,
      //       cover_letter: null,
      //       status: null,
      //       date_submitted: null,
      //       dd: false,
      //       dd_name: null,
      //       dd_message: null,
      //       dd_contact_info: null,
      //       dd_follow_up: false,
      //       dd_follow_up_date: null
      // }),
    })
      .then((res) => res.json())
      .then(window.location.reload());
  }

  // iterate through job state and put a Job <job/> component into an array for each applciation in state

  for (let i = 0; i < jobs.length; i++) {
    jobsArray.push(<Job data={jobs[i]} />);
  }

  return (
    <div className='job-list'>
      <div className='topbar'>
        <h1>Job List</h1>
        <button onClick={() => newJob()}>Create New Job</button>
      </div>
      <div className='jobs-array'>{jobsArray}</div>
    </div>
  );
};

export default JobList;

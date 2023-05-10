import React, { useContext } from 'react';
import { SharedContext } from '../pages/Home';

const Job = (data) => {

  const { setDisplayedJob } = useContext(SharedContext);

  const showDetails = () => {
    setDisplayedJob(data);
  }

  const deleteJob = () => {
    fetch('/deleteJob', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        job: data.id,
      }),
    }).then(window.location.reload());
  }

  return (
    <div className='job-container'>
      <h3>{`${data.position} at ${data.company}`}</h3>
      <button onClick={() => showDetails()}>VIEW</button>
      <button onClick={() => deleteJob()}>DELETE</button>
    </div>
  );
};

export default Job;

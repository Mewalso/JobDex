import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import JobList from '../containers/JobList.jsx;
import JobList from '../containers/JobList';
import JobDataView from '../components/JobDataView';
import RejectionBar from '../components/RejectionBar';
import Cookies from 'js-cookie';
// import { JobInterface, JobsArray } from '../../types/types';

export const SharedContext = React.createContext({});

const Home: React.FC = () => {
  const [jobs, setJobs] = useState([]);
  const [displayedJob, setDisplayedJob] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    //check if cookie and nagivate appropiatly
    const userId = Cookies.get('userIdCookie');
    console.log('userId is: ', userId);

    if (userId) {
      fetch('/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setJobs(data.jobs);
        });
    } else {
      console.log(' you are about to navigate back to login');
      // navigate('/Login');
    }
  }, []);

  return (
    <SharedContext.Provider value={{ jobs, displayedJob, setDisplayedJob }}>
      <div>
        <JobList />
        <JobDataView />
        <RejectionBar />
      </div>
    </SharedContext.Provider>
  );
};

export default Home;

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
  const [displayedJob, setDisplayedJob] = useState({
    company: null,
    link: null,
    app_contact: null,
    cover_letter: null,
    status: null,
    date_submitted: null,
    position: null,
    dd: false,
    dd_name: null,
    dd_contact_info: null,
    dd_follow_up: null,
    dd_follow_up_date: null,
    dd_message: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    //check if cookie and nagivate appropiatly
    const userId = Cookies.get('userIdCookie');

    if (userId) {
      fetch('http://localhost:4000/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userIdCookie: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setJobs(data);
        });
    } else {
      console.log(' you are about to navigate back to login');
      // navigate('/login');
    }
  }, []);

  return (
    <SharedContext.Provider value={{ jobs, displayedJob, setDisplayedJob }}>
      <div className='home'>
        <JobList />
        <JobDataView />
        {/* <RejectionBar /> */}
      </div>
    </SharedContext.Provider>
  );
};

export default Home;

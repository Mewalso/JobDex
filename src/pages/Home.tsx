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
    id: null,
    company: null,
    link: null,
    app_contact: null,
    double_down: {
      id: null,
      name: null,
      message: null,
      date: null,
      contact_info: null,
      follow_up: null,
      follow_up_date: null,
      doubled_down: null
    },
    cover_letter: null,
    status: null,
    date_submitted: null,
    user_id: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    //check if cookie and nagivate appropiatly
    const userId = Cookies.get('userIdCookie');

    if (userId) {
      fetch('/jobs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('data: ', data)
          setJobs(data);
        });
    } else {
      console.log(' you are about to navigate back to login');
      // navigate('/login');
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

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobList from '../components/JobList';
import JobDataView from '../components/JobDataView';
import RejectionBar from '../components/RejectionBar';
import Cookies from 'js-cookie';

const Home: React.FC = () => {
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    //check if cookie and nagivate appropiatly
    const userId = Cookies.get('userIdCookie');

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
      navigate('/Login');
    }
  }, []);

  return (
    <div>
      <JobList jobs={jobs} />
      <JobDataView />
      <RejectionBar />
    </div>
  );
};

export default Home;

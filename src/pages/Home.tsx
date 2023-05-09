import React, {useEffect, useState} from "react";
import JobList from "../components/JobList";
import JobDataView from "../components/JobDataView";
import RejectionBar from "../components/RejectionBar";

const Home: React.FC = () => {

  const [jobs, setJobs] = useState([]);

  

  useEffect(() => {
    // Get the job list
    // Iterate through Job list and set to state
  },[]);

  return(
    <div>
        <JobList jobs={jobs} />
        <JobDataView />
        <RejectionBar />
    </div>

  )
}


export default Home;
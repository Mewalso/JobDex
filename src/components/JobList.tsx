import React, { PropsWithoutRef } from "react";
import Job from "./Job";

const JobList: React.FC<any> = ({ jobs }) => {
    // to do
    // fetch component to grab our job 

    const JobsArray: Array<React.FC> = [];
    
    // iterate through job state and put a Job <job/> component into an array for each applciation in state

    for (let i = 0; i < jobs.length; i++ ) {
        JobsArray.push(<Job data={jobs[i]}/> );
    }

    return (
        <div>
            <div className="topbar">
                <h1>Job List</h1>
                <button>create new job</button>
            </div>
            <div className='jobs-array'>                
                {JobsArray}
            </div>
        </div>
    )
    
}

export default JobList;
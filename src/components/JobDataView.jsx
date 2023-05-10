import React, { useState, useContext } from "react";
import Job from "./Job";
import { SharedContext } from "../pages/Home";

const JobDataView = () => {
    const { displayedJob, setDisplayedJob } = useContext(SharedContext);
    
    // each input with have its own peice of state
    //  onChange of each input with update its corresponding peice of state

    // on submit, setDisplayedJob will be invoked with all the input peices of state 
    // send updated displayedJob state obj to DB to be saved
    
     // const [textField, setTextField] = useState()
    // const [state, setState] = useState({
    //     field1: "",
    //     field2: "",
    //     nestedField: {
    //       nestedField1: "",
    //       nestedField2: ""
    //     }
    //   });
      
    //   setState(prevState => ({
    //     ...prevState,
    //     nestedField: {
    //       ...prevState.nestedField,
    //       nestedField1: "new value"
    //     }
    //   }));


    // TODO:
    //  submit handleClick
    //      send to DB
    //  status feature

    const saveHandleClick = () => {
        setDisplayedJob(prevState => ({
            ...prevState,

        }))
    }

    // INITIAL INFO
    const [position, setPosition] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [appContact, setAppContact] = useState('');
    const [submittedDate, setSubmittedDate] = useState('');
    const [link, setLink] = useState('');
    
    // DOUBLE DOWN
    const [doubleDown, setDoubleDown] = useState(false);
    const [contactName, setContactName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [doubleDownMessage, setDoubleDownMessage] = useState('');
    const [doubleDownFollow, setDoubleDownFollow] = useState(false);

    return (
        <div>
            <h3> data.position at data.company</h3>
            <div className="data-container">
                <div className="job-interface">
                    <div className="position-company-container">
                        <div className="position-container">
                            <h4>Position</h4>
                            <input type="text" placeholder="Job Position" value={displayedJob.position} onChange={(e) => setPosition(e.target.value)}/>
                        </div>
                        <div className="company-container">
                            <h4>Company</h4>
                            <input type="text" placeholder="Company" value={displayedJob.company} onChange={(e) => setCompanyName(e.target.value)}/>
                        </div>
                    </div>
                        <div className="company-container">
                            <h4>Cover Letter</h4>
                            <input type="text" placeholder="Cover Letter" value={displayedJob.coverLetter} onChange={(e) => setCoverLetter(e.target.value)}/>
                        </div>
                    <div className="date-contact-link-container">
                        <div className="date-container">
                            <h4>Date Submitted</h4>
                            <input type="text" placeholder="Date Submitted" value={displayedJob.date_submitted} onChange={(e) => setSubmittedDate(e.target.value)}/>
                        </div>
                        <div className="poc-container">
                            <h4>Application Point of Contact or Referrals</h4>
                            <input type="text" placeholder="Application Point of Contact or Referrals" value={displayedJob.app_contact} onChange={(e) => setAppContact(e.target.value)}/>
                        </div>
                        <div className="link-container">
                            <h4>Application Link</h4>
                            <input type="text" placeholder="Application Link" value={displayedJob.link} onChange={(e) => setLink(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="double-down">
                    <div className='have-you-dd'>       
                        <p>Have you doubled down?</p>
                        <input type='checkbox' checked={doubleDown} onChange={() => {setDoubleDown(!doubleDown)}}></input>
                    </div>
                    <div className="dd-contact">
                        <p>Double Down Contact</p>
                        <input type='text' placeholder="Double Down Contact" value={displayedJob.name} onChange={(e) => setContactName(e.target.value)}></input>
                    </div>
                    <div className="dd-info">
                        <p>Contact Info</p>
                        <input type='text' placeholder="Double Down Contact info" value={displayedJob.contact_info} onChange={(e) => setContactInfo(e.target.value)}></input>
                    </div>
                    <div className="dd-message">
                        <p>Double Down Message</p>
                        <input type='text' placeholder="Double Down Message" value={displayedJob.message} onChange={(e) => setDoubleDownMessage(e.target.value)}></input>
                    </div>
                    <div className="dd-follow-up">
                        <p>Follow up by {displayedJob.follow_up_by}</p>
                        <input type='checkbox'value={displayedJob.follow_up} checked={doubleDownFollow} onChange={() => {setDoubleDownFollow(!doubleDownFollow)}}></input>
                    </div>
                </div>
            </div>
            <footer>
                <input>Status : {displayedJob.status}</input>
                <button onClick={() => {saveHandleClick()}}>Save Changes</button>
            </footer>
        </div>
    )


}

export default JobDataView;
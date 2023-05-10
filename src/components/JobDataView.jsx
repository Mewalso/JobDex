import React, { useState, useContext, useEffect } from 'react';
import Job from './Job';
import { SharedContext } from '../pages/Home';

const JobDataView = () => {
  const { displayedJob, setDisplayedJob } = useContext(SharedContext);

  // each input with have its own peice of state
  //  onChange of each input with update its corresponding peice of state

  // on submit, setDisplayedJob will be invoked with all the input peices of state
  // send updated displayedJob state obj to DB to be saved

  useEffect(() => {
    null;
  }, [displayedJob]);

  const saveChangesHandleClick = () => {
    setDisplayedJob((prevState) => ({
      ...prevState,
      company: companyName,
      link: link,
      app_contact: appContact,
      cover_letter: coverLetter,
      date_submitted: dateSubmitted,
      dd: doubleDown,
      dd_name: contactName,
      dd_contact_info: contactInfo,
      dd_message: doubleDownMessage,
      dd_follow_up: doubleDownFollow,
    }));

    // Db patch req
    fetch('/updateJob', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...setDisplayedJob,
      }),
    }).then(alert('Changes Saved!'));
  };

  // INITIAL INFO
  const [position, setPosition] = useState(displayedJob.position || '');
  const [companyName, setCompanyName] = useState(displayedJob.company || '');
  const [coverLetter, setCoverLetter] = useState(
    displayedJob.cover_letter || ''
  );
  const [appContact, setAppContact] = useState(displayedJob.app_contact || '');
  const [dateSubmitted, setDateSubmitted] = useState(
    displayedJob.date_submitted || ''
  );
  const [link, setLink] = useState(displayedJob.link || '');

  // DOUBLE DOWN
  const [doubleDown, setDoubleDown] = useState(displayedJob.dd || false);
  const [contactName, setContactName] = useState(displayedJob.dd_name || '');
  const [contactInfo, setContactInfo] = useState(
    displayedJob.dd_contact_info || ''
  );
  const [doubleDownMessage, setDoubleDownMessage] = useState(
    displayedJob.dd_message || ''
  );
  const [doubleDownFollowDate, setDoubleDownFollowDate] = useState(
    displayedJob.dd_follow_up_date || ''
  );
  const [doubleDownFollow, setDoubleDownFollow] = useState(
    displayedJob.dd_follow_up || false
  );

  return (
    <div className='data-view'>
      <h3>
        {position} at {companyName}
      </h3>
      <div className='data-container'>
        <div className='job-interface'>
          <div className='position-company-container'>
            <div className='position-container'>
              <h4>Position</h4>
              <input
                type='text'
                placeholder='Job Position'
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className='company-container'>
              <h4>Company</h4>
              <input
                type='text'
                placeholder='Company'
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </div>
          <div className='company-container'>
            <h4>Cover Letter</h4>
            <input
              type='text'
              placeholder='Cover Letter'
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
          </div>
          <div className='date-contact-link-container'>
            <div className='date-container'>
              <h4>Date Submitted</h4>
              <input
                type='text'
                placeholder='Date Submitted'
                value={dateSubmitted}
                onChange={(e) => setDateSubmitted(e.target.value)}
              />
            </div>
            <div className='poc-container'>
              <h4>Application Point of Contact or Referrals</h4>
              <input
                type='text'
                placeholder='Application Point of Contact or Referrals'
                value={appContact}
                onChange={(e) => setAppContact(e.target.value)}
              />
            </div>
            <div className='link-container'>
              <h4>Application Link</h4>
              <input
                type='text'
                placeholder='Application Link'
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>
        </div>
        <hr></hr>
        <div className='double-down'>
          <div className='have-you-dd'>
            <p>Have you doubled down?</p>
            <input
              type='checkbox'
              checked={doubleDown}
              onChange={() => {
                setDoubleDown(!doubleDown);
              }}
            />
          </div>
          <div className='dd-contact'>
            <p>Double Down Contact</p>
            <input
              type='text'
              placeholder='Double Down Contact'
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>
          <div className='dd-info'>
            <p>Contact Info</p>
            <input
              type='text'
              placeholder='Double Down Contact info'
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>
          <div className='dd-message'>
            <p>Double Down Message</p>
            <input
              type='text'
              placeholder='Double Down Message'
              value={doubleDownMessage}
              onChange={(e) => setDoubleDownMessage(e.target.value)}
            />
          </div>
          <div className='dd-follow-up-by'>
            <p>Follow up by {doubleDownFollowDate}</p>
            <input
              type='text'
              placeholder='Follow up by'
              value={doubleDownFollowDate}
              onChange={(e) => {
                setDoubleDownFollowDate(e.target.value);
              }}
            />
            <input
              type='checkbox'
              value={doubleDownFollow}
              checked={doubleDownFollow}
              onChange={() => {
                setDoubleDownFollow(!doubleDownFollow);
              }}
            />
          </div>
        </div>
        <button
          onClick={() => {
            saveChangesHandleClick();
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default JobDataView;

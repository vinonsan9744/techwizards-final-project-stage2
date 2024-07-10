/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../style/ApproveHazard .css';
import { RiMessage2Fill } from 'react-icons/ri';
import { GiElephant } from 'react-icons/gi';
import { FaLocationDot } from 'react-icons/fa6';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

function ApproveHazard() {
  const [hazardCount, setHazardCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [inputLocation, setInputLocation] = useState('');
  const [inputHazard, setInputHazard] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [pilotName, setPilotName] = useState('');
  const [pilotPhone, setPilotPhone] = useState('');
  const [locationHazards, setLocationHazards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/api/locomotivePilotHazard')
      .then(response => {
        setHazardCount(response.data.length);
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching hazard data:', error);
      });
  }, []);

  const handleNotificationClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const markAsRead = async (hazardId, locomotivePilotID) => {
    try {
      const hazardResponse = await axios.get(`http://localhost:4000/api/locomotivePilotHazard/hazardID/${hazardId}`);
      setSelectedNotification(hazardResponse.data);
      setShowModal(false);

      // Fetch locomotive pilot details using locomotivePilotID
      const pilotResponse = await axios.get(`http://localhost:4000/api/locomotivePilot/${locomotivePilotID}`);
      setPilotName(pilotResponse.data.name);
      setPilotPhone(pilotResponse.data.phone);
    } catch (error) {
      console.error('Error fetching hazard or pilot details:', error);
    }
  };

  const handleAcceptClick = async (type, value) => {
    if (type === 'hazard') {
      setInputHazard(value);
    } else if (type === 'location') {
      setInputLocation(value);
      // Fetch hazards for the selected location
      try {
        const response = await axios.get(`http://localhost:4000/api/hazard/locationName/${value}`);
        setLocationHazards(response.data);
      } catch (error) {
        console.error('Error fetching hazards:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();
    
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
  
    const month = monthNames[monthIndex];
    
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
    const time = `${formattedHours}:${formattedMinutes} ${period}`;
  
    return { day, month, year, time };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/hazard', {
        locationName: inputLocation,
        hazardType: inputHazard
      });
      console.log(response.data); // Log response data
      setSuccessMessage('Hazard data saved successfully!');
      setErrorMessage('');
      setInputLocation('');
      setInputHazard('');
    } catch (error) {
      console.error('Hazard Reporting failed:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error); // Set error message from server response
      } else {
        setErrorMessage('Failed to save hazard data. Please try again.'); // Set a generic error message
      }
      setSuccessMessage('');
      setShowErrorModal(true); // Show error modal
    }
  };

  const handleCloseErrorModal = () => setShowErrorModal(false);

  return (
    <>
      <div className="container-flex vh-100">
        <div className="row vh-100">
          <div className="ApproveHazard-main-left col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="ApproveHazard-header-box container-flex w-100 vh-30">
              <h1 className="ApproveHazard-title">Approve Hazard</h1>
            </div>
            <div className="ApproveHazard-newhazard-box container-flex vh-30">
              <div className="row">
                <div className="ApproveHazard-newhazard-heading-box container-flex">
                  <div className="ApproveHazard-newhazard-heading-title-box container-flex">
                    <h1>New Hazards Update</h1>
                  </div>
                  <div className="ApproveHazard-newhazard-heading-notification-box container-flex">
                    <button
                      type="button"
                      className="ApproveHazard-notification-button-box-icon btn btn-primary position-relative"
                      onClick={handleNotificationClick}
                    >
                      <RiMessage2Fill className='ApproveHazard-message-icon' />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        <Badge bg="danger" className="ApproveHazard-badge-position">{hazardCount}</Badge>
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="ApproveHazard-newhazard-content-box container-flex">
                  <div className="row">
                    <div className="ApproveHazard-detail-box container-flex">
                      <div className="ApproveHazard-detail-name-box container-flex">
                        <p>Name:</p>
                        <p>{selectedNotification && `${selectedNotification.locomotivePilotName}`}</p>
                      </div>
                      <div className="ApproveHazard-detail-loco-phone-box container-flex">
                      <p>LP Phone No:</p>
                      <p>{selectedNotification && `${selectedNotification.locomotivePilotPhoneNo}`}</p>
                       
                      </div>
                      <div className="ApproveHazard-detail-station-phone-box container-flex">
                      <p>Station Phone No:</p>
                      <p>{selectedNotification && `${selectedNotification.locomotivePilotPhoneNo}`}</p>
                      </div>
                    </div>
                    <div className="ApproveHazard-description-box container-flex">
                      <p>
                        {selectedNotification && (() => {
                          const { day, month, year, time } = formatDate(selectedNotification.time);
                          return `IN ${selectedNotification.locationName}, On ${day} ${month} ${year} at ${time}, ${selectedNotification.hazardType} hazard was reported`;
                        })()}
                      </p>
                    </div>
                    <div className="ApproveHazard-accept-box container-flex">
                      <div className="row">
                        <div className="ApproveHazard-hazard-btn-box container-flex">
                          <div className="ApproveHazard-hazard-left-icon-box">
                            <GiElephant />
                          </div>
                          <div className="ApproveHazard-hazard-middle-input-box">
                            <p>{selectedNotification && selectedNotification.hazardType}</p>
                          </div>
                          <div className="ApproveHazard-hazard-right-button-box">
                            <Button
                              className="ApproveHazard-hazard-right-button"
                              variant="outline-dark"
                              onClick={() => handleAcceptClick('hazard', selectedNotification.hazardType)}
                            >
                              Accept
                            </Button>
                          </div>
                        </div>
                        <div className="ApproveHazard-location-btn-box container-flex">
                          <div className="ApproveHazard-hazard-left-icon-box">
                            <FaLocationDot />
                          </div>
                          <div className="ApproveHazard-hazard-middle-input-box">
                            <p>{selectedNotification && selectedNotification.locationName}</p>
                          </div>
                          <div className="ApproveHazard-hazard-right-button-box">
                            <Button
                              className="ApproveHazard-hazard-right-button"
                              variant="outline-dark"
                              onClick={() => handleAcceptClick('location', selectedNotification.locationName)}
                            >
                              Accept
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ah-main-right col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="ah-right-header-box container-flex vh-30">
              <h1>Approval Hazard</h1>
            </div>
            <Form onSubmit={handleSubmit}>
              <InputGroup className="ah-input-dropdown-box ">
                <Form.Control
                  placeholder="Location"
                  value={inputLocation}
                  onChange={(e) => setInputLocation(e.target.value)}
                  style={{ height: '70px', fontSize: '5vh', color: '#387373', fontWeight: 'bolder' }}
                  aria-label="Text input with dropdown button"
                  id="ah-input-location"
                />
                <Button
                  variant="outline-secondary"
                  title="Select Route"
                  id="ah-input-group-dropdown-2"
                  align="end"
                  className="ah-dropdown-box-button"
                 
                >
                  <div className="ApproveHazard-hazard-right-hazard-icon">
                    <FaLocationDot />
                  </div>
                </Button>
              </InputGroup>

              <div className="ApproveHazard-hazard-icon-box2 container-flex">
                {locationHazards.map((hazard, index) => (
                  <div key={index} className="ApproveHazard-hazard-content container-flex">
                    <h2 className="ApproveHazard-hazard-icon">{hazard.hazardType}</h2>
                  </div>
                ))}
              </div>

             

              <InputGroup className="ah-input-dropdown-box ">
                <Form.Control
                  placeholder="Hazard"
                  value={inputHazard}
                  onChange={(e) => setInputHazard(e.target.value)}
                  style={{ height: '70px', fontSize: '5vh', color: '#387373', fontWeight: 'bolder' }}
                  aria-label="Text input with dropdown button"
                  id="ah-input-hazard"
                />
                <Button
                  variant="outline-secondary"
                  title="Select Route"
                  id="ah-input-group-dropdown-2"
                  align="end"
                  className="ah-dropdown-box-button"
                  
                >
                  <div className="ApproveHazard-hazard-right-hazard-icon">
                    <GiElephant />
                  </div>
                </Button>
              </InputGroup>
            </Form>

            <form onSubmit={handleSubmit}>
              <div className="ah-box button-box container-flex">
                <Button
                  variant="outline-dark"
                  className="ah-button"
                  type="submit"
                >
                  Approve
                </Button>
              </div>

              <div className="ah-box button-box container-flex">
                <Button
                  variant="outline-dark"
                  className="ah-button"
                  
                >
                  Decline
                </Button>
              </div>
            </form>

            <div className="ah-box button-box container-flex">
              <Button
                variant="outline-dark"
                className="ah-button"
                onClick={() => navigate('/adminhomepage')}
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>

      {successMessage && (
        <Modal show={true} onHide={() => setSuccessMessage('')}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>{successMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => setSuccessMessage('')}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {errorMessage && (
        <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{errorMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseErrorModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Hazard Reports</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              <p>{`Hazard Reporting ${index + 1}`}</p>
              <Button variant="outline-success" onClick={() => markAsRead(notification.hazardID, notification.locomotivePilotID)}>
                View Report
              </Button>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ApproveHazard;

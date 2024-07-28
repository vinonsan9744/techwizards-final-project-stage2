/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import "./../style/UpdateLPDetails.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal'; // Import Modal component
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateLPDetails() {

  const navigate = useNavigate();

  
  const [selectedPilotId, setSelectedPilotId] = useState('');
  const [lpName, setLPName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [initialLPName, setInitialLPName] = useState('');
  const [initialPhoneNumber, setInitialPhoneNumber] = useState('');
  const [initialEmail, setInitialEmail] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');

  const [pilotIds, setPilotIds] = useState([]);
  useEffect(() => {
    const fetchPilotIds = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/locomotivePilot');
        setPilotIds(response.data.map(pilot => pilot.locomotivePilotID));
      } catch (error) {
        console.error('Error fetching pilot IDs:', error);
      }
    };
    fetchPilotIds();
  }, []);



  const handlePilotIdSelect = async (id) => {
    setSelectedPilotId(id);
    try {
      const response = await axios.get(`http://localhost:4000/api/locomotivePilot/locomotivePilotID/${id}`);
      const pilot = response.data;
      setLPName(pilot.locomotiveName);
      setPhoneNumber(pilot.locomotivePhoneNo);
      setEmail(pilot.locomotiveEmail);

      setInitialLPName(pilot.locomotiveName);
      setInitialPhoneNumber(pilot.locomotivePhoneNo);
      setInitialEmail(pilot.locomotiveEmail);
    } catch (error) {
      console.error('Error fetching pilot details:', error);
    }
  };

  
  const handleSubmit = async () => {
    try {
      const response = await axios.patch(`http://localhost:4000/api/locomotivePilot/locomotivePilotID/${selectedPilotId}`, {
        locomotiveName: lpName,
        locomotivePhoneNo: phoneNumber,
        locomotiveEmail: email
      });

      setModalMessage('Pilot details updated successfully.');
      setModalType('success');
      setShowModal(true);

    } catch (error) {

      setModalMessage('Error updating pilot details. Please try again.');
      setModalType('error');
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="container-flex vh-100">
        <div className="row vh-100">
          
          {/* left side start from here*/}
          <div className="UpdateLPDetails-main-left col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="UpdateLPDetails-header-box container-flex w-100 vh-30">
              <div className="UpdateLPDetails-title"><h1>Locomotive Pilot Details Update</h1></div>
            </div>

            <div>
              <InputGroup className="UpdateLPDetails-input-dropdown-box">
                <FloatingLabel controlId="floatingTextarea2" label="LP Id ">
                  <Form.Control
                    type="text"
                    value={selectedPilotId}
                    readOnly
                    aria-label="Select LP Id"
                    id="UpdateLPDetails-input"
                  />
                </FloatingLabel>
                <DropdownButton

                  variant="outline-secondary"
                  title=" LP Id"
                  id="input-group-dropdown-2"
                >
                  <div className="dropdown-menu-scrollable">
                    {pilotIds.map(id => (
                      <Dropdown.Item key={id} onClick={() => handlePilotIdSelect(id)}>{id}</Dropdown.Item>
                    ))}
                  </div>
                </DropdownButton>
              </InputGroup>

              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingLPName"
                  type="text"
                  value={lpName}
                  onChange={(e) => setLPName(e.target.value)}
                  placeholder="LP Name"
                  className="UpdateLPDetails-input-text-box"
                />
                <label htmlFor="floatingLPName">LP Name</label>
              </Form.Floating>

              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingPhoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  className="UpdateLPDetails-input-text-box"
                />
                <label htmlFor="floatingPhoneNumber">Phone Number</label>
              </Form.Floating>

              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingEmail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="UpdateLPDetails-input-text-box"
                />
                <label htmlFor="floatingEmail">Email Address</label>
              </Form.Floating>
            </div>

            <div className="UpdateLPDetails-box button-box container-flex">
              <Button variant="outline-dark" className='UpdateLPDetails-button' onClick={handleSubmit}>Update</Button>{' '}
            </div>

            <div className="UpdateLPDetails-box button-box container-flex">
              <Button variant="outline-dark" className='UpdateLPDetails-button' onClick={() => navigate('/adminhomepage')}>Back</Button>{' '}
            </div>
          </div>

          {/* right side start from here*/}
          <div className="UpdateLPDetails-main-right col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="UpdateLPDetails-heading-box container-flex">
              <h1 className="UpdateLPDetails-heading-box-title1">Locomotive Pilot Details</h1>
            </div>
            <div className="UpdateLPDetails-heading-line container-flex"></div>

            <div>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingId"
                  type="text"
                  name="id"
                  value={selectedPilotId}
                  placeholder="ID"
                  className="UpdateLPDetails-input-text-box"
                  readOnly
                />
                <label htmlFor="floatingId">ID</label>
              </Form.Floating>

              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingName"
                  type="text"
                  value={initialLPName}
                  placeholder="Name"
                  className="UpdateLPDetails-input-text-box"
                  readOnly
                />
                <label htmlFor="floatingName">Name</label>
              </Form.Floating>

              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingPhoneNumber"
                  type="tel"
                  value={initialPhoneNumber}
                  placeholder="Phone Number"
                  className="UpdateLPDetails-input-text-box"
                  readOnly
                />
                <label htmlFor="floatingPhoneNumber">Phone Number</label>
              </Form.Floating>

              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingEmail"
                  type="email"
                  value={initialEmail}
                  placeholder="Email Address"
                  className="UpdateLPDetails-input-text-box"
                  readOnly
                />
                <label htmlFor="floatingEmail">Email Address</label>
              </Form.Floating>
            </div>
          </div>
        </div>
      </div>

      {/* // Inside your JSX return statement in UpdateLPDetails component */}

<Modal show={showModal} onHide={() => setShowModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>{modalType === 'success' ? 'Success' : 'Error'}</Modal.Title>
  </Modal.Header>
  <Modal.Body id={modalType === 'success' ? 'modal-success' : 'modal-error'} className={`modal-${modalType}`}>
    {modalMessage}
  </Modal.Body>
  <Modal.Footer>
    <Button className={`UpdateLPDetails-close-button-${modalType}`} variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
  </Modal.Footer>
</Modal>

    </>
  );
}

export default UpdateLPDetails;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./../style/HazardLocation .css";
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRoute } from "react-icons/fa";
import { MdAddLocationAlt } from "react-icons/md";

function HazardLocation() {
  const navigate = useNavigate();
  const [locationTypes, setLocationTypes] = useState([]);
  const [selectedLocationType, setSelectedLocationType] = useState('');
  const [locationNames, setLocationNames] = useState([]);
  const [selectedLocationName, setSelectedLocationName] = useState('');
  const [hazards, setHazards] = useState([]);

  // Fetch location types on component mount
  useEffect(() => {
    const fetchLocationTypes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/location');
        const uniqueTypes = [...new Set(response.data.map(location => location.locationType))];
        setLocationTypes(uniqueTypes);
      } catch (error) {
        console.error('Error fetching location types:', error);
      }
    };

    fetchLocationTypes();
  }, []);

  // Fetch location names based on selected location type
  useEffect(() => {
    const fetchLocationNames = async () => {
      try {
        if (selectedLocationType) {
          const response = await axios.get(`http://localhost:4000/api/location?locationType=${selectedLocationType}`);
          // Filter location names based on selected location type
          const filteredNames = response.data
            .filter(location => location.locationType === selectedLocationType)
            .map(location => location.locationName);
          setLocationNames(filteredNames);
        }
      } catch (error) {
        console.error('Error fetching location names:', error);
      }
    };

    fetchLocationNames();
  }, [selectedLocationType]);

  // Fetch hazards based on selected location name
  useEffect(() => {
    const fetchHazards = async () => {
      try {
        if (selectedLocationName) {
          const response = await axios.get(`http://localhost:4000/api/hazard/locationName/${selectedLocationName}`);
          setHazards(response.data);
        }
      } catch (error) {
        console.error('Error fetching hazards:', error);
      }
    };

    fetchHazards();
  }, [selectedLocationName]);

  // Handle selection of location type
  const handleLocationTypeSelect = (type) => {
    setSelectedLocationType(type);
    setSelectedLocationName(''); // Reset selected location name when location type changes
  };

  // Handle selection of location name
  const handleLocationNameSelect = (name) => {
    setSelectedLocationName(name);
  };

  // Handle clear button click
  const handleClear = () => {
    setSelectedLocationType('');
    setSelectedLocationName('');
    setHazards([]);
  };

  return (
    <>
      <div className="container-flex vh-100">
        <div className="row vh-100">
          {/* Left side box */}
          <div className="hazard-location-main-left col-sm-12 col-md-6 col-lg-6 col-xl-6 " >
            
            <div className="LP-hazard-location-header-box container-flex w-100 vh-30">
              <h1 className="LP-hazard-location-header-title"> View Hazard Location</h1>
            </div>

            <InputGroup className="update-hazard-input-dropdown-box mt-5">
      <FloatingLabel controlId="floatingTextarea2" label="Select Route">
        <Form.Control
          placeholder="Leave a comment here"
          style={{ height: '5px' }}
          aria-label="Text input with dropdown button"
          id="update-hazard-input"
          value={selectedLocationType}
                    readOnly
        />
      </FloatingLabel>
      <Dropdown align="end">
        <Dropdown.Toggle as={Button} variant="outline-secondary" id="update-hazard-input-group-dropdown-2" className="custom-dropdown-toggle">
          <FaRoute />
        </Dropdown.Toggle>
        <Dropdown.Menu className="LP-hazard-location-scrollable-dropdown-menu">
        {locationTypes.map((type, index) => (
        <Dropdown.Item key={index} onClick={() => handleLocationTypeSelect(type)}>{type}</Dropdown.Item>
      ))}
        </Dropdown.Menu>
      </Dropdown>
    </InputGroup>


            <InputGroup className="update-hazard-input-dropdown-box mt-5 mb-5" >
      <FloatingLabel controlId="floatingTextarea2" label="Location">
        <Form.Control
          placeholder="Leave a comment here"
          style={{ height: '5px' }}
          aria-label="Text input with dropdown button"
          id="update-hazard-input"
          value={selectedLocationName }
         
          o
        />
      </FloatingLabel>
      <Dropdown align="end">
        <Dropdown.Toggle as={Button} variant="outline-secondary" id="update-hazard-input-group-dropdown-2" className="custom-dropdown-toggle">
          <MdAddLocationAlt />
        </Dropdown.Toggle>
        <Dropdown.Menu className="LP-hazard-location-scrollable-dropdown-menu">
        {locationNames.map((name, index) => (
                        <Dropdown.Item key={index} onClick={() => handleLocationNameSelect(name)}>{name}</Dropdown.Item>
                      ))}
        </Dropdown.Menu>
      </Dropdown>
    </InputGroup>

            <div className="LP-hazard-location-button-box1 container-flex vh-30">
              <Button variant="dark" className="LP-hazard-location-search-button" onClick={handleClear}>Clear</Button>
            </div>

            <div className="LP-hazard-location-button-box2 container-flex vh-30">
              <Button variant="dark" className="LP-hazard-location-back-button" onClick={() => navigate('/homepage')}>Back</Button>
            </div>
          </div>

          {/* Right side box */}
          <div className="hazard-location-main-right col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="hazard-location-location-box container-flex vh-30">
              <h1 className="hazard-location-heading">Possible Hazard</h1>
            </div>

            <div className="hazard-location-possible-main-box container-flex vh-30">
              <div className="row">
                <div className="hazard-location-possible-header-box container-flex">
                  <h2 className="hazard-location-possible-header-heading">{selectedLocationName}</h2>
                </div>

                {hazards.map((hazard, index) => (
                  <div key={index} className="hazard-location-possible-content-box1 container-flex">
                    <h2 className="hazard-location-possible-content-heading">{hazard.hazardType}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HazardLocation;

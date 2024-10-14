/* eslint-disable no-unused-vars */
import React, { useState,useEffect  } from "react";
import "./../style/HomePage .css";
import { FaCloudRain } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { IoIosCloudyNight } from "react-icons/io";
import { BsFillCloudFog2Fill } from "react-icons/bs";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isGreen, setIsGreen] = useState(false);
  const [time, setTime] = useState(new Date()); // State to hold current time
  const [location, setLocation] = useState("Loading..."); // State to hold location

  const handleButtonClick = () => {
    setIsContentVisible(!isContentVisible);
    setIsGreen(!isGreen);
  };

  // Updated Location fetching code with better error handling
useEffect(() => {
  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = "422e1d8e08dad104d47a623408c8f5a1"; // Make sure to replace with a valid key
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${apiKey}`
            );
            console.log("Response URL: ", response.url); // Log the URL to verify correctness
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("API Response Data: ", data); // Log the API response data
            if (data.results.length > 0) {
              setLocation(data.results[0].formatted_address); // Set the location to the state
            } else {
              setLocation("Location not found");
            }
          } catch (error) {
            console.error("Error fetching location: ", error);
            setLocation("Unable to retrieve location");
          }
        },
        (error) => {
          // Improved error handling
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocation("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setLocation("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setLocation("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              setLocation("An unknown error occurred.");
              break;
          }
          console.error("Geolocation error: ", error);
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  };

  getLocation();
}, []); // Run this effect only once when the component mounts



  // Format the time and date
  const formattedDate = time.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className="container-flex vh-100">
        <div className="row vh-100">

          {/* left side container box start */}
            <div className="HomePage-left-main-box col-sm-12 col-md-4 col-lg-4 col-xl-4 container-flex">
                <div className="HomePage-left-box">
                  <div className="HomePage-left-top-box container-flex">
                    <div className="row">
                      <div className="HomePage-left-top-side-button-box container-flex">
                        <button onClick={handleButtonClick}><h3><TbLayoutSidebarLeftExpandFilled /></h3></button>
                      </div>
                      <div
                        className={`HomePage-left-top-side-content-box container-flex ${isGreen ? "green-background" : ""}`}
                      >
                        {isGreen ? (
                          <div className="navigation-buttons container-flex">
                            
                            <button className="nav-button" onClick={() => navigate('/updatehazard')}>Report Hazard</button>
                            <button className="nav-button" onClick={() => navigate('/hazardlocation')}>view hazard location</button>
                            <button className="nav-button" onClick={() => navigate('/')}>Logout</button>
                          </div>
                        ) : (
                          isContentVisible && (
                            <div className="row">
                              <div className="HomePage-left-top-side-content-date-box container-flex">
                                <h6>{formattedDate}</h6>
                              </div>
                              <div className="HomePage-left-top-side-content-time-box container-flex">
                                <h6>{formattedTime}</h6>
                              </div>
                              <div className="HomePage-left-top-side-content-location-box container-flex">
                                <h6>{location}</h6>
                              </div>
                              <div className="HomePage-left-top-side-content-weather-box container-flex">
                                <h6>chance of rain 88%</h6>
                              </div>
                              <div className="HomePage-left-top-side-content-weather2-box container-flex">
                                <div className="row">
                                  <div className="HomePage-left-top-side-content-temperature-box container-flex">
                                    <h6>30 C</h6>
                                  </div>
                                  <div className="HomePage-left-top-side-content-rain-box container-flex">
                                    <div className="row">
                                      <div className="HomePage-left-top-side-content-rain-icon-box container-flex">
                                        <h1><FaCloudRain /></h1>
                                      </div>
                                      <div className="HomePage-left-top-side-content-rain-icon-label-box container-flex">
                                        <h6>Heavy rain</h6>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="HomePage-left-middle-box container-flex">
                    <div className="row">
                      <div className="HomePage-left-middle-wind-box container-flex">
                        <div className="row">
                          <div className="HomePage-left-middle-wind-icon-box container-flex">
                            <h1><FaWind /></h1>
                          </div>
                          <div className="HomePage-left-middle-wind-icon-label-box container-flex">
                            <h4>8 km/h</h4>
                          </div>
                        </div>
                      </div>
                      <div className="HomePage-left-middle-rainfall-box container-flex">
                        <div className="row">
                          <div className="HomePage-left-middle-rainfall-icon-box container-flex">
                            <h1><IoIosCloudyNight /></h1>
                          </div>
                          <div className="HomePage-left-middle-rainfall-icon-label-box container-flex">
                            <h1>Cloudy</h1>
                          </div>
                        </div>
                      </div>
                      <div className="HomePage-left-middle-fog-box container-flex">
                        <div className="row">
                          <div className="HomePage-left-middle-fog-icon-box container-flex">
                            <h1><BsFillCloudFog2Fill /></h1>
                          </div>
                          <div className="HomePage-left-middle-fog-icon-label-box container-flex">
                            <h1>Low Fog</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="HomePage-left-bottom-box container-flex">
                    <div className="row">
                      <div className="HomePage-left-bottom-output1-box container-flex"></div>
                      <div className="HomePage-left-bottom-output1-box container-flex"></div>
                    </div>
                  </div>
                </div>
            </div>
          {/* left side container box end */}

          {/* middle side container box start */}
          <div className="HomePage-middle-main-box col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div className="HomePage-middle-main-content-box container-flex">
                  <div className="row">
                    <div className="HomePage-middle-main-top-content-box container-flex"></div>
                    <div className="HomePage-middle-main-bottom-content-box container-flex"></div>
                  </div>
                </div>
          </div>
          {/* middle side container box end */}

          {/* right side container box start */}
          <div className="HomePage-bottom-main-box col-sm-12 col-md-4 col-lg-4 col-xl-4">
          <div className="HomePage-bottom-box">
                  <div className="HomePage-bottom-top-box container-flex">
                  <div className="row">
                            
                            <div className="HomePage-bottom-top-side-content-next-location-box container-flex"><h6>Next Location</h6></div>
                            <div className="HomePage-bottom-top-side-content-location-box container-flex"><h6>Jaffna</h6></div>
                            <div className="HomePage-bottom-top-side-content-weather-box container-flex"><h6>chance of rain 88%</h6></div>
                            <div className="HomePage-bottom-top-side-content-weather2-box container-flex">
                              <div className="row">
                                <div className="HomePage-bottom-top-side-content-temperature-box container-flex"><h6>30 C</h6></div>
                                <div className="HomePage-bottom-top-side-content-rain-box container-flex">
                                  <div className="row">
                                    <div className="HomePage-bottom-top-side-content-rain-icon-box container-flex">
                                      <h1><FaCloudRain /></h1></div>
                                    <div className="HomePage-bottom-top-side-content-rain-icon-label-box container-flex">
                                      <h6>Heavy rain</h6></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                  </div>
                  <div className="HomePage-left-middle-box container-flex">
                    <div className="row">
                      <div className="HomePage-left-middle-wind-box container-flex">
                        <div className="row">
                          <div className="HomePage-left-middle-wind-icon-box container-flex">
                            <h1><FaWind /></h1>
                          </div>
                          <div className="HomePage-left-middle-wind-icon-label-box container-flex">
                            <h4>8 km/h</h4>
                          </div>
                        </div>
                      </div>
                      <div className="HomePage-left-middle-rainfall-box container-flex">
                        <div className="row">
                          <div className="HomePage-left-middle-rainfall-icon-box container-flex">
                            <h1><IoIosCloudyNight /></h1>
                          </div>
                          <div className="HomePage-left-middle-rainfall-icon-label-box container-flex">
                            <h1>Cloudy</h1>
                          </div>
                        </div>
                      </div>
                      <div className="HomePage-left-middle-fog-box container-flex">
                        <div className="row">
                          <div className="HomePage-left-middle-fog-icon-box container-flex">
                            <h1><BsFillCloudFog2Fill /></h1>
                          </div>
                          <div className="HomePage-left-middle-fog-icon-label-box container-flex">
                            <h1>Low Fog</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="HomePage-left-bottom-box container-flex">
                    <div className="row">
                      <div className="HomePage-left-bottom-output1-box container-flex"></div>
                      <div className="HomePage-left-bottom-output1-box container-flex"></div>
                    </div>
                  </div>
                </div>
          </div>
          {/* right side container box end */}

        </div>
      </div>
    </>
  );
}

export default HomePage;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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

  const handleButtonClick = () => {
    setIsContentVisible(!isContentVisible);
    setIsGreen(!isGreen);
  };

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
                                <h6>23 July 2024, Friday</h6>
                              </div>
                              <div className="HomePage-left-top-side-content-time-box container-flex">
                                <h6>01:30 pm</h6>
                              </div>
                              <div className="HomePage-left-top-side-content-location-box container-flex">
                                <h6>Anuradhapura New town</h6>
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

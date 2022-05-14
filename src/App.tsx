import React from 'react';
import logo from './logo.svg';
import { GlobeScene } from './GlobeScene';
import './App.css';
import brucePic from './IMG_9332.jpg';

function App() {
  return (
    <div className="App">
        <div className="picture-spacer"></div>
        <h1>
          Where is&nbsp;
          <span className="bruce-label">
            <div className="bruce-picture-container">
              <img className="bruce-picture" src={brucePic}>
              </img>
            </div>
            Bruce
          </span>?
        </h1>
        <div className="location-summary">
          <p className="location-blurb">
            <b>Today</b>, Bruce is in <span className="location-text" style={{backgroundColor: '#500000'}}>College Station, TX</span>
          </p>
          <p className="sub-location-blurb first">
            <b>Before</b>, Bruce was in <span className="location-text" style={{backgroundColor: '#EEBC1D'}}>San Jose, CA</span> until <span className="date-text">May 6, 2022</span>
          </p>
          <p className="sub-location-blurb">
            <b>After</b>, Bruce will be in <span className="location-text" style={{backgroundColor: '#B8405E'}}>Brenham, TX</span> on  <span className="date-text">May 20, 2022</span>
          </p>
        </div>
        <div className="globe">
          <GlobeScene />
        </div>
        <div className="picture-spacer shrink"></div>
    </div>
  );
}

export default App;

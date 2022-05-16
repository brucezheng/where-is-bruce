import React from 'react';
import LocationText from './LocationText';
import { GlobeScene } from './GlobeScene';
import { locations } from './Locations';
import './App.css';
import brucePic from './IMG_9332.jpg';

const App = () => {
  return (
    <div className="App">
        <div className="picture-spacer"></div>
        <h1 className="header">
          Where is&nbsp;
          <span className="bruce-label">
            <div className="bruce-picture-container">
              <img className="bruce-picture" src={brucePic} alt={'It\'s me!'}>
              </img>
            </div>
            Bruce
          </span>?
        </h1>
        <div className="location-summary">
          <p className="location-blurb">
            <b>Today: </b> Bruce is in <LocationText location={locations.get('college_station_tx')} />
          </p>
          <p className="sub-location-blurb first">
            <b>Before: </b>
            <span className="blurb-verbose">Bruce was in </span>
            <LocationText location={locations.get('san_jose_ca')} /> until <span className="date-text">May 6, 2022</span>
          </p>
          <p className="sub-location-blurb">
            <b>After: </b>
            <span className="blurb-verbose">Bruce will be in </span>
            <LocationText location={locations.get('brenham_tx')} /> on  <span className="date-text">May 20, 2022</span>
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

import React from 'react';
import LocationSummary from './LocationSummary';
import Biography from './Biography';
import QuestionHeader from './QuestionHeader';
import { GlobeScene } from './GlobeScene';
import { View, useLayoutStore } from './LayoutState';
import { locations } from './Locations';
import './App.css';

const App = () => {
  const view = useLayoutStore(state => state.view);
  return (
    <div className={'App' + (view === View.Main ? ' App-main' : '')}>
        <div className="picture-spacer"></div>
        <QuestionHeader />
        <LocationSummary
          presentLocation={locations.get('college_station_tx')}
          previousLocation={locations.get('san_jose_ca')}
          nextLocation={locations.get('brenham_tx')}
        />
        <div className="globe">
          <GlobeScene />
        </div>
        <Biography />
        <div className="picture-spacer shrink"></div>
    </div>
  );
}

export default App;

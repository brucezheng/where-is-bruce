import { useEffect, useState, useRef } from 'react';
import { Location, defaultLocation } from './Locations';
import { useLayoutStore, getLocationSummaryCollapsed } from './LayoutState';
import Accordion from './Accordion';
import useMeasure from 'react-use-measure';
import LocationText from './LocationText';
import './App.css';

interface LocationSummaryProps {
  presentLocation?: Location;
  previousLocation?: Location;
  nextLocation?: Location;
}

const LocationSummary = (props: LocationSummaryProps) => {
  const view = useLayoutStore(state => state.view);
  return (
    <Accordion id='location-accordion' collapsed={getLocationSummaryCollapsed(view)} className='location-summary-container'>
      <div className="collapsible-text">
        <p className="location-blurb">
          <b>Today: </b> Bruce is in <LocationText location={props.presentLocation ?? defaultLocation} />
        </p>
        {props.previousLocation &&
          <p className="sub-location-blurb first">
            <b>Before: </b>
            <span className="blurb-verbose">Bruce was in </span>
            <LocationText location={props.previousLocation} /> until <span className="date-text">May 6, 2022</span>
          </p>
        }
        {props.nextLocation &&
          <p className="sub-location-blurb">
            <b>After: </b>
            <span className="blurb-verbose">Bruce will be in </span>
            <LocationText location={props.nextLocation} /> on  <span className="date-text">May 20, 2022</span>
          </p>
        }
      </div>
    </Accordion>
  );
}

export default LocationSummary;
import { useEffect, useState, useRef } from 'react';
import { useLayoutStore, getLocationSummaryCollapsed } from './LayoutState';
import { getLocation } from './Locations';
import { Trip } from './Trips';
import Accordion from './Accordion';
import useMeasure from 'react-use-measure';
import LocationText from './LocationText';
import './App.css';

interface LocationSummaryProps {
  currentTrip: Trip;
  previousTrip: Trip;
  nextTrip: Trip;
}

const LocationSummary = (props: LocationSummaryProps) => {
  const view = useLayoutStore(state => state.view);
  return (
    <Accordion id='location-accordion' collapsed={getLocationSummaryCollapsed(view)} className='location-summary-container'>
      <div className="collapsible-text">
        <p className="location-blurb">
          <b>Today: </b> Bruce is in <LocationText location={getLocation(props.currentTrip.locationId)} />
        </p>
        <p className="sub-location-blurb first">
          <b>Before: </b>
          <span className="blurb-verbose">Bruce was in </span>
          <LocationText location={getLocation(props.previousTrip.locationId)} /> until <span className="date-text">{props.previousTrip.tripEnd}</span>
        </p>
        <p className="sub-location-blurb">
          <b>After: </b>
          <span className="blurb-verbose">Bruce will be in </span>
          <LocationText location={getLocation(props.nextTrip.locationId)} /> on  <span className="date-text">{props.nextTrip.tripStart}</span>
        </p>
      </div>
    </Accordion>
  );
}

export default LocationSummary;
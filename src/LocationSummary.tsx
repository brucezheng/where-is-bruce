import { useEffect, useState, useRef } from 'react';
import { useLayoutStore, getLocationSummaryCollapsed } from './LayoutState';
import { getLocation } from './Locations';
import { defaultTrip, Trip, tripEquals } from './Trips';
import Accordion from './Accordion';
import useMeasure from 'react-use-measure';
import LocationText from './LocationText';
import './App.css';
import { usePinLocationStore } from './State';

interface LocationSummaryProps {
  currentTrip: Trip;
  previousTrip: Trip;
  nextTrip: Trip;
}

const LocationSummary = ({previousTrip, currentTrip, nextTrip}: LocationSummaryProps) => {
  const view = useLayoutStore(state => state.view);
  const setPinDefaultLocation = usePinLocationStore(state => state.setDefaultLocation);

  useEffect(() => setPinDefaultLocation(getLocation(currentTrip.locationId)), []);

  return (
    <Accordion id='location-accordion' collapsed={getLocationSummaryCollapsed(view)} className='location-summary-container'>
      <div className="collapsible-text">
        <p className="location-blurb">
          <b>Today: </b> Bruce is in <LocationText location={getLocation(currentTrip.locationId)} />
        </p>
        <p className="sub-location-blurb first">
          <b>Before: </b>
          <span className="blurb-verbose">Bruce was in </span>
          <LocationText location={getLocation(previousTrip.locationId)} /> until <span className="date-text">{previousTrip.tripEnd}</span>
        </p>
        {!tripEquals(defaultTrip, nextTrip) && <p className="sub-location-blurb">
          <b>After: </b>
          <span className="blurb-verbose">Bruce will be in </span>
          <LocationText location={getLocation(nextTrip.locationId)} /> on  <span className="date-text">{nextTrip.tripStart}</span>
        </p>}
      </div>
    </Accordion>
  );
}

export default LocationSummary;
import LatLng from './LatLng';

export interface Location {
  displayName: string,
  latLng: LatLng,
  color: string,
}

const collegeStationLocation: Location = {
    displayName: 'College Station, TX',
    latLng: { lat: 30.6280, lng: -96.3344 },
    color: '#500000',
};

export const defaultLocation = collegeStationLocation;

export const locations: Map<string,Location> = new Map([
	['college_station_tx', collegeStationLocation],
  [
    'brenham_tx', 
    {
      displayName: 'Brenham, TX',
      latLng: { lat: 30.1669, lng: -96.3977 },
      color: '#B8405E',
    },
  ],
  [
    'san_jose_ca', 
    {
      displayName: 'San Jose, CA',
      latLng: { lat: 37.3382, lng: -121.8863 },
      color: '#205375',
    },
  ],
  [
    'barcelona', 
    {
      displayName: 'Barcelona, Spain',
      latLng: { lat: 41.390205, lng: 2.154007 },
      color: '#FCB507',
    },
  ],
]);
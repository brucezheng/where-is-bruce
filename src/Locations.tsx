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
    'huntsville_tx', 
    {
      displayName: 'Huntsville, TX',
      latLng: { lat: 30.7235, lng: -95.5508 },
      color: '#B05638',
    },
  ],
  [
    'palestine_tx', 
    {
      displayName: 'Palestine, TX',
      latLng: { lat: 31.7621, lng: -95.6308 },
      color: '#C43733',
    },
  ],
  [
    'san_antonio_tx', 
    {
      displayName: 'San Antonio, TX',
      latLng: { lat: 29.4252, lng: -98.4946 },
      color: '#784B80',
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

export const getLocation = (locationId: string): Location => {
  return locations.get(locationId) ?? defaultLocation;
} 
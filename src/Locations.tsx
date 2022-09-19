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
    'austin_tx', 
    {
      displayName: 'Austin, TX',
      latLng: { lat: 30.2672, lng: -97.7431 },
      color: '#BF5700',
    },
  ],
  [
    'dallas_tx', 
    {
      displayName: 'Dallas, TX',
      latLng: { lat: 32.7767, lng: -96.7970 },
      color: '#003594',
    },
  ],
  [
    'brenham_tx', 
    {
      displayName: 'Brenham, TX',
      latLng: { lat: 30.1669, lng: -96.3977 },
      color: '#B8405E',
    },
  ],
  [
    'tomball_tx', 
    {
      displayName: 'Tomball, TX',
      latLng: { lat: 30.0972, lng: -95.6161 },
      color: '#CB4543',
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
    'rosebud_tx', 
    {
      displayName: 'Rosebud, TX',
      latLng: { lat: 31.0730, lng: -96.9786 },
      color: '#F33A6A',
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
  [
    'raton_nm', 
    {
      displayName: 'Raton, NM',
      latLng: { lat: 36.9034, lng: -104.4392 },
      color: '#FA3E35',
    },
  ],
  [
    'denver_co', 
    {
      displayName: 'Denver, CO',
      latLng: { lat: 39.7392, lng: -104.9903 },
      color: '#E3BF02',
    },
  ],
  [
    'grand_junction_co', 
    {
      displayName: 'Grand Junction, CO',
      latLng: { lat: 39.0639, lng: -108.5506 },
      color: '#83B639',
    },
  ],
  [
    'arches_ut', 
    {
      displayName: 'Arches National Park, UT',
      latLng: { lat: 38.7331, lng: -109.5925 },
      color: '#B8593C',
    },
  ],
  [
    'salt_lake_city_ut', 
    {
      displayName: 'Salt Lake City, UT',
      latLng: { lat: 40.7608, lng: -111.8910 },
      color: '#008EC8',
    },
  ],
  [
    'yellowstone_wy', 
    {
      displayName: 'Yellowstone National Park, WY',
      latLng: { lat: 44.4280, lng: -110.5885 },
      color: '#D84602',
    },
  ],
  [
    'missoula_mt', 
    {
      displayName: 'Missoula, MT',
      latLng: { lat: 46.8721, lng: -113.9940 },
      color: '#37407D',
    },
  ],
  [
    'yakima_wa', 
    {
      displayName: 'Yakima, WA',
      latLng: { lat: 46.6021, lng: -120.5059 },
      color: '#B0A8B9',
    },
  ],
  [
    'seattle_wa', 
    {
      displayName: 'Seattle, WA',
      latLng: { lat: 47.6062, lng: -122.3321 },
      color: '#4B2E83',
    },
  ],
  [
    'mt_rainier_wa', 
    {
      displayName: 'Mount Rainier National Park, WA',
      latLng: { lat: 46.8800, lng: -121.7269 },
      color: '#00513D',
    },
  ],
  [
    'portland_or', 
    {
      displayName: 'Portland, OR',
      latLng: { lat: 45.5152, lng: -122.6784 },
      color: '#056636',
    },
  ],
]);

export const getLocation = (locationId: string): Location => {
  return locations.get(locationId) ?? defaultLocation;
} 
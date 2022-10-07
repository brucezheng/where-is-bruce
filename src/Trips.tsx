import { locations } from './Locations';

export interface Trip {
  locationId: string,
  tripStart: string,
  tripEnd: string,
}

export const trips: Array<Trip> = [
  {
    locationId: 'san_jose_ca',
    tripStart: 'May 2, 2022',
    tripEnd: 'May 6, 2022',
  },
  {
    locationId: 'college_station_tx',
    tripStart: 'May 7, 2022',
    tripEnd: 'May 19, 2022',
  },
  {
    locationId: 'brenham_tx',
    tripStart: 'May 20, 2022',
    tripEnd: 'May 26, 2022',
  },
  {
    locationId: 'huntsville_tx',
    tripStart: 'May 27, 2022',
    tripEnd: 'May 30, 2022',
  },
  {
    locationId: 'palestine_tx',
    tripStart: 'May 31, 2022',
    tripEnd: 'June 9, 2022',
  },
  {
    locationId: 'san_antonio_tx',
    tripStart: 'June 10, 2022',
    tripEnd: 'June 17, 2022',
  },
  {
    locationId: 'college_station_tx',
    tripStart: 'June 18, 2022',
    tripEnd: 'June 24, 2022',
  },
  {
    locationId: 'san_antonio_tx',
    tripStart: 'June 25, 2022',
    tripEnd: 'July 1, 2022',
  },
  {
    locationId: 'huntsville_tx',
    tripStart: 'July 2, 2022',
    tripEnd: 'July 13, 2022',
  },
  {
    locationId: 'college_station_tx',
    tripStart: 'July 14, 2022',
    tripEnd: 'July 17, 2022',
  },
  {
    locationId: 'newton_tx',
    tripStart: 'July 17, 2022',
    tripEnd: 'August 6, 2022',
  },
  {
    locationId: 'college_station_tx',
    tripStart: 'August 7, 2022',
    tripEnd: 'August 18, 2022',
  },
  {
    locationId: 'tomball_tx',
    tripStart: 'August 19, 2022',
    tripEnd: 'August 20, 2022',
  },
  {
    locationId: 'college_station_tx',
    tripStart: 'August 21, 2022',
    tripEnd: 'September 1, 2022',
  },
  {
    locationId: 'austin_tx',
    tripStart: 'September 2, 2022',
    tripEnd: 'September 2, 2022',
  },
  {
    locationId: 'dallas_tx',
    tripStart: 'September 3, 2022',
    tripEnd: 'September 3, 2022',
  },
  {
    locationId: 'raton_nm',
    tripStart: 'September 4, 2022',
    tripEnd: 'September 4, 2022',
  },
  {
    locationId: 'denver_co',
    tripStart: 'September 5, 2022',
    tripEnd: 'September 8, 2022',
  },
  {
    locationId: 'grand_junction_co',
    tripStart: 'September 9, 2022',
    tripEnd: 'September 9, 2022',
  },
  {
    locationId: 'arches_ut',
    tripStart: 'September 10, 2022',
    tripEnd: 'September 10, 2022',
  },
  {
    locationId: 'salt_lake_city_ut',
    tripStart: 'September 11, 2022',
    tripEnd: 'September 15, 2022',
  },
  {
    locationId: 'yellowstone_wy',
    tripStart: 'September 16, 2022',
    tripEnd: 'September 17, 2022',
  },
  {
    locationId: 'missoula_mt',
    tripStart: 'September 18, 2022',
    tripEnd: 'September 22, 2022',
  },
  {
    locationId: 'yakima_wa',
    tripStart: 'September 23, 2022',
    tripEnd: 'September 23, 2022',
  },
  {
    locationId: 'mt_rainier_wa',
    tripStart: 'September 24, 2022',
    tripEnd: 'September 24, 2022',
  },
  {
    locationId: 'seattle_wa',
    tripStart: 'September 25, 2022',
    tripEnd: 'September 25, 2022',
  },
  {
    locationId: 'portland_or',
    tripStart: 'September 26, 2022',
    tripEnd: 'September 29, 2022',
  },
  {
    locationId: 'seattle_wa',
    tripStart: 'September 30, 2022',
    tripEnd: 'September 30, 2022',
  },
  {
    locationId: 'austin_tx',
    tripStart: 'October 1, 2022',
    tripEnd: 'October 3, 2022',
  },
  {
    locationId: 'college_station_tx',
    tripStart: 'October 4, 2022',
    tripEnd: 'October 5, 2022',
  },
  {
    locationId: 'dallas_tx',
    tripStart: 'October 6, 2022',
    tripEnd: 'October 6, 2022',
  },
  {
    locationId: 'rosebud_tx',
    tripStart: 'October 7, 2022',
    tripEnd: 'October 8, 2022',
  },
  {
    locationId: 'portland_or',
    tripStart: 'October 9, 2022',
    tripEnd: 'October 14, 2022',
  },
  {
    locationId: 'college_station_tx',
    tripStart: 'October 15, 2022',
    tripEnd: 'October 16, 2022',
  },
  {
    locationId: 'washington_dc',
    tripStart: 'October 17, 2022',
    tripEnd: 'October 24, 2022',
  },
];

export const defaultTrip: Trip = {
  locationId: 'san_jose_ca',
  tripStart: 'May 2, 2022',
  tripEnd: 'May 6, 2022',
};

const currentDate = new Date();
currentDate.setHours(0,0,0,0);

export const currentTrip: Trip =
  trips
    .find(
      trip => currentDate >= new Date(trip.tripStart)
        && new Date(trip.tripEnd) >= currentDate)
    ?? defaultTrip;
const getNextTrip = () => {
  const filteredTrips = trips
    .filter(trip => new Date(trip.tripStart) > currentDate);
  return (filteredTrips.length ?
    filteredTrips.reduce((a, b) => new Date(a.tripStart) < new Date(b. tripStart) ? a : b) :
    defaultTrip);
}
export const nextTrip = getNextTrip();
export const previousTrip: Trip =
  trips
    .filter(trip => new Date(trip.tripEnd) < currentDate)
    .reduce((a, b) => new Date(a.tripStart) > new Date(b. tripStart) ? a : b, defaultTrip);

export function tripEquals(tripA: Trip, tripB: Trip): boolean {
  console.log(tripA, tripB);
  return JSON.stringify(tripA) === JSON.stringify(tripB);
}
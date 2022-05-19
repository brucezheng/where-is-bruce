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
    tripEnd: 'August 31, 2022',
  },
];

const defaultTrip: Trip = {
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
export const nextTrip: Trip =
  trips
    .filter(trip => new Date(trip.tripStart) > currentDate)
    .reduce((a, b) => new Date(a.tripStart) < new Date(b. tripStart) ? a : b)
    ?? defaultTrip;
export const previousTrip: Trip =
  trips
    .filter(trip => new Date(trip.tripEnd) < currentDate)
    .reduce((a, b) => new Date(a.tripStart) > new Date(b. tripStart) ? a : b)
    ?? defaultTrip;
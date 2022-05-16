import { Location, defaultLocation } from './Locations';
import { usePinActiveStore, usePinLocationStore } from './State';

interface LocationTextProps {
	location?: Location;
};

const LocationText = (props: LocationTextProps) => {
  const location: Location = props.location ?? defaultLocation;
  const setPinActive = usePinActiveStore(state => state.setActive);
  const setPinLocation = usePinLocationStore(state => state.setLocation);
  const resetPinLocation = usePinLocationStore(state => state.resetLocation);
  return (
    <span
      className="location-text"
      style={{ backgroundColor: location.color }}
      onMouseEnter={() => {
        setPinActive(true);
        setPinLocation(location);
      }}
      onMouseLeave={() => {
        setPinActive(false);
        resetPinLocation();
      }}>
      {location.displayName}
    </span>
  );
};

export default LocationText;
import { Location, defaultLocation } from './Locations';
import { useComputedGlobeRotateStore, usePinActiveStore, usePinLocationStore } from './State';

interface LocationTextProps {
	location?: Location;
};

const calculateShortestDistance = (angleA: number, angleB: number): number => {
  const modA = angleA % (2 * Math.PI);
  const modB = angleB % (2 * Math.PI);
  const diff = modA - modB;
  const diffPlus2PI = (diff + 2 * Math.PI) % (2 * Math.PI);
  return Math.abs(diff) > Math.abs(diffPlus2PI) ? diffPlus2PI : diff;
};

const LocationText = (props: LocationTextProps) => {
  const location: Location = props.location ?? defaultLocation;
  const currRotate = useComputedGlobeRotateStore(state => state.rotation);
  const currDisplacement = useComputedGlobeRotateStore(state => state.rotationDisplacement)
  const stopRotation = useComputedGlobeRotateStore(state => state.stopRotation);
  const resumeRotation = useComputedGlobeRotateStore(state => state.resumeRotation);
  const incrementDisplacement = useComputedGlobeRotateStore(state => state.incrementDisplacement);
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
        stopRotation();
        const locationTheta =
          (-1 * location.latLng.lng / 180 * Math.PI) - Math.PI / 2;
        const displacementChange =
          calculateShortestDistance(locationTheta, currRotate + currDisplacement);
        incrementDisplacement(displacementChange);
      }}
      onMouseLeave={() => {
        setPinActive(false);
        resetPinLocation();
        resumeRotation();
      }}>
      {location.displayName}
    </span>
  );
};

export default LocationText;
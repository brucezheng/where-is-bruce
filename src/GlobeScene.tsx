import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3, Euler, Quaternion } from 'three';
import { usePinActiveStore, usePinLocationStore, useGlobeRotateStore, usePinRotateStore} from './State';
import { useTexture } from '@react-three/drei';
import { useSpring } from '@react-spring/three';
import { useRef } from 'react';
import colorImg from './2k_earth_alt.jpg';
import normalImg from './2k_earth_normal_map.jpg';

const GLOBE_RADIUS = 1;
const GLOBE_TILT = 0.175 * Math.PI;
const PRIMARY_MAP_PIN_DEFAULT_SCALE = 0.04;
const PRIMARY_MAP_PIN_MAXIMIZED_SCALE = 0.06;
const PRIMARY_MAP_PIN_HEIGHT_DIMENSION = 3;
const PRIMARY_MAP_PIN_WIDTH_DIMENSION = 1;
const PRIMARY_MAP_PIN_PADDING = 0.005;
const ROTATION_RPM = 2.5;
const PIN_ROTATION_RPM = 10;

interface MarkerPosition {
  position: Vector3;
  rotation: Euler;
}

const getMarkerPosition = (lat: number, lng: number, rotate: number, pinRotate: number, pinScale: number) : MarkerPosition => {
  const pinDistance = GLOBE_RADIUS + pinScale * PRIMARY_MAP_PIN_HEIGHT_DIMENSION / 2 + PRIMARY_MAP_PIN_PADDING;

  // Converting Lat/Lng into cartesian
  const theta = (lng / 180 * Math.PI) + rotate;
  const phi = (Math.PI / 2) - (lat / 180 * Math.PI);
  let posX = pinDistance * Math.cos(theta) * Math.sin(phi);
  let posY = pinDistance * Math.cos(phi);
  let posZ = -1 * pinDistance * Math.sin(theta) * Math.sin(phi);

  // Take into account the tilt of the globe
  const newPosY = posY * Math.cos(GLOBE_TILT) - posZ * Math.sin(GLOBE_TILT);
  const newPosZ = posZ * Math.cos(GLOBE_TILT) + posY * Math.sin(GLOBE_TILT);
  posY = newPosY;
  posZ = newPosZ;
  const position = new Vector3(posX, posY, posZ);
  const rotatePinQuaternion =
    new Quaternion()
      .setFromAxisAngle(
        new Vector3(0,0,1).cross(new Vector3(posX, 0, posZ)).normalize(),
        new Vector3(0, 0, 1).angleTo(new Vector3(posX, 0, posZ)))
      .premultiply(
        new Quaternion().setFromAxisAngle(new Vector3(0,1,0), pinRotate));
  const pointPinAtGlobeQuaternion =
    new Quaternion().setFromAxisAngle(
      new Vector3().crossVectors(
        position, new Vector3(0, 1, 0))
        .normalize(),
      Math.PI - position.angleTo(new Vector3(0, 1, 0)));
  return {
    position,
    rotation: new Euler().setFromQuaternion(rotatePinQuaternion.premultiply(pointPinAtGlobeQuaternion)),
  };
};

const Sphere = () => {
  const sphere = useRef<any>();
  const [
    colorMap,
    normalMap,
  ] = useTexture([
    colorImg,
    normalImg,
  ]);

  const currRotate = useGlobeRotateStore(state => state.rotation);

  useFrame(() => {
    sphere.current!.rotation.y = currRotate;
  });

  return (
    <mesh rotation={[GLOBE_TILT, 0, 0]} ref={sphere}>
      <sphereBufferGeometry args={[GLOBE_RADIUS, 64, 64]} />
      <meshStandardMaterial 
          map={colorMap}
          normalMap={normalMap}
      />
    </mesh>
  );
};

const MapPin = () => {
  const mapPin = useRef<any>();

  const currGlobeRotate = useGlobeRotateStore(state => state.rotation);
  const currPinRotate = usePinRotateStore(state => state.rotation);
  const incrementPinRotate = usePinRotateStore(state => state.incrementRotate);
  const active = usePinActiveStore(state => state.active);
  const pinLatLng = usePinLocationStore(state => state.location.latLng);
  const pinColor = usePinLocationStore(state => state.location.color);
  const { pinScale, emissiveIntensity, springLat, springLng, springPinColor } =
    useSpring({
      pinScale: active ? PRIMARY_MAP_PIN_MAXIMIZED_SCALE : PRIMARY_MAP_PIN_DEFAULT_SCALE,
      emissiveIntensity: active ? 5 : 2,
      springLat: pinLatLng.lat,
      springLng: pinLatLng.lng,
      springPinColor: pinColor,
    });

  useFrame((state, delta) => {
    const rotationDelta = 2 * Math.PI * PIN_ROTATION_RPM * (delta / 60);
    incrementPinRotate(rotationDelta);
  });

  const initMarker =
    getMarkerPosition(springLat.get(), springLng.get(), currGlobeRotate, currPinRotate, pinScale.get());
  return (
    <mesh ref={mapPin} rotation={initMarker.rotation} position={initMarker.position}>
      <cylinderBufferGeometry
        args={
          [
            0,
            pinScale.get() * PRIMARY_MAP_PIN_WIDTH_DIMENSION,
            pinScale.get() * PRIMARY_MAP_PIN_HEIGHT_DIMENSION,
            3,
            1,
          ]
        }
      />
      <meshStandardMaterial
        color={springPinColor.get()}
        opacity={0.9}
        emissive={springPinColor.get()}
        emissiveIntensity={emissiveIntensity.get()}
      />
    </mesh>
  );
}

const GlobeWithPins = () => {
  const increment = useGlobeRotateStore(state => state.incrementRotate);

  useFrame((state, delta) => {
    const rotationDelta = 2 * Math.PI * ROTATION_RPM * (delta / 60);
    increment(rotationDelta);
  });

  return (<><Sphere /><MapPin /></>);
}

export const GlobeScene = () => {
  const setPinActive = usePinActiveStore(state => state.setActive);
  return (
    <Canvas
      camera={{
        near: 0.1,
        far: 1000,
        zoom: 3,
      }}
      onMouseEnter={() => {
        setPinActive(true);
      }}
      onMouseLeave={() => {
        setPinActive(false);
      }}>
      <pointLight color={0xffffff} intensity={1.5} position={[-2, 5, 8]} />
      <ambientLight color={0xffffff} intensity={0.8 } />
      <GlobeWithPins />
    </Canvas>
  );
};

import { Suspense, useRef, memo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
//import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useTexture } from "@react-three/drei"
import { Vector3, Euler, Quaternion } from 'three';
import colorImg from './2k_earth_alt.jpg';
import normalImg from './2k_earth_normal_map.jpg';
import create from 'zustand'

const GLOBE_RADIUS = 1;
const GLOBE_TILT = 0.175 * Math.PI;
const PRIMARY_MAP_PIN_SCALE = 0.04;
const PRIMARY_MAP_PIN_HEIGHT = PRIMARY_MAP_PIN_SCALE * 3;
const PRIMARY_MAP_PIN_WIDTH = PRIMARY_MAP_PIN_SCALE;
const PRIMARY_MAP_PIN_PADDING = 0.01;
const PRIMARY_MAP_PIN_DISTANCE = GLOBE_RADIUS + PRIMARY_MAP_PIN_HEIGHT/2 + PRIMARY_MAP_PIN_PADDING;
const ROTATION_RPM = 2.5;
const PIN_ROTATION_RPM = 10;

interface MarkerPosition {
  position: Vector3;
  rotation: Euler;
}

const getMarkerPosition = (lat: number, lng: number, rotate: number, pinRotate: number) : MarkerPosition => {
  // Converting Lat/Lng into cartesian
  const theta = (lng / 180 * Math.PI) + rotate;
  const phi = (Math.PI / 2) - (lat / 180 * Math.PI);
  let posX = PRIMARY_MAP_PIN_DISTANCE * Math.cos(theta) * Math.sin(phi);
  let posY = PRIMARY_MAP_PIN_DISTANCE * Math.cos(phi);
  let posZ = -1 * PRIMARY_MAP_PIN_DISTANCE * Math.sin(theta) * Math.sin(phi);

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

//const memoGetMarkerPosition = memo(getMarkerPosition);

interface RotationState {
  rotation: number;
  incrementRotate: (delta: number) => void;
}

const useStore = create<RotationState>(set => ({
  rotation: 0,
  incrementRotate: (delta) => set(state => ({ rotation: state.rotation + delta })),
}))

const usePinStore = create<RotationState>(set => ({
  rotation: 0,
  incrementRotate: (delta) => set(state => ({ rotation: state.rotation + delta })),
}))

const Sphere = () => {
  const sphere = useRef<any>();
  const [
    colorMap,
    normalMap,
  ] = useTexture([
    colorImg,
    normalImg,
  ]);

  const currRotate = useStore(state => state.rotation);

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

interface LatLng {
  lat: number;
  lng: number;
}

const MapPin = (props: LatLng) => {
  const mapPin = useRef<any>();

  const currGlobeRotate = useStore(state => state.rotation);
  const currPinRotate = usePinStore(state => state.rotation);
  const incrementPinRotate = usePinStore(state => state.incrementRotate);

  useFrame((state, delta) => {
    const rotationDelta = 2 * Math.PI * PIN_ROTATION_RPM * (delta / 60);
    incrementPinRotate(rotationDelta);
  });

  const initMarker = getMarkerPosition(props.lat, props.lng, currGlobeRotate, currPinRotate);
  return (
    <mesh ref={mapPin} rotation={initMarker.rotation} position={initMarker.position}>
      <cylinderBufferGeometry
        args={[0, PRIMARY_MAP_PIN_WIDTH, PRIMARY_MAP_PIN_HEIGHT, 4, 1]}
      />
      <meshStandardMaterial
        color={'rgb(80,0,0)'}
        opacity={0.9}
        emissive={'rgb(80,0,0)'}
        emissiveIntensity={2}
      />
    </mesh>
  );
}

const GlobeWithPins = () => {
  const increment = useStore(state => state.incrementRotate);
  const cStatLat = 30.6280;
  const cStatLng = -96.3344;

  useFrame((state, delta) => {
    const rotationDelta = 2 * Math.PI * ROTATION_RPM * (delta / 60);
    increment(rotationDelta);
  });

  return (<><Sphere /><MapPin lat={cStatLat} lng={cStatLng} /></>);
}

export const GlobeScene = () => {
  return (
    <Canvas
      camera={{
        near: 0.1,
        far: 1000,
        zoom: 3,
      }}>
      <pointLight color={0xffffff} intensity={1.5} position={[-2, 5, 8]} />
      <ambientLight color={0xffffff} intensity={0.8 } />
      <GlobeWithPins />
    </Canvas>
  );
};

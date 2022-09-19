import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3, Euler, Quaternion } from 'three';
import { usePinActiveStore, usePinLocationStore, useComputedGlobeRotateStore, useGlobeRotateStore, useGlobeTiltStore, usePinRotateStore} from './State';
import { useTexture } from '@react-three/drei';
import { useSpring } from '@react-spring/three';
import { useRef } from 'react';
import colorImg from './2k_earth_alt.jpg';
import normalImg from './2k_earth_normal_map.jpg';

const getRotationSpeed = (rpm: number) => 2 * Math.PI * rpm / 60;

const GLOBE_RADIUS = 1;
const DEFAULT_GLOBE_TILT = 0.175 * Math.PI;
const PRIMARY_MAP_PIN_DEFAULT_SCALE = 0.04;
const PRIMARY_MAP_PIN_MAXIMIZED_SCALE = 0.06;
const PRIMARY_MAP_PIN_HEIGHT_DIMENSION = 3;
const PRIMARY_MAP_PIN_WIDTH_DIMENSION = 1;
const PRIMARY_MAP_PIN_PADDING = 0.005;
const ROTATION_RPM = 5;
const PIN_ROTATION_RPM = 10;
const PIN_ACTIVE_ROTATION_RPM = 25;
const ROTATION_SPEED = getRotationSpeed(ROTATION_RPM);
const PIN_ROTATION_SPEED = getRotationSpeed(PIN_ROTATION_RPM);
const PIN_ACTIVE_ROTATION_SPEED = getRotationSpeed(PIN_ACTIVE_ROTATION_RPM);

interface MarkerPosition {
  position: Vector3;
  rotation: Euler;
}

const getMarkerPosition = (
  lat: number, 
  lng: number, 
  rotate: number, 
  tilt: number, 
  pinRotate: number, 
  pinScale: number
  ) : MarkerPosition => {
  const pinDistance = GLOBE_RADIUS + pinScale * PRIMARY_MAP_PIN_HEIGHT_DIMENSION / 2 + PRIMARY_MAP_PIN_PADDING;

  // Converting Lat/Lng into cartesian
  const theta = (lng / 180 * Math.PI) + rotate;
  const phi = (Math.PI / 2) - (lat / 180 * Math.PI);
  let posX = pinDistance * Math.cos(theta) * Math.sin(phi);
  let posY = pinDistance * Math.cos(phi);
  let posZ = -1 * pinDistance * Math.sin(theta) * Math.sin(phi);

  // Take into account the tilt of the globe
  const newPosY = posY * Math.cos(tilt) - posZ * Math.sin(tilt);
  const newPosZ = posZ * Math.cos(tilt) + posY * Math.sin(tilt);
  posY = newPosY;
  posZ = newPosZ;

  // Take all this into account to get pin location
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

  const setGlobeRotate = useGlobeRotateStore(state => state.setRotate);

  const baseRotate = useComputedGlobeRotateStore(state => state.rotation);
  const displacement = useComputedGlobeRotateStore(state => state.rotationDisplacement);
  const isRotating = useComputedGlobeRotateStore(state => state.isRotating);
  const increment = useComputedGlobeRotateStore(state => state.incrementRotate);
  const { springDisplacement } = useSpring({
    springDisplacement: displacement,
  });
  const { smoothRotateSpeed } = useSpring({
    smoothRotateSpeed: isRotating ? ROTATION_SPEED : 0,
    config: { mass: 2, tension: 80 },
  })

  useFrame((state, delta) => {
    // Set to 0 when not rotating so that we brake instantly
    const rotateSpeed = isRotating ? smoothRotateSpeed.get() : 0;
    const rotationDelta = rotateSpeed * delta;
    increment(rotationDelta);
    const globeRotate = baseRotate + springDisplacement.get();
    setGlobeRotate(globeRotate)
    sphere.current!.rotation.y = globeRotate;
  });

  return (
    <mesh rotation={[DEFAULT_GLOBE_TILT, 0, 0]} ref={sphere}>
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
      emissiveIntensity: active ? 3 : 1,
      springLat: pinLatLng.lat,
      springLng: pinLatLng.lng,
      springPinColor: pinColor,
    });

  useFrame((state, delta) => {
    const rotationDelta = (active ? PIN_ACTIVE_ROTATION_SPEED : PIN_ROTATION_SPEED) * delta;
    incrementPinRotate(rotationDelta);
  });

  const initMarker =
    getMarkerPosition(springLat.get(), springLng.get(), currGlobeRotate, DEFAULT_GLOBE_TILT, currPinRotate, pinScale.get());
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

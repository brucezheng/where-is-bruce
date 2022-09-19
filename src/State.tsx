import LatLng from './LatLng';
import { Location, defaultLocation } from './Locations';
import create from 'zustand';

export interface RotationState {
  rotation: number;
  incrementRotate: (delta: number) => void;
  setRotate: (theta: number) => void;
};

export interface ComputedRotationState extends RotationState {
  isRotating: boolean;
  rotationDisplacement: number;
  incrementDisplacement: (theta: number) => void;
  stopRotation: () => void;
  resumeRotation: () => void;
}

export interface ActiveState {
  active: boolean;
  setActive: (newActive: boolean) => void;
}

export interface LocationState {
  location: Location;
  setLocation: (newLocation: Location) => void;
  resetLocation: () => void;
};

export interface LatLngState {
  latLng: LatLng;
  setLatLng: (newLatLng: LatLng) => void;
};

export const usePinActiveStore = create<ActiveState>(set => ({
  active: false,
  setActive: (newActive) => set(state => ({ active: newActive })),
}));

export const usePinLocationStore = create<LocationState>(set => ({
  location: defaultLocation,
  setLocation: (newLocation) => set(state => ({ location: newLocation })), 
  resetLocation: () => set(state => ({ location: defaultLocation })),
}));

export const useComputedGlobeRotateStore = create<ComputedRotationState>(set => ({
  isRotating: true,
  rotation: 0,
  rotationDisplacement: 0,
  setRotate: (theta) => set(state => ({ rotation: theta })),
  incrementRotate: (delta) => set(state => ({
    rotation: state.rotation + delta,
  })),
  incrementDisplacement: (delta) => set(state => ({
    rotationDisplacement: state.rotationDisplacement + delta,
  })),
  stopRotation: () => set(state => ({
    isRotating: false,
  })),
  resumeRotation: () => set(state => ({
    isRotating: true,
  })),
}));

export const useGlobeRotateStore = create<RotationState>(set => ({
  rotation: 0,
  incrementRotate: (delta) => set(state => ({ rotation: state.rotation + delta })),
  setRotate: (theta) => set(state => ({ rotation: theta })),
}));

export const usePinRotateStore = create<RotationState>(set => ({
  rotation: 0,
  incrementRotate: (delta) => set(state => ({ rotation: state.rotation + delta })),
  setRotate: (theta) => set(state => ({ rotation: theta })),
}));

export const useGlobeTiltStore = create<RotationState>(set => ({
  rotation: 0,
  incrementRotate: (delta) => set(state => ({ rotation: state.rotation + delta })),
  setRotate: (theta) => set(state => ({ rotation: theta })),
}));

import LatLng from './LatLng';
import { Location, defaultLocation } from './Locations';
import create from 'zustand';

export interface RotationState {
  rotation: number;
  incrementRotate: (delta: number) => void;
};

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

export const useGlobeRotateStore = create<RotationState>(set => ({
  rotation: 0,
  incrementRotate: (delta) => set(state => ({ rotation: state.rotation + delta })),
}));

export const usePinRotateStore = create<RotationState>(set => ({
  rotation: 0,
  incrementRotate: (delta) => set(state => ({ rotation: state.rotation + delta })),
}));

import create from 'zustand';

export enum View {
  Main = 1,
  Biography
}

export interface LayoutState {
  view: View;
  setView: (newView: View) => void;
}

export const useLayoutStore = create<LayoutState>(set => ({
  view: View.Main,
  setView: (newView) => set(state => ({ view: newView })),
}));

export const getLocationSummaryCollapsed = (view: View): boolean => {
  return view !== View.Main;
}

export const getBiographyCollapsed = (view: View): boolean => {
  return view !== View.Biography;
}
import { type LayoutRectangle } from 'react-native';

export type Position = 'bottom' | 'left' | 'right' | 'top';

export type VisibilitySensorChange = {
  direction: Position;
  location: LayoutRectangle;
  visible: boolean;
};

export type MeasurementProps = {
  height: number;
  pageX: number;
  pageY: number;
  width: number;
  x: number;
  y: number;
};

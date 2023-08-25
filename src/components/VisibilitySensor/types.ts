import { type LayoutRectangle } from 'react-native';

export type Position = 'bottom' | 'left' | 'right' | 'top';

export type VisibilitySensorChange = {
  direction: Position;
  location: LayoutRectangle;
  visible: boolean;
};

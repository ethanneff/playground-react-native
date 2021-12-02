export type ColorChoice =
  | 'slateblue'
  | 'orange'
  | 'mediumseagreen'
  | 'violet'
  | 'lightgrey';

export type TrackPosition = { size: number; x: number; y: number };

export type TrackPositionWithColor = TrackPosition & { color: ColorChoice };

export type CanvasDimensions = {
  height: number;
  width: number;
  x: number;
  y: number;
};

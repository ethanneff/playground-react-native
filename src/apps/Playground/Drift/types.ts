export type ColorChoice =
  | 'slateblue'
  | 'orange'
  | 'mediumseagreen'
  | 'violet'
  | 'lightgrey';

export type TrackPosition = {x: number; y: number; size: number};

export type TrackPositionWithColor = TrackPosition & {color: ColorChoice};

export type CanvasDimensions = {
  x: number;
  y: number;
  width: number;
  height: number;
};

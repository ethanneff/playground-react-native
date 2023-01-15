export type ColorChoice =
  | 'lightgrey'
  | 'mediumseagreen'
  | 'orange'
  | 'slateblue'
  | 'violet';

export type TrackPosition = {
  size: number;
  x: number;
  y: number;
};

export type TrackPositionWithColor = TrackPosition & { color: ColorChoice };

export type CanvasDimensions = {
  height: number;
  width: number;
  x: number;
  y: number;
};

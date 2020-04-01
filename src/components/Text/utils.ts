import {Theme} from '../../utils';

export type FontType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'overline';

export type FontEmphasis = 'high' | 'medium' | 'low';

export const getFontType = (type?: FontType) =>
  type === 'h1'
    ? Theme.fontSize.h1
    : type === 'h2'
    ? Theme.fontSize.h2
    : type === 'h3'
    ? Theme.fontSize.h3
    : type === 'h4'
    ? Theme.fontSize.h4
    : type === 'h5'
    ? Theme.fontSize.h5
    : type === 'h6'
    ? Theme.fontSize.h6
    : type === 'subtitle1'
    ? Theme.fontSize.subtitle1
    : type === 'subtitle2'
    ? Theme.fontSize.subtitle2
    : type === 'body1'
    ? Theme.fontSize.body1
    : type === 'body2'
    ? Theme.fontSize.body2
    : type === 'button'
    ? Theme.fontSize.button
    : type === 'caption'
    ? Theme.fontSize.caption
    : type === 'overline'
    ? Theme.fontSize.overline
    : Theme.fontSize.body2;

export const getTextEmphasis = (emphasis?: FontEmphasis) =>
  emphasis === 'high'
    ? 0.87
    : emphasis === 'medium'
    ? 0.6
    : emphasis === 'low'
    ? 0.38
    : 1.0;

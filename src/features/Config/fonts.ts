/*
SIZING https://material.io/design/typography/the-type-system.html#applying-the-type-scale
*/
import { type FontEmphases, type FontSizes, type FontWeight } from './types';

export const fontWeight: Record<string, FontWeight> = {
  light: '100',
  medium: '500',
  regular: '300',
};

export const fontEmphases: FontEmphases = {
  default: 1.0,
  high: 0.87,
  low: 0.38,
  medium: 0.6,
};

export const fontSizes: FontSizes = {
  body1: {
    fontSize: 16,
    fontWeight: fontWeight.regular,
    letterSpacing: 0.5,
  },
  body2: {
    fontSize: 14,
    fontWeight: fontWeight.regular,
    letterSpacing: 0.25,
  },
  button: {
    fontSize: 14,
    fontWeight: fontWeight.medium,
    letterSpacing: 0.75,
  },
  caption: {
    fontSize: 12,
    fontWeight: fontWeight.regular,
    letterSpacing: 0.4,
  },
  h1: {
    fontSize: 96,
    fontWeight: fontWeight.light,
    letterSpacing: -1.5,
  },
  h2: {
    fontSize: 60,
    fontWeight: fontWeight.light,
    letterSpacing: -0.5,
  },
  h3: {
    fontSize: 48,
    fontWeight: fontWeight.regular,
    letterSpacing: 0,
  },
  h4: {
    fontSize: 34,
    fontWeight: fontWeight.regular,
    letterSpacing: 0.25,
  },
  h5: {
    fontSize: 24,
    fontWeight: fontWeight.regular,
    letterSpacing: 0,
  },
  h6: {
    fontSize: 20,
    fontWeight: fontWeight.regular,
    letterSpacing: 0.15,
  },
  overline: {
    fontSize: 10,
    fontWeight: fontWeight.regular,
    letterSpacing: 1.5,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: fontWeight.regular,
    letterSpacing: 0.15,
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: fontWeight.medium,
    letterSpacing: 0.1,
  },
};

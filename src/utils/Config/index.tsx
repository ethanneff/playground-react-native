import {Color} from '../../models';

/*
SIZING https://material.io/design/typography/the-type-system.html#applying-the-type-scale
*/

// TODO: rename to Config to differentiate from Redux Theme
// TODO: make paddinga function

const padding = (value: number): number => value * 4;

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
export type FontEmphasis = 'high' | 'medium' | 'low' | 'none';
type FontWeight = '100' | '300' | '600';
type FontSize = {
  fontSize: number;
  fontWeight: FontWeight;
  letterSpacing: number;
};
type FontSizes = {[key in FontType]: FontSize};
type FontEmphases = {[key in FontEmphasis]: number};

const fontWeight: {[key: string]: FontWeight} = {
  light: '100',
  medium: '600',
  regular: '300',
};

const fontEmphases: FontEmphases = {
  high: 0.87,
  medium: 0.6,
  low: 0.38,
  none: 1.0,
};
const fontSizes: FontSizes = {
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
    fontWeight: fontWeight.medium,
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

const sizing = {
  borderRadius: padding(2),
};

export const Config = {
  fontSizes,
  fontEmphases,
  fontWeight,
  padding,
  sizing,
};

export const colorWithOpacity = (colorCode: string, opacity = 0.5): string => {
  const boundedOpacity = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity;
  const leading = 4;
  if (!colorCode.startsWith('hsl')) return colorCode;

  const substr = colorCode.substring(leading, colorCode.length - 1);
  return `hsla(${substr}, ${boundedOpacity})`;
};

export const getDisabledColor = (colorCode: string): string =>
  colorWithOpacity(colorCode, 0.38);

type GetFontStylesProps = {
  emphasis?: FontEmphasis;
  color?: keyof Color;
  type?: FontType;
  inverse?: boolean;
  colorScheme: Color;
};

type GetFontStylesReturn = {
  textColor: string;
  fontSize: {fontSize: number};
};

export const getFontStyles = ({
  emphasis = 'none',
  type = 'body1',
  inverse = false,
  color = 'text',
  colorScheme,
}: GetFontStylesProps): GetFontStylesReturn => {
  const textColorPercent = Config.fontEmphases[emphasis];
  const fontSize = Config.fontSizes[type];
  const textColor = inverse
    ? colorScheme.background
    : color
    ? colorScheme[color]
    : colorScheme.text;
  const textColorWithOpacity = colorWithOpacity(textColor, textColorPercent);
  return {textColor: textColorWithOpacity, fontSize};
};

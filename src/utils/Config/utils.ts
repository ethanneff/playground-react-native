import {ColorTheme} from './../../models/Theme/index';
import {fontEmphases, fontSizes} from './fonts';
import {FontEmphasis, FontType} from './types';

export const padding = (value: number): number => value * 4;

export const colorWithOpacity = (colorCode: string, opacity = 0.5): string => {
  const boundedOpacity = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity;
  const leading = 4;
  if (!colorCode || !colorCode.startsWith('hsl')) return colorCode;

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
  colorScheme: ColorTheme;
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
  const textColorPercent = fontEmphases[emphasis];
  const fontSize = fontSizes[type];
  const textColor = inverse
    ? colorScheme.background
    : color
    ? colorScheme[color]
    : colorScheme.text;
  const textColorWithOpacity = colorWithOpacity(textColor, textColorPercent);
  return {textColor: textColorWithOpacity, fontSize};
};

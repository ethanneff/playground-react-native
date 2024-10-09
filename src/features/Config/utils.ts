import { fontEmphases, fontSizes } from './fonts';
import {
  type ColorTheme,
  type FontEmphasis,
  type FontType,
  type MonoMultiColor,
} from './types';

export const spacing = (value: number): number => value * 4;

export const colorWithOpacity = (colorCode: string, opacity = 0.5): string => {
  const boundedOpacity = opacity < 0 ? 0 : Math.min(opacity, 1);
  const leading = 4;
  if (!colorCode.startsWith('hsl')) return colorCode;
  const substr = colorCode.slice(leading, -1);
  return `hsla(${substr}, ${boundedOpacity})`;
};

type GetFontStylesProperties = {
  color?: keyof MonoMultiColor;
  colors: ColorTheme;
  emphasis?: FontEmphasis;
  inverse?: boolean;
  type?: FontType;
};

type GetFontStylesReturn = {
  fontSize: { fontSize: number };
  textColor: string;
};

export const getFontStyles = ({
  color = 'primaryA',
  colors,
  emphasis = 'default',
  inverse,
  type = 'body1',
}: GetFontStylesProperties): GetFontStylesReturn => {
  const textColorPercent = fontEmphases[emphasis];
  const fontSize = fontSizes[type];
  const textColor = inverse ? colors.text.primaryB : colors.text[color];
  const textColorWithOpacity = colorWithOpacity(textColor, textColorPercent);
  return { fontSize, textColor: textColorWithOpacity };
};

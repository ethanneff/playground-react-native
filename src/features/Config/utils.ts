import { fontEmphases, fontSizes } from './fonts';
import { ColorTheme, FontEmphasis, FontType, MonoMultiColor } from './types';

export const spacing = (value: number): number => value * 4;

export const colorWithOpacity = (colorCode: string, opacity = 0.5): string => {
  const boundedOpacity = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity;
  const leading = 4;
  if (!colorCode.startsWith('hsl')) return colorCode;
  const substr = colorCode.substring(leading, colorCode.length - 1);
  return `hsla(${substr}, ${boundedOpacity})`;
};

type GetFontStylesProps = {
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
  emphasis = 'default',
  type = 'body1',
  inverse,
  color = 'primaryA',
  colors,
}: GetFontStylesProps): GetFontStylesReturn => {
  const textColorPercent = fontEmphases[emphasis];
  const fontSize = fontSizes[type];
  const textColor = inverse ? colors.text.primaryB : colors.text[color];
  const textColorWithOpacity = colorWithOpacity(textColor, textColorPercent);
  return { fontSize, textColor: textColorWithOpacity };
};

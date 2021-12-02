import { fontEmphases, fontSizes } from './fonts';
import { ColorTheme, FontEmphasis, FontType, MonoMultiColor } from './types';

export const padding = (value: number): number => value * 4;

export const colorWithOpacity = (colorCode: string, opacity = 0.5): string => {
  const boundedOpacity = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity;
  const leading = 4;
  if (!colorCode || !colorCode.startsWith('hsl')) return colorCode;
  const substr = colorCode.substring(leading, colorCode.length - 1);
  return `hsla(${substr}, ${boundedOpacity})`;
};

type GetFontStylesProps = {
  color?: keyof MonoMultiColor;
  colorScheme: ColorTheme;
  emphasis?: FontEmphasis;
  inverse?: boolean;
  type?: FontType;
};

type GetFontStylesReturn = {
  fontSize: { fontSize: number };
  textColor: string;
};

export const getFontStyles = ({
  emphasis = 'none',
  type = 'body1',
  inverse,
  color = 'primaryA',
  colorScheme,
}: GetFontStylesProps): GetFontStylesReturn => {
  const textColorPercent = fontEmphases[emphasis];
  const fontSize = fontSizes[type];
  const textColor = inverse
    ? colorScheme.text.primaryB
    : color
    ? colorScheme.text[color]
    : colorScheme.text.primaryA;
  const textColorWithOpacity = colorWithOpacity(textColor, textColorPercent);
  return { textColor: textColorWithOpacity, fontSize };
};

import { type ColorTheme, type MonoMultiColor } from '../../features';

type GetColors = {
  clear?: boolean;
  color?: keyof MonoMultiColor;
  colors: ColorTheme;
  disabled?: boolean;
  hidden?: boolean;
};

export const getColor = ({
  clear,
  color,
  colors,
  disabled,
  hidden,
}: GetColors) =>
  hidden
    ? 'transparent'
    : disabled
      ? colors.text.disabled
      : clear
        ? colors.text.primaryB
        : color
          ? colors.text[color]
          : colors.text.secondary;

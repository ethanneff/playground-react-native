export type ColorTokens = {
  black: string;
  blue100: string;
  blue200: string;
  blue300: string;
  blue400: string;
  blue50: string;
  blue500: string;
  blue600: string;
  blue700: string;
  brown100: string;
  brown200: string;
  brown300: string;
  brown400: string;
  brown50: string;
  brown500: string;
  brown600: string;
  brown700: string;
  cobalt100: string;
  cobalt200: string;
  cobalt300: string;
  cobalt400: string;
  cobalt50: string;
  cobalt500: string;
  cobalt600: string;
  cobalt700: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray50: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
  green100: string;
  green200: string;
  green300: string;
  green400: string;
  green50: string;
  green500: string;
  green600: string;
  green700: string;
  orange100: string;
  orange200: string;
  orange300: string;
  orange400: string;
  orange50: string;
  orange500: string;
  orange600: string;
  orange700: string;
  platinum100: string;
  platinum200: string;
  platinum300: string;
  platinum400: string;
  platinum50: string;
  platinum500: string;
  platinum600: string;
  platinum700: string;
  platinum800: string;
  purple100: string;
  purple200: string;
  purple300: string;
  purple400: string;
  purple50: string;
  purple500: string;
  purple600: string;
  purple700: string;
  red100: string;
  red200: string;
  red300: string;
  red400: string;
  red50: string;
  red500: string;
  red600: string;
  red700: string;
  white: string;
  yellow100: string;
  yellow200: string;
  yellow300: string;
  yellow400: string;
  yellow50: string;
  yellow500: string;
  yellow600: string;
  yellow700: string;
};

type MonoChrome = {
  primaryA: string;
  primaryB: string;
  secondary: string;
  tertiary: string;
};

export type MultiColor = {
  accent: string;
  disabled: string;
  negative: string;
  positive: string;
  warning: string;
};

export type TagColor = {
  blue: string;
  brown: string;
  cobalt: string;
  gray: string;
  green: string;
  orange: string;
  platinum: string;
  purple: string;
  red: string;
  yellow: string;
};

export type MonoMultiColor = MonoChrome & MultiColor;

export type ColorTheme = {
  background: MonoMultiColor;
  border: MonoMultiColor;
  overlay: {
    dark: string;
    light: string;
  };
  statusBar: 'dark-content' | 'default' | 'light-content';
  tag: TagColor;
  text: MonoMultiColor;
};

export type FontType =
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2';

export type FontWeight = '100' | '300' | '500';

type FontSize = {
  fontSize: number;
  fontWeight: FontWeight;
  letterSpacing: number;
};

export type FontEmphasis = 'default' | 'high' | 'low' | 'medium';

export type FontSizes = { [key in FontType]: FontSize };

export type FontEmphases = { [key in FontEmphasis]: number };

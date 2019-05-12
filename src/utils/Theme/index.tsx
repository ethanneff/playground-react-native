const color = {
  background: "hsl(0, 100%, 100%)",
  brand: "hsl(264, 34%, 36%)",
  danger: "hsl(354, 70%, 54%)",
  dark: "hsl(210, 10%, 23%)",
  info: "hsl(188, 78%, 41%)",
  light: "hsl(210, 17%, 98%)",
  primary: "hsl(211, 100%, 50%)",
  secondary: "hsl(208, 7%, 46%)",
  success: "hsl(134, 61%, 41%)",
  text: "hsl(0, 0%, 0%)",
  warning: "hsl(45, 100%, 51%)"
};

const padding = {
  p00: 0,
  p01: 4,
  p02: 8,
  p03: 12,
  p04: 16,
  p05: 20,
  p06: 24,
  p07: 28,
  p08: 32,
  p09: 36,
  p10: 40,
  p11: 44,
  p12: 48,
  p13: 52,
  p14: 56,
  p15: 60,
  p16: 64,
  p17: 68,
  p18: 72,
  p19: 76,
  p20: 80
};

type FontWeight = "100" | "300" | "600";

const fontWeight: { [key: string]: FontWeight } = {
  light: "100",
  medium: "600",
  regular: "300"
};

// sizing: https://material.io/design/typography/the-type-system.html#applying-the-type-scale
const fontSize = {
  body1: {
    fontSize: 16,
    fontWeight: fontWeight.regular,
    letterSpacing: 0.5
  },
  body2: {
    fontSize: 14,
    fontWeight: fontWeight.regular,
    letterSpacing: 0.25
  },
  button: {
    fontSize: 14,
    fontWeight: fontWeight.medium,
    letterSpacing: 0.75
  },
  caption: {
    fontSize: 12,
    fontWeight: fontWeight.regular,
    letterSpacing: 0.4
  },
  h1: {
    fontSize: 96 / 2,
    fontWeight: fontWeight.light,
    letterSpacing: -1.5
  },
  h2: {
    fontSize: 60 / 2,
    fontWeight: fontWeight.light,
    letterSpacing: -0.5
  },
  h3: {
    fontSize: 48 / 2,
    fontWeight: fontWeight.regular,
    letterSpacing: 0
  },
  h4: {
    fontSize: 34 / 2,
    fontWeight: fontWeight.regular,
    letterSpacing: 0.25
  },
  h5: {
    fontSize: 24 / 2,
    fontWeight: fontWeight.regular,
    letterSpacing: 0
  },
  h6: {
    fontSize: 20 / 2,
    fontWeight: fontWeight.medium,
    letterSpacing: 0.15
  },
  overline: {
    fontSize: 10,
    fontWeight: fontWeight.regular,
    letterSpacing: 1.5
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: fontWeight.regular,
    letterSpacing: 0.15
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: fontWeight.medium,
    letterSpacing: 0.1
  }
};

export const Theme = {
  color,
  fontSize,
  fontWeight,
  padding
};

export const colorWithOpacity = (colorCode: string, opacity = 0.5) => {
  const boundedOpacity = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity;
  const leading = 4;
  if (!colorCode.startsWith("hsl")) {
    return colorCode;
  }
  const substr = colorCode.substring(leading, colorCode.length - 1);
  return `hsla(${substr}, ${boundedOpacity})`;
};

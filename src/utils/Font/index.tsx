export enum FontWeight {
  Light = "100",
  Regular = "300",
  Medium = "600"
}

// sizing: https://material.io/design/typography/the-type-system.html#applying-the-type-scale
export const FontSize = {
  h1: {
    fontSize: 96,
    letterSpacing: -1.5,
    fontWeight: FontWeight.Light
  },
  h2: {
    fontSize: 60,
    letterSpacing: -0.5,
    fontWeight: FontWeight.Light
  },
  h3: {
    fontSize: 48,
    letterSpacing: 0,
    fontWeight: FontWeight.Regular
  },
  h4: {
    fontSize: 34,
    letterSpacing: 0.25,
    fontWeight: FontWeight.Regular
  },
  h5: {
    fontSize: 24,
    letterSpacing: 0,
    fontWeight: FontWeight.Regular
  },
  h6: {
    fontSize: 20,
    letterSpacing: 0.15,
    fontWeight: FontWeight.Medium
  },
  subtitle1: {
    fontSize: 16,
    letterSpacing: 0.15,
    fontWeight: FontWeight.Regular
  },
  subtitle2: {
    fontSize: 14,
    letterSpacing: 0.1,
    fontWeight: FontWeight.Medium
  },
  body1: {
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: FontWeight.Regular
  },
  body2: {
    fontSize: 14,
    letterSpacing: 0.25,
    fontWeight: FontWeight.Regular
  },
  button: {
    fontSize: 14,
    letterSpacing: 0.75,
    fontWeight: FontWeight.Medium
  },
  caption: {
    fontSize: 12,
    letterSpacing: 0.4,
    fontWeight: FontWeight.Regular
  },
  overline: {
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: FontWeight.Regular
  }
};

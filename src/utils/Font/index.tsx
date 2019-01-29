export enum FontWeight {
  Light = "100",
  Regular = "300",
  Medium = "600"
}

// sizing: https://material.io/design/typography/the-type-system.html#applying-the-type-scale
export const FontSize = {
  body1: {
    fontSize: 16,
    fontWeight: FontWeight.Regular,
    letterSpacing: 0.5
  },
  body2: {
    fontSize: 14,
    fontWeight: FontWeight.Regular,
    letterSpacing: 0.25
  },
  button: {
    fontSize: 14,
    fontWeight: FontWeight.Medium,
    letterSpacing: 0.75
  },
  caption: {
    fontSize: 12,
    fontWeight: FontWeight.Regular,
    letterSpacing: 0.4
  },
  h1: {
    fontSize: 96,
    fontWeight: FontWeight.Light,
    letterSpacing: -1.5
  },
  h2: {
    fontSize: 60,
    fontWeight: FontWeight.Light,
    letterSpacing: -0.5
  },
  h3: {
    fontSize: 48,
    fontWeight: FontWeight.Regular,
    letterSpacing: 0
  },
  h4: {
    fontSize: 34,
    fontWeight: FontWeight.Regular,
    letterSpacing: 0.25
  },
  h5: {
    fontSize: 24,
    fontWeight: FontWeight.Regular,
    letterSpacing: 0
  },
  h6: {
    fontSize: 20,
    fontWeight: FontWeight.Medium,
    letterSpacing: 0.15
  },
  overline: {
    fontSize: 10,
    fontWeight: FontWeight.Regular,
    letterSpacing: 1.5
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: FontWeight.Regular,
    letterSpacing: 0.15
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: FontWeight.Medium,
    letterSpacing: 0.1
  }
};

export const Theme = {
  padding: {
    p0: 0,
    p1: 4,
    p2: 8,
    p3: 12,
    p4: 16,
    p5: 20,
    p6: 24,
    p7: 28,
    p8: 32,
    p9: 36,
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
  },
  color: {
    background: "hsl(0, 100%, 100%)",
    text: "hsl(0, 0%, 0%)",
    primary: "hsl(211, 100%, 50%)",
    secondary: "hsl(208, 7%, 46%)",
    success: "hsl(134, 61%, 41%)",
    brand: "hsl(264, 34%, 36%)",
    info: "hsl(188, 78%, 41%)",
    dark: "hsl(210, 10%, 23%)",
    light: "hsl(210, 17%, 98%)",
    warning: "hsl(45, 100%, 51%)",
    danger: "hsl(354, 70%, 54%)"
  }
};

export const colorWithOpacity = (color: string, opacity = 0.5) => {
  const boundedOpacity = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity;
  const leading = 4;
  if (!color.startsWith("hsl")) { return color; }
  const substr = color.substring(leading, color.length - 1);
  return `hsla(${substr}, ${boundedOpacity})`;
};

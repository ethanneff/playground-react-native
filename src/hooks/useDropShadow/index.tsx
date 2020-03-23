import { useColor } from '../useColor';

export const useDropShadow = (elevation: number) => {
  const color = useColor();
  const shadowOpacity = elevation * 0.036 + 0.12;
  const shadowRadius = elevation * 0.36 + 1.2;
  return {
    elevation,
    shadowColor: color.dark,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity,
    shadowRadius,
    zIndex: elevation,
  };
};

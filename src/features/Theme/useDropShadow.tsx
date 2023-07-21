type UseDropShadow = (
  elevation: number,
  height?: number,
) => {
  elevation: number;
  shadowColor: string;
  shadowOffset: {
    height: number;
    width: 0;
  };
  shadowOpacity: number;
  shadowRadius: number;
  zIndex: number;
};

export const useDropShadow =
  (): UseDropShadow =>
  (elevation = 10, height = 2) => {
    const shadowOpacity = elevation * 0.036 + 0.12;
    const shadowRadius = elevation * 0.36 + 1.2;
    return {
      elevation,
      shadowColor: 'black',
      shadowOffset: {
        height,
        width: 0,
      },
      shadowOpacity,
      shadowRadius,
      zIndex: elevation,
    };
  };

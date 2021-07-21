type UseDropShadow = (elevation: number) => {
  elevation: number;
  shadowColor: string;
  shadowOffset: {
    height: 2;
    width: 0;
  };
  shadowOpacity: number;
  shadowRadius: number;
  zIndex: number;
};

export const useDropShadow = (): UseDropShadow => {
  return (elevation = 10) => {
    const shadowOpacity = elevation * 0.036 + 0.12;
    const shadowRadius = elevation * 0.36 + 1.2;
    return {
      elevation,
      shadowColor: 'black',
      shadowOffset: {
        height: 2,
        width: 0,
      },
      shadowOpacity,
      shadowRadius,
      zIndex: elevation,
    };
  };
};

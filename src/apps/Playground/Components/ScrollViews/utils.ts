export const getSize = (size?: number, horizontal?: boolean) => {
  return horizontal ? { width: size ?? '100%' } : { height: size ?? '100%' };
};
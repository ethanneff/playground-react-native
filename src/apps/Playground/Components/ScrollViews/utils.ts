export const getSize = (size?: number, horizontal?: boolean) =>
  horizontal ? { width: size ?? '100%' } : { height: size ?? '100%' };

import { type RootMiddleware } from 'root-types';

export const addFlipperMiddleware = (middlewares: RootMiddleware[]) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const createDebugger = require('redux-flipper').default;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
  middlewares.push(createDebugger());
};

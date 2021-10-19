import { RootMiddleware } from 'root-types';

export const addFlipperMiddleware = (middlewares: RootMiddleware[]) => {
  if (__DEV__ && !process.env.JEST_WORKER_ID) {
    const createDebugger = require('redux-flipper').default;
    middlewares.push(createDebugger());
  }
};

import { Platform } from 'react-native';
import { type RootMiddleware } from 'root-types';

export const addFlipperMiddleware = (middlewares: RootMiddleware[]) => {
  if (Platform.OS === 'web' || process.env.JEST_WORKER_ID || !__DEV__) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const createDebugger = require('redux-flipper').default;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
  middlewares.push(createDebugger());
};

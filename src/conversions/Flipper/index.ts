import { Platform } from 'react-native';
import { type RootMiddleware } from 'root-types';

export const addFlipperMiddleware = (middlewares: RootMiddleware[]) => {
  if (Platform.OS === 'web' || process.env.JEST_WORKER_ID || !__DEV__) {
    return;
  }
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
};

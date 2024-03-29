import axios, { type AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useRef } from 'react';
import { type RootAction, type RootMiddleware } from 'root-types';
import { Storage } from '../conversions';

const refreshTimeout = 2000;
const timeout = 10_000;
const retryDefaultTimeout = 250;

type RootActionTypes = RootAction['type'] | 'sync/download';
type ReduxWhitelist = { [key in RootActionTypes]?: 1 };
const reduxWhiteList: ReduxWhitelist = {
  'complete/item/createItem': 1,
  'complete/item/updateItem': 1,
  'device/details': 1,
  'sync/download': 1,
};

type Queue = string[]; // TODO: better typing with {type, payload}
type SyncQueue = {
  cache: Queue;
  get: () => Promise<Queue>;
  key: '@syncQuery';
  set: (value: Queue) => Promise<Queue>;
};

const syncQueue: SyncQueue = {
  cache: [],
  get: async () => {
    try {
      const get = await Storage.getItem(syncQueue.key);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const parse = typeof get === 'string' ? JSON.parse(get) : [];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      syncQueue.cache = [...syncQueue.cache, ...parse];
      return syncQueue.cache;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      return [];
    }
  },
  key: '@syncQuery',
  set: async (value) => {
    try {
      const combined = [...syncQueue.cache, ...value];
      const stringify = JSON.stringify(combined);
      syncQueue.cache = combined;
      await Storage.setItem(syncQueue.key, stringify);
      return syncQueue.cache;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      return [];
    }
  },
};

export const syncMiddleware: RootMiddleware = () => (dispatch) => (action) => {
  if (reduxWhiteList[action.type]) syncQueue.set([action.type]);
  return dispatch(action);
};

export const useSync = (): void => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryTimeout = useRef(retryDefaultTimeout);

  const processSync = useCallback((data: string | undefined) => {
    throw new Error(data);
    // TODO: only update redux if data is different
  }, []);

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
  };

  const attemptSync = useCallback(async () => {
    const refresh = () => {
      clearTimer();
      retryTimeout.current = retryDefaultTimeout;
      timer.current = setTimeout(async () => {
        await attemptSync();
      }, refreshTimeout);
    };

    const exponentialRetry = () => {
      clearTimer();
      retryTimeout.current = Math.min(refreshTimeout, retryTimeout.current * 2);
      timer.current = setTimeout(async () => {
        await attemptSync();
      }, retryTimeout.current);
    };

    const queue = await syncQueue.get();
    if (queue.length === 0) {
      refresh();
      return;
    }

    try {
      const { length } = queue;
      const url = 'https://jsonplaceholder.typicode.com/posts';
      const method = 'POST';
      const payload: AxiosRequestConfig = { data: queue, method, timeout, url };
      const response = await axios(payload);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      processSync(response.data);
      queue.splice(0, length);
      await syncQueue.set(queue);
      refresh();
    } catch (error) {
      exponentialRetry();
      if (error instanceof Error) console.error(error.message);
    }
  }, [processSync]);

  const onLoad = useCallback(async () => {
    await syncQueue.set(['download']);
    attemptSync();
  }, [attemptSync]);

  useEffect(() => {
    onLoad();
    return () => {
      clearTimer();
    };
  }, [onLoad]);
};

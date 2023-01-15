import axios, { type AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useRef } from 'react';
import { type RootAction, type RootMiddleware } from 'root-types';
import { Storage } from '../conversions';
import { type SuperAny } from '../types/types';

const refreshTimeout = 2000;
const timeout = 10000;
const retryDefaultTimeout = 250;

type RootActionTypes = RootAction['type'] | 'sync/download';
type ReduxWhitelist = { [key in RootActionTypes]?: 1 };
const reduxWhiteList: ReduxWhitelist = {
  'complete/item/createItem': 1,
  'complete/item/updateItem': 1,
  'device/load': 1,
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
      const parse = get === null ? [] : JSON.parse(get ?? '');
      syncQueue.cache = [...syncQueue.cache, ...parse];
      return syncQueue.cache;
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
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
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
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

  const processSync = useCallback((data: SuperAny) => {
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
    if (!queue.length) {
      refresh();
      return;
    }

    try {
      const len = queue.length;
      const url = 'https://jsonplaceholder.typicode.com/posts';
      const method = 'POST';
      const payload: AxiosRequestConfig = { data: queue, method, timeout, url };
      const res = await axios(payload);
      processSync(res.data);
      queue.splice(0, len);
      await syncQueue.set(queue);
      refresh();
    } catch (e) {
      exponentialRetry();
      if (e instanceof Error) console.error(e.message);
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

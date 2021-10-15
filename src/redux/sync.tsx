import AsyncStorage from '@react-native-community/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useRef } from 'react';
import { RootAction, RootMiddleware } from 'root-types';

const enabled = false; // TODO: turn on
const refreshTimeout = 2000;
const timeout = 10000;
const retryDefaultTimeout = 250;

type RootActionTypes = RootAction['type'] | 'sync/download';
type ReduxWhitelist = { [key in RootActionTypes]?: 1 };
const reduxWhiteList: ReduxWhitelist = {
  'complete/item/createItem': 1,
  'complete/item/updateItem': 1,
  'sync/download': 1,
  'device/LOAD': 1,
};

const syncQueue: SyncQueue = {
  key: '@syncQuery',
  cache: [],
  set: async (value) => {
    try {
      const combined = [...syncQueue.cache, ...value];
      const stringify = JSON.stringify(combined);
      syncQueue.cache = combined;
      await AsyncStorage.setItem(syncQueue.key, stringify);
      return syncQueue.cache;
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      return [];
    }
  },
  get: async () => {
    try {
      const get = await AsyncStorage.getItem(syncQueue.key);
      const parse = get === null ? [] : JSON.parse(get);
      syncQueue.cache = [...syncQueue.cache, ...parse];
      return syncQueue.cache;
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      return [];
    }
  },
};

export const syncMiddleware: RootMiddleware = (_) => (dispatch) => (action) => {
  if (reduxWhiteList[action.type] && enabled) syncQueue.set([action.type]);
  return dispatch(action);
};

type Queue = string[]; // TODO: better typing with {type, payload}
type SyncQueue = {
  key: '@syncQuery';
  cache: Queue;
  set: (value: Queue) => Promise<Queue>;
  get: () => Promise<Queue>;
};

let retryTimeout = retryDefaultTimeout;
export const useSync = (): void => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const processSync = useCallback((data) => {
    console.log(data); // TODO: only update redux if data is different
  }, []);

  const clearTimer = () => timer.current && clearTimeout(timer.current);

  const attemptSync = useCallback(async () => {
    const refresh = () => {
      clearTimer();
      retryTimeout = retryDefaultTimeout;
      timer.current = setTimeout(() => attemptSync(), refreshTimeout);
    };

    const exponentialRetry = () => {
      clearTimer();
      retryTimeout = Math.min(refreshTimeout, retryTimeout * 2);
      timer.current = setTimeout(() => attemptSync(), retryTimeout);
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
      const payload: AxiosRequestConfig = { method, url, data: queue, timeout };
      const res = await axios(payload);
      processSync(res.data);
      queue.splice(0, len);
      await syncQueue.set(queue);
      refresh();
    } catch (e) {
      exponentialRetry();
      if (e instanceof Error) console.log(e.message);
    }
  }, [processSync]);

  const onLoad = useCallback(async () => {
    await syncQueue.set(['download']);
    attemptSync();
  }, [attemptSync]);

  useEffect(() => {
    if (enabled) onLoad();
    return () => {
      clearTimer();
    };
  }, [onLoad]);
};

import {
  type InitialState,
  type NavigationContainerRef,
  type NavigationState,
} from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Linking, Platform } from 'react-native';
import { Storage } from '../../conversions';
import { Analytics } from '../Analytics';

const persistanceKey = 'navigation';

type UsePersistedState = {
  initialState: InitialState | undefined;
  isReady: boolean;
  onReady: () => void;
  onRef: (
    ref: NavigationContainerRef<ReactNavigation.RootParamList> | null,
  ) => void;
  onStateChange: (state: NavigationState | undefined) => void;
};

export const usePersistedState = (): UsePersistedState => {
  const routeNameRef = useRef<string | null>(null);
  const navigationRef =
    useRef<NavigationContainerRef<ReactNavigation.RootParamList> | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState<NavigationState | undefined>(
    undefined,
  );

  const onStateChange = useCallback((state: NavigationState | undefined) => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName =
      navigationRef.current?.getCurrentRoute()?.name ?? null;

    if (previousRouteName !== currentRouteName && currentRouteName) {
      Analytics.trackScreen(currentRouteName);
    }

    routeNameRef.current = currentRouteName;
    Storage.setItem(persistanceKey, JSON.stringify(state));
  }, []);

  const onRef = (
    ref: NavigationContainerRef<ReactNavigation.RootParamList> | null,
  ) => {
    navigationRef.current = ref;
  };

  const onReady = () => {
    routeNameRef.current =
      navigationRef.current?.getCurrentRoute()?.name ?? null;
  };

  const restoreState = useCallback(async () => {
    try {
      const initialUrl = await Linking.getInitialURL();

      if (Platform.OS !== 'web' && initialUrl === null) {
        const savedStateString = await Storage.getItem(persistanceKey);
        const state = savedStateString
          ? (JSON.parse(savedStateString) as NavigationState)
          : undefined;

        if (state !== undefined) setInitialState(state);
      }
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (isReady) return;

    restoreState();
  }, [isReady, restoreState]);

  return { initialState, isReady, onReady, onRef, onStateChange };
};

import { useCallback, useEffect, useRef, useState } from 'react';
import { Linking, Platform } from 'react-native';
import {
  Storage,
  type NavigationContainerRef,
  type NavigationInitialState,
  type NavigationState,
} from '../../conversions';
import { Analytics } from '../Analytics';
import { Globals } from '../Config';

const persistanceKey = 'navigation';

type UsePersistedState = {
  initialState: NavigationInitialState | undefined;
  isReady: boolean;
  onReady: () => void;
  onRef: (
    ref: NavigationContainerRef<ReactNavigation.RootParamList> | null,
  ) => void;
  onStateChange: (state: NavigationState | undefined) => void;
};

const initialIsReady = Globals.environment === 'test';

export const usePersistedState = (): UsePersistedState => {
  const routeNameRef = useRef<string | null>(null);
  const navigationRef =
    useRef<NavigationContainerRef<ReactNavigation.RootParamList> | null>(null);
  const [isReady, setIsReady] = useState(initialIsReady);
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
        const state =
          typeof savedStateString === 'string'
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

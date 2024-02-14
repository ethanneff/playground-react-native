import { useCallback, useEffect, useRef, useState } from 'react';
import { Linking, Platform } from 'react-native';
import {
  Storage,
  type NavigationContainerRef as NavigationContainerReference,
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
    reference: NavigationContainerReference<ReactNavigation.RootParamList> | null,
  ) => void;
  onStateChange: (state: NavigationState | undefined) => void;
};

const initialIsReady = Globals.environment === 'test';

export const usePersistedState = (): UsePersistedState => {
  const routeNameReference = useRef<string | null>(null);
  const navigationReference =
    useRef<NavigationContainerReference<ReactNavigation.RootParamList> | null>(
      null,
    );
  const [isReady, setIsReady] = useState(initialIsReady);
  const [initialState, setInitialState] = useState<
    NavigationState | undefined
  >();

  const onStateChange = useCallback((state: NavigationState | undefined) => {
    const previousRouteName = routeNameReference.current;
    const currentRouteName =
      navigationReference.current?.getCurrentRoute()?.name ?? null;

    if (previousRouteName !== currentRouteName && currentRouteName) {
      Analytics.trackScreen(currentRouteName);
    }

    routeNameReference.current = currentRouteName;
    Storage.setItem(persistanceKey, JSON.stringify(state));
  }, []);

  const onReference = (
    reference: NavigationContainerReference<ReactNavigation.RootParamList> | null,
  ) => {
    navigationReference.current = reference;
  };

  const onReady = () => {
    routeNameReference.current =
      navigationReference.current?.getCurrentRoute()?.name ?? null;
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

  return { initialState, isReady, onReady, onRef: onReference, onStateChange };
};

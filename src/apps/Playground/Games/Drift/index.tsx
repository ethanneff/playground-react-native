import { useNavigation } from '@react-navigation/native';
import React, { memo, useMemo, useReducer } from 'react';
import DeviceInfo from 'react-native-device-info';
import { Screen, Text, View } from '../../../../components';
import { DriftContext, driftInitialState, driftReducer } from './Context';
import { Dpad } from './Dpad';
import { Game } from './Game';

export const Drift = memo(function PlaygroundDrift() {
  const { goBack } = useNavigation();
  const [state, dispatch] = useReducer(driftReducer, driftInitialState);
  const isEmulator = DeviceInfo.isEmulatorSync();
  const value = useMemo(() => ({ dispatch, state }), [state, dispatch]);

  return (
    <Screen
      border
      onLeftPress={goBack}
      title="Drift"
    >
      <DriftContext.Provider value={value}>
        {isEmulator ? (
          <Text
            center
            title="simulators not supported"
          />
        ) : (
          <View flex={1}>
            <Game />
            <Dpad />
          </View>
        )}
      </DriftContext.Provider>
    </Screen>
  );
});

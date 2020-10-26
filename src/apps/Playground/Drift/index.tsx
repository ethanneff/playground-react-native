import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useReducer} from 'react';
import {View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Screen, Text} from '../../../components';
import {DriftContext, driftInitialState, driftReducer} from './Context';
import {Dpad} from './Dpad';
import {Game} from './Game';

export const Drift = memo(function PlaygroundDrift() {
  const {goBack} = useNavigation();
  const [state, dispatch] = useReducer(driftReducer, driftInitialState);
  const isEmulator = DeviceInfo.isEmulatorSync();
  const navBack = useCallback(() => goBack(), [goBack]);

  // TODO: figure out why Screen re-renders (because of useReducer.state)
  return (
    <Screen border onLeftPress={navBack} title="Drift">
      <DriftContext.Provider value={{state, dispatch}}>
        {isEmulator ? (
          <Text center title="simulators not supported" />
        ) : (
          <View style={{flex: 1}}>
            <Game />
            <Dpad />
          </View>
        )}
      </DriftContext.Provider>
    </Screen>
  );
});

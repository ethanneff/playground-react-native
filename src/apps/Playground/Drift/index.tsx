import DeviceInfo from 'react-native-device-info';
import React, {memo, useCallback, useReducer} from 'react';
import {View} from 'react-native';
import {Screen, Text} from '../../../components';
import {useNav} from '../../../hooks';
import {Game} from './Game';
import {DriftContext, driftInitialState, driftReducer} from './Context';
import {Dpad} from './Dpad';

export default memo(function PlaygroundDrift() {
  const nav = useNav();
  const [state, dispatch] = useReducer(driftReducer, driftInitialState);
  const isEmulator = DeviceInfo.isEmulatorSync();
  const navBack = useCallback(nav('playground'), [nav]);

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

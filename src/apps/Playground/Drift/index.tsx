import DeviceInfo from 'react-native-device-info';
import React, {memo, useReducer} from 'react';
import {Screen, Text} from '../../../components';
import {useNav} from '../../../hooks';
import {Game} from './Game';
import {DriftContext, driftInitialState, driftReducer} from './Context';

export default memo(function PlaygroundDrift() {
  const nav = useNav();
  const [state, dispatch] = useReducer(driftReducer, driftInitialState);
  const isEmulator = DeviceInfo.isEmulatorSync();

  // TODO: figure out why Screen re-renders
  return (
    <Screen border onLeftPress={nav.to('playground')} title="Drift">
      <DriftContext.Provider value={{state, dispatch}}>
        {isEmulator ? (
          <Text center title="simulators not supported" />
        ) : (
          <Game />
        )}
      </DriftContext.Provider>
    </Screen>
  );
});

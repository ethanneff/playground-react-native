import DeviceInfo from 'react-native-device-info';
import React, {memo, useReducer} from 'react';
import {Screen, Text} from '../../../../components';
import {useNav} from '../../../../hooks';
import {Game} from './Game';
import {DriftContext, driftInitialState, driftReducer} from './Context';

export default memo(function DebugDrift() {
  const nav = useNav();
  const [state, dispatch] = useReducer(driftReducer, driftInitialState);
  const isEmulator = DeviceInfo.isEmulatorSync();

  // TODO: figure out why Screen re-renders
  return (
    <Screen border title="Drift" onLeftPress={nav.to('debug')}>
      <DriftContext.Provider value={{state, dispatch}}>
        {isEmulator ? (
          <Text title="simulators not supported" center />
        ) : (
          <Game />
        )}
      </DriftContext.Provider>
    </Screen>
  );
});

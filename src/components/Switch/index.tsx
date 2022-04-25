import React, { RefAttributes } from 'react';
import { SwitchProps } from 'react-native';
import { GestureSwitch } from '../../conversions';

export type SwitchRef = GestureSwitch | null;

export const Switch = (props: SwitchProps & RefAttributes<GestureSwitch>) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <GestureSwitch {...props} />;
};

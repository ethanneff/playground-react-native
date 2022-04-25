/* eslint-disable */
import React, { RefAttributes } from 'react';
import { TouchableWithoutFeedbackProps } from 'react-native';
import { GestureTouchableWithoutFeedback } from '../../conversions';

export type TouchableWithoutFeedbackRef =
  | typeof GestureTouchableWithoutFeedback
  | null;

export const TouchableWithoutFeedback = (
  props: TouchableWithoutFeedbackProps &
    RefAttributes<typeof GestureTouchableWithoutFeedback>,
) => {
  // @ts-ignore
  return <GestureTouchableWithoutFeedback {...props} />;
};

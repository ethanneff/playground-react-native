import React, { type RefAttributes } from 'react';
import { type TouchableWithoutFeedbackProps } from 'react-native';
import { GestureTouchableWithoutFeedback } from '../../conversions';

export type TouchableWithoutFeedbackRef =
  | typeof GestureTouchableWithoutFeedback
  | null;

export const TouchableWithoutFeedback = (
  props: RefAttributes<typeof GestureTouchableWithoutFeedback> &
    TouchableWithoutFeedbackProps,
) => {
  // @ts-expect-error Type '(event: GestureResponderEvent) => void' is not assignable to type '() => void'.
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <GestureTouchableWithoutFeedback {...props} />;
};

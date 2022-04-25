import React, { RefAttributes } from 'react';
import { ScrollViewProps } from 'react-native';
import { GestureScrollView } from '../../conversions';

export type ScrollViewRef = GestureScrollView | null;

export const ScrollView = (
  props: ScrollViewProps & RefAttributes<GestureScrollView>,
) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <GestureScrollView keyboardShouldPersistTaps="handled" {...props} />;
};

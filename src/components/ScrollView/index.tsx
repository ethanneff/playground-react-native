import React, { type Ref } from 'react';
import { type ScrollViewProps } from 'react-native';
import { GestureScrollView } from '../../conversions';

export type ScrollViewReference = GestureScrollView | null;

type Properties = ScrollViewProps & {
  readonly onRef?: Ref<GestureScrollView>;
};

export const ScrollView = ({ onRef, ...rest }: Properties) => (
  <GestureScrollView
    {...rest} // eslint-disable-line react/jsx-props-no-spreading
    ref={onRef}
  />
);

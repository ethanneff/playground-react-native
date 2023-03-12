import React, { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { type LayoutRectangle, type ViewStyle } from 'react-native';
import { View, type ViewRef } from '../View';
import { type VisibilitySensorChange } from './types';
import { getDirection, getVisible } from './utils';

type Props = {
  children: ReactNode;
  container: LayoutRectangle | null;
  duration?: number;
  onChange: (callback: VisibilitySensorChange) => void;
  style?: ViewStyle;
};

export const VisibilitySensor = ({
  children,
  container,
  duration = 300,
  onChange,
  style,
}: Props) => {
  const viewRef = useRef<ViewRef>(null);
  const lastValue = useRef<VisibilitySensorChange | null>(null);

  const getDimensions = useCallback(() => {
    if (!viewRef.current || !container) return;
    viewRef.current.measure(
      (
        _x: number,
        _y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number,
        // eslint-disable-next-line max-params
      ) => {
        const view = { height, width, x: pageX, y: pageY };
        const visible = getVisible(view, container);
        const direction = getDirection(view, container);
        const results = { direction, location: view, visible };
        const unchanged =
          lastValue.current &&
          lastValue.current.direction === results.direction &&
          lastValue.current.visible === results.visible;
        if (unchanged) return;
        lastValue.current = results;
        onChange(results);
      },
    );
  }, [onChange, container]);

  useEffect(() => {
    const interval = setInterval(getDimensions, duration);
    return () => {
      clearInterval(interval);
    };
  }, [duration, getDimensions]);

  useEffect(() => {
    getDimensions();
  }, [getDimensions, container]);

  return (
    <View
      collapsable={false}
      onRef={viewRef}
      style={style}
    >
      {children}
      <View />
    </View>
  );
};

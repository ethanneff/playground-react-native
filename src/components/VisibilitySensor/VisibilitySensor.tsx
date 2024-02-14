import React, { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { type LayoutRectangle, type ViewStyle } from 'react-native';
import { View, type ViewReference } from '../View';
import { type VisibilitySensorChange } from './types';
import { getDirection, getVisible } from './utils';

type Properties = {
  readonly children: ReactNode;
  readonly container: LayoutRectangle | null;
  readonly duration?: number;
  readonly onChange: (callback: VisibilitySensorChange) => void;
  readonly style?: ViewStyle;
};

export const VisibilitySensor = ({
  children,
  container,
  duration = 300,
  onChange,
  style,
}: Properties) => {
  const viewReference = useRef<ViewReference>(null);
  const lastValue = useRef<VisibilitySensorChange | null>(null);

  const getDimensions = useCallback(() => {
    if (!viewReference.current || !container) return;
    viewReference.current.measure(
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
      onRef={viewReference}
      style={style}
    >
      {children}
      <View />
    </View>
  );
};

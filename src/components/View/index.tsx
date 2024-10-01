import React, { type MutableRefObject, type ReactNode } from 'react';
import {
  // eslint-disable-next-line no-restricted-imports
  View as RNView,
  StyleSheet,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '../../features';

export type ViewReference = RNView | null;

type ViewProperties = ViewStyle & {
  readonly absoluteFillObject?: boolean;
  readonly accessible?: boolean;
  readonly children?: ReactNode;
  readonly collapsable?: boolean;
  readonly onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
  readonly onRef?: MutableRefObject<ViewReference>;
  readonly safeArea?: boolean;
  readonly safeAreaEdges?: ['top', 'right', 'bottom', 'left'];
  readonly style?: StyleProp<ViewStyle>;
  readonly testID?: string;
  readonly withDropShadow?: boolean;
};

export const View = ({
  absoluteFillObject,
  accessible,
  children,
  collapsable,
  onLayout,
  onRef,
  safeArea,
  safeAreaEdges,
  style,
  testID,
  withDropShadow,
  ...rest
}: ViewProperties) => {
  const colors = useColors();
  const absolute = absoluteFillObject ? StyleSheet.absoluteFillObject : {};
  const dropShadow = withDropShadow
    ? {
        elevation: 5,
        shadowColor: colors.border.primaryA,
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      }
    : {};
  const styles = StyleSheet.create({
    view: {
      ...absolute,
      ...dropShadow,
      ...rest,
    },
  });

  if (safeArea) {
    return (
      <SafeAreaView
        accessible={accessible}
        collapsable={collapsable}
        edges={safeAreaEdges}
        onLayout={onLayout}
        ref={onRef}
        style={[styles.view, style]}
        testID={testID}
      >
        {children}
      </SafeAreaView>
    );
  }

  return (
    <RNView
      accessible={accessible}
      collapsable={collapsable}
      onLayout={onLayout}
      ref={onRef}
      style={[styles.view, style]}
      testID={testID}
    >
      {children}
    </RNView>
  );
};

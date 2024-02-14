import React, { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { spacing, useColors, useDriver, useDropShadow } from '../../features';
import { useAppSelector } from '../../redux';
import { Card } from '../Card';
import { Pressable } from '../Pressable';
import { ScrollView } from '../ScrollView';
import { View } from '../View';

type ModalProperties = {
  readonly backgroundColor?: string;
  readonly children: ReactNode;
  readonly duration?: number;
  readonly elevation?: number;
  readonly heightPercent?: number;
  readonly noScroll?: boolean;
  readonly onBackgroundPress?: () => void;
  readonly showOverlay?: boolean;
  readonly testID?: string;
  readonly widthPercent?: number;
};

const fadeDuration = 150;
const defaultMargin = 0.8;

export const Modal = ({
  backgroundColor,
  children,
  duration,
  elevation,
  heightPercent = defaultMargin,
  noScroll,
  onBackgroundPress,
  showOverlay,
  testID,
  widthPercent = defaultMargin,
}: ModalProperties) => {
  const colors = useColors();
  const useNativeDriver = useDriver();
  const keyboardHeight = useAppSelector((s) => s.device.keyboardHeight);
  const dropShadow = useDropShadow();
  const screen = useAppSelector((s) => s.device.dimensions.screen);
  const maxHeight = (screen.height - keyboardHeight) * heightPercent;
  const width = screen.width * widthPercent;

  const styles = StyleSheet.create({
    backgroundPress: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
    },
    container: {
      backgroundColor: showOverlay ? colors.overlay.light : undefined,
      bottom: keyboardHeight,
      elevation: 1,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
    },
    modal: {
      backgroundColor: backgroundColor ?? colors.background.primaryA,
      flex: 0,
      maxHeight,
      width,
      ...dropShadow(10),
    },
    nonFlex: { flex: 0 },
  });
  const fade = useRef(new Animated.Value(0)).current;
  const opacity = fade;
  const containerStyle = [styles.container, { opacity }];
  const preventDismissSpam = useRef(false);

  // TODO: animation is not clean on devices
  const animate = useCallback(
    async (toValue: number) => {
      await new Promise((resolve) => {
        Animated.timing(fade, {
          duration: fadeDuration,
          toValue,
          useNativeDriver,
        }).start(resolve);
      });
    },
    [fade, useNativeDriver],
  );

  const dismiss = useCallback(
    (callback?: () => void) => async () => {
      if (!callback || preventDismissSpam.current) return;
      preventDismissSpam.current = true;

      await animate(0);
      callback();
    },
    [animate],
  );

  useEffect(() => {
    animate(1);
    if (!duration) return () => false;

    const alertTimeout = setTimeout(dismiss(onBackgroundPress), duration);
    return () => {
      clearTimeout(alertTimeout);
    };
  }, [animate, duration, dismiss, onBackgroundPress]);

  return (
    <Animated.View style={containerStyle}>
      <Pressable
        containerStyle={styles.backgroundPress}
        onPress={dismiss(onBackgroundPress)}
        testID={testID}
        withoutFeedback
      >
        <Card
          containerStyle={styles.modal}
          contentStyle={styles.nonFlex}
          elevation={elevation}
          testID="modal"
        >
          {noScroll ? (
            <View padding={spacing(2)}>{children}</View>
          ) : (
            <ScrollView
              contentContainerStyle={{
                padding: spacing(2),
              }}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          )}
        </Card>
      </Pressable>
    </Animated.View>
  );
};

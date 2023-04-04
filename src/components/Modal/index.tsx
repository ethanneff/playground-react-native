import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import { Animated, StyleSheet } from 'react-native';
import { spacing, useColors, useDriver, useDropShadow } from '../../features';
import { useRootSelector } from '../../redux';
import { Card } from '../Card';
import { Pressable } from '../Pressable';
import { ScrollView } from '../ScrollView';
import { View } from '../View';

type ModalProps = {
  backgroundColor?: string;
  children: ReactNode;
  duration?: number;
  elevation?: number;
  heightPercent?: number;
  noScroll?: boolean;
  onBackgroundPress?: () => void;
  showOverlay?: boolean;
  testID?: string;
  widthPercent?: number;
};

const fadeDuration = 150;
const defaultMargin = 0.8;

export const Modal = memo(function Modal({
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
}: ModalProps) {
  const colors = useColors();
  const useNativeDriver = useDriver();
  const keyboardHeight = useRootSelector((s) => s.device.keyboardHeight);
  const dropShadow = useDropShadow();
  const screen = useRootSelector((s) => s.device.dimensions.screen);
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
    if (!duration) return () => undefined;

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
});

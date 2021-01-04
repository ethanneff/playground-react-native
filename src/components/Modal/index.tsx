import React, {memo, ReactElement, useCallback, useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from '../../conversions/GestureHandler';
import {useColor, useDriver, useDropShadow} from '../../hooks';
import {useRootSelector} from '../../utils';
import {Card} from '../Card';

type ModalProps = {
  testID?: string;
  duration?: number;
  elevation?: number;
  noScroll?: boolean;
  onBackgroundPress?(): void;
  backgroundColor?: string;
  children: ReactElement | ReactElement[];
};

const fadeDuration = 150;
export const Modal = memo(function Modal({
  onBackgroundPress,
  children,
  backgroundColor,
  duration,
  noScroll,
  elevation,
  testID,
}: ModalProps) {
  const color = useColor();
  const useNativeDriver = useDriver();
  const dropShadow = useDropShadow();
  const {width, height} = useRootSelector((s) => s.dimension.screen);
  const styles = StyleSheet.create({
    container: {
      bottom: 0,
      elevation: 1,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
    },
    modal: {
      backgroundColor: backgroundColor || color.background,
      maxHeight: height * 0.6,
      width: width * 0.8,
      ...dropShadow(10),
    },
    overlay: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
    },
  });
  const fade = useRef(new Animated.Value(0)).current;
  const opacity = fade;
  const containerStyle = [styles.container, {opacity}];

  // TODO: animation is not clean on devices
  const animate = useCallback(
    (toValue: number) => {
      return new Promise((resolve) => {
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
      if (!callback) return;

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
      <TouchableWithoutFeedback
        onPress={dismiss(onBackgroundPress)}
        style={styles.overlay}
        testID={testID}>
        <TouchableWithoutFeedback onPress={undefined}>
          <Card
            elevation={elevation}
            noMargin
            style={styles.modal}
            testID="modal">
            {noScroll ? (
              children
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {children}
              </ScrollView>
            )}
          </Card>
        </TouchableWithoutFeedback>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
});

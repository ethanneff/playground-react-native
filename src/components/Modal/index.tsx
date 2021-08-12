import React, {memo, ReactElement, useCallback, useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {ScrollView, TouchableWithoutFeedback} from '../../conversions';
import {SoundManager} from '../../features/Sound';
import {useColor, useDriver, useDropShadow} from '../../hooks';
import {useRootSelector} from '../../utils';
import {Card} from '../Card';

type ModalProps = {
  duration?: number;
  elevation?: number;
  noScroll?: boolean;
  onBackgroundPress?: () => void;
  backgroundColor?: string;
  showOverlay?: boolean;
  children: ReactElement | ReactElement[];
  testID?: string;
  widthPercent?: number;
  heightPercent?: number;
};

const fadeDuration = 150;
export const Modal = memo(function Modal({
  onBackgroundPress,
  children,
  backgroundColor,
  duration,
  noScroll,
  showOverlay,
  widthPercent = 0.8,
  heightPercent = 0.8,
  elevation,
  testID,
}: ModalProps) {
  const color = useColor();
  const useNativeDriver = useDriver();
  const keyboardHeight = useRootSelector(s => s.device.keyboardHeight);
  const dropShadow = useDropShadow();
  const screen = useRootSelector(s => s.dimension.screen);
  const maxHeight = (screen.height - keyboardHeight) * heightPercent;
  const styles = StyleSheet.create({
    container: {
      bottom: keyboardHeight,
      elevation: 1,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
    },
    modal: {
      backgroundColor: backgroundColor || color.background.primaryA,
      maxHeight,
      width: screen.width * widthPercent,
      ...dropShadow(10),
    },
    overlay: {
      alignItems: 'center',
      backgroundColor: showOverlay ? color.overlay.light : undefined,
      height: '100%',
      justifyContent: 'center',
    },
  });
  const fade = useRef(new Animated.Value(0)).current;
  const opacity = fade;
  const containerStyle = [styles.container, {opacity}];
  const preventDismissSpam = useRef(false);

  // TODO: animation is not clean on devices
  const animate = useCallback(
    (toValue: number) => {
      return new Promise(resolve => {
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
      SoundManager.play('tap');
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
        testID={testID}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Card
              elevation={elevation}
              noMargin
              style={styles.modal}
              testID="modal">
              {noScroll ? (
                children
              ) : (
                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}>
                  {children}
                </ScrollView>
              )}
            </Card>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
});

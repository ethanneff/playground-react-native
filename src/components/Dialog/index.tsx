import React, { memo, useCallback, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { hideModal } from "../../models";
import {
  colorWithOpacity,
  Theme,
  useNativeDriver,
  useRootDispatch
} from "../../utils";
import { Button } from "../Button";
import { Card } from "../Card";
import { Text } from "../Text";
import { useColor } from "../../behaviors";

interface OwnProps {
  testID?: string;
  title: string;
  message?: string;
  duration?: number;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirmButtonPress?(): void;
  onCancelButtonPress?(): void;
  onBackgroundPress?(): void;
}

type Props = OwnProps;

const fadeDuration = 200;
export const Dialog: React.FC<Props> = memo(
  ({
    onCancelButtonPress,
    onConfirmButtonPress,
    onBackgroundPress,
    confirmButtonText = "confirm",
    cancelButtonText = "cancel",
    message,
    title,
    duration,
    testID
  }) => {
    const color = useColor();
    const styles = StyleSheet.create({
      buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: Theme.padding.p13
      },
      cancel: {
        flex: 1,
        marginRight: Theme.padding.p02
      },
      confirm: {
        flex: 1,
        marginLeft: Theme.padding.p02
      },
      container: {
        bottom: 0,
        elevation: 100,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 100
      },
      modal: {
        maxWidth: 500,
        width: "100%"
      },
      overlay: {
        alignItems: "center",
        backgroundColor: colorWithOpacity(color.black),
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        padding: Theme.padding.p08
      },
      title: {
        paddingBottom: Theme.padding.p03
      }
    });
    const fade = new Animated.Value(0);
    const opacity = fade;
    const twoButtons = !!onConfirmButtonPress && !!onCancelButtonPress;
    const containerStyle = [styles.container, { opacity }];
    const cancelButtonStyle = [twoButtons ? styles.cancel : undefined];
    const confirmButtonStyle = [twoButtons ? styles.confirm : undefined];
    const dispatch = useRootDispatch();

    const animate = useCallback(
      (toValue: number) => {
        return new Promise(resolve => {
          Animated.timing(fade, {
            duration: fadeDuration,
            toValue,
            useNativeDriver
          }).start(resolve);
        });
      },
      [fade]
    );

    const dismiss = useCallback(
      (callback?: () => void) => async () => {
        if (!callback) {
          return;
        }
        await animate(0);
        dispatch(hideModal());
        callback();
      },
      [animate, dispatch]
    );

    useEffect(() => {
      animate(1);
      if (!duration) {
        return;
      }
      const alertTimeout = setTimeout(dismiss(onBackgroundPress), duration);
      return () => {
        clearTimeout(alertTimeout);
      };
    }, [animate, duration, dismiss, onBackgroundPress]);

    return (
      <Animated.View style={containerStyle}>
        <TouchableWithoutFeedback
          testID={testID}
          onPress={dismiss(onBackgroundPress)}
        >
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={undefined}>
              <Card style={styles.modal}>
                <Text title={title} h3 style={styles.title} />
                <Text title={message} />
                <View style={styles.buttonContainer}>
                  <Button
                    hidden={!!!onCancelButtonPress}
                    title={cancelButtonText}
                    onPress={dismiss(onCancelButtonPress)}
                    buttonStyle={cancelButtonStyle}
                    half={!twoButtons}
                  />
                  <Button
                    hidden={!!!onConfirmButtonPress}
                    title={confirmButtonText}
                    onPress={dismiss(onConfirmButtonPress)}
                    buttonStyle={confirmButtonStyle}
                    secondary
                    half={!twoButtons}
                  />
                </View>
              </Card>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
);

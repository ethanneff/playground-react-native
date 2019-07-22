// TODO: figure out if modals (alert, dialog) should be handled through navigation (redux, global, deep link, categorized as screens) or through the screens (screen predictability, deep link?, easier to add screens (redux navigation is too complicated)
import React, { memo, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { getCurrentColor } from "../../models";
import {
  colorWithOpacity,
  Theme,
  useNativeDriver,
  useRootSelector
} from "../../utils";
import { Button } from "../Button";
import { Text } from "../Text";

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
export const Alert = memo(
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
  }: Props) => {
    const color = useRootSelector(state => getCurrentColor(state));
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
        backgroundColor: color.background,
        borderRadius: Theme.sizing.borderRadius,
        marginHorizontal: Theme.padding.p15,
        maxWidth: 500,
        paddingBottom: Theme.padding.p09,
        paddingHorizontal: Theme.padding.p09,
        paddingTop: Theme.padding.p13,
        width: "100%"
      },
      overlay: {
        alignItems: "center",
        backgroundColor: colorWithOpacity(color.text),
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        padding: Theme.padding.p08
      },
      title: {
        paddingBottom: Theme.padding.p03
      }
    });
    let alertTimeout: any = 0;
    const fade = new Animated.Value(0);
    const opacity = fade;
    const twoButtons = !!onConfirmButtonPress && !!onCancelButtonPress;
    const containerStyle = [styles.container, { opacity }];
    const cancelButtonStyle = [twoButtons ? styles.cancel : undefined];
    const confirmButtonStyle = [twoButtons ? styles.confirm : undefined];

    useEffect(() => {
      animate(1);
      if (!duration) {
        return;
      }
      alertTimeout = setTimeout(dismiss(onBackgroundPress), duration);

      return () => {
        clearTimeout(alertTimeout);
      };
    }, []);

    const animate = (toValue: number) =>
      new Promise(resolve => {
        Animated.timing(fade, {
          duration: fadeDuration,
          toValue,
          useNativeDriver
        }).start(resolve);
      });

    const dismiss = (callback?: () => void) => async () => {
      if (!callback) {
        return;
      }
      await animate(0);
      callback();
    };

    return (
      <Animated.View style={containerStyle}>
        <TouchableWithoutFeedback
          testID={testID}
          onPress={dismiss(onBackgroundPress)}
        >
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={undefined}>
              <View style={styles.modal}>
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
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
);

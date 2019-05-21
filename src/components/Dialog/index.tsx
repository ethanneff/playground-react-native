import React from "react";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { Button, Text } from "..";
import { colorWithOpacity, Theme } from "../../utils";

interface Props {
  testID?: string;
  title: string;
  message?: string;
  alert?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirmButtonPress?(): void;
  onCancelButtonPress?(): void;
  onBackgroundPress?(): void;
}

class Dialog extends React.PureComponent<Props> {
  private readonly styles = StyleSheet.create({
    alert: {
      display: "none"
    },
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
      backgroundColor: Theme.color.background,
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
      backgroundColor: colorWithOpacity(Theme.color.text),
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      padding: Theme.padding.p08
    },
    title: {
      paddingBottom: Theme.padding.p03
    }
  });
  private readonly fade = new Animated.Value(0);
  private readonly fadeDuration = 200;

  private readonly alertTimeoutTime = 3000;
  private alertTimeout?: number;

  public componentDidMount() {
    this.animate(1);
    if (this.props.alert) {
      this.alert();
    }
  }

  public componentWillUnmount() {
    this.clearTimeouts();
  }

  public render() {
    const {
      onCancelButtonPress,
      onConfirmButtonPress,
      confirmButtonText = "confirm",
      cancelButtonText = "cancel",
      message,
      title,
      alert,
      testID
    } = this.props;
    const opacity = this.fade;
    const buttonStyles = [
      this.styles.buttonContainer,
      alert ? this.styles.alert : undefined
    ];
    const twoButtons = !!onConfirmButtonPress && !!onCancelButtonPress;
    const cancelButtonStyle = [twoButtons ? this.styles.cancel : undefined];
    const confirmButtonStyle = [twoButtons ? this.styles.confirm : undefined];

    return (
      <Animated.View style={[this.styles.container, { opacity }]}>
        <TouchableWithoutFeedback
          testID={testID}
          onPress={this.onBackgroundPress}
        >
          <View style={this.styles.overlay}>
            <TouchableWithoutFeedback onPress={undefined}>
              <View style={this.styles.modal}>
                <Text title={title} h3 style={this.styles.title} />
                <Text title={message} />
                <View style={buttonStyles}>
                  <Button
                    hidden={!!!onCancelButtonPress}
                    title={cancelButtonText}
                    onPress={this.onCancelButtonPress}
                    buttonStyle={cancelButtonStyle}
                    half={!twoButtons}
                  />
                  <Button
                    hidden={!!!onConfirmButtonPress}
                    title={confirmButtonText}
                    onPress={onConfirmButtonPress}
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

  private animate = (toValue: number) =>
    new Promise(resolve => {
      Animated.timing(this.fade, {
        duration: this.fadeDuration,
        toValue
      }).start(() => resolve());
    });

  private onCancelButtonPress = async () => {
    const { onCancelButtonPress } = this.props;
    await this.animate(0);
    if (onCancelButtonPress) {
      onCancelButtonPress();
    }
  };

  private alert = () => {
    this.alertTimeout = setTimeout(() => {
      const { onBackgroundPress } = this.props;
      if (onBackgroundPress) { onBackgroundPress(); }
      this.clearTimeouts();
    }, this.alertTimeoutTime);
  };

  private clearTimeouts = () => {
    clearTimeout(this.alertTimeout);
  };

  private onBackgroundPress = async () => {
    const { onBackgroundPress } = this.props;
    await this.animate(0);
    if (onBackgroundPress) {
      onBackgroundPress();
    }
  };
}

export default Dialog;

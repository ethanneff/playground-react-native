import React from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { Button, Text } from "..";
import { colorWithOpacity, Theme } from "../../utils";

interface Props {
  testID?: string;
  visible?: boolean;
  title: string;
  message?: string;
  alert?: boolean;
  backgroundClose?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirmButtonPress?(): void;
  onCancelButtonPress?(): void;
}

class Dialog extends React.PureComponent<Props> {
  private readonly styles = StyleSheet.create({
    alert: {
      display: "none"
    },
    buttonGroup: {
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

  private readonly alertTimeoutTime = 3000;
  private alertTimeout?: number;

  public componentDidUpdate(prevProps: Props) {
    const { alert, visible } = this.props;
    if (prevProps.visible !== visible && alert && visible) {
      this.disappearAlert();
    }
    if (prevProps.visible !== visible && !visible) {
      this.clearTimeouts();
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
      visible,
      alert,
      testID
    } = this.props;
    const buttonStyles = [
      this.styles.buttonGroup,
      alert ? this.styles.alert : undefined
    ];
    const twoButtons = !!onConfirmButtonPress && !!onCancelButtonPress;
    const cancelButtonStyle = [twoButtons ? this.styles.cancel : undefined];
    const confirmButtonStyle = [twoButtons ? this.styles.confirm : undefined];

    return (
      <Modal transparent={true} visible={visible}>
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
                    onPress={onCancelButtonPress}
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
      </Modal>
    );
  }

  private disappearAlert = () => {
    this.alertTimeout = setTimeout(() => {
      const { onCancelButtonPress } = this.props;
      if (onCancelButtonPress) {
        onCancelButtonPress();
      }
      this.clearTimeouts();
    }, this.alertTimeoutTime);
  };

  private clearTimeouts = () => {
    clearTimeout(this.alertTimeout);
  };

  private onBackgroundPress = () => {
    const { backgroundClose, onCancelButtonPress } = this.props;
    if (backgroundClose && onCancelButtonPress) {
      onCancelButtonPress();
    }
  };
}
export default Dialog;

import React, { memo } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useColor } from "../../hooks";
import { Theme, useRootSelector } from "../../utils";

interface Props {
  testID?: string;
  maxHeight?: number;
  maxWidth?: number;
  onBackgroundPress?(): void;
}
export const Modal: React.FC<Props> = memo(function ModalWrapperMemo({
  testID,
  onBackgroundPress,
  children,
  maxWidth = 500,
  maxHeight
}) {
  const height = useRootSelector(state => state.dimension.window.height);
  const maximumHeight = maxHeight ? maxHeight : height * 0.6;
  const color = useColor();
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center"
    },
    overlay: {
      flex: 1,
      width: "100%",
      backgroundColor: Theme.color.overlay
    },
    modal: {
      position: "absolute",
      backgroundColor: color.background,
      borderRadius: Theme.sizing.borderRadius,
      padding: Theme.padding.p04,
      width: "80%",
      maxWidth,
      maxHeight: maximumHeight,
      overflow: "hidden",
      elevation: 3,
      shadowColor: Theme.color.overlay,
      shadowOffset: {
        height: 2,
        width: 0
      },
      shadowOpacity: 0.2,
      shadowRadius: 1,
      zIndex: 3
    }
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID={testID}
        activeOpacity={1}
        onPress={onBackgroundPress}
        style={styles.overlay}
      />
      <View style={styles.modal} testID="modal">
        <ScrollView>{children}</ScrollView>
      </View>
    </View>
  );
});

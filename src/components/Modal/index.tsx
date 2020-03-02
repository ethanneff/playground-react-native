import React, { memo } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useColor, useDropShadow } from "../../hooks";
import { Theme, useRootSelector } from "../../utils";

interface Props {
  testID?: string;
  maxHeight?: number;
  maxWidth?: number;
  noScroll?: boolean;
  onBackgroundPress?(): void;
}
export const Modal: React.FC<Props> = memo(function ModalWrapperMemo({
  testID,
  onBackgroundPress,
  children,
  noScroll,
  maxWidth = 500,
  maxHeight
}) {
  const appHeight = useRootSelector(state => state.dimension.window.height);
  const maximumHeight = maxHeight ? maxHeight : appHeight * 0.6;
  const color = useColor();
  const dropShadow = useDropShadow(10);
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
      ...dropShadow
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
        {noScroll ? (
          <View>{children}</View>
        ) : (
          <ScrollView>{children}</ScrollView>
        )}
      </View>
    </View>
  );
});

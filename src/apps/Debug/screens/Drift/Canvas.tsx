import React, { memo } from "react";
import { View, LayoutChangeEvent } from "react-native";

interface CanvasProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

export const Canvas: React.FC<CanvasProps> = memo(function Canvas({
  children,
  onLayout
}) {
  return (
    <View onLayout={onLayout} style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {children}
    </View>
  );
});

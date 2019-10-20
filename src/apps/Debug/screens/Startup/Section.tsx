import React, { memo } from "react";
import { View } from "react-native";
import { useColor } from "../../../../hooks";
import { Text } from "../../../../components";
import { Theme } from "../../../../utils";

type SectionProps = {
  row?: boolean;
  title: string;
};

export const Section: React.FC<SectionProps> = memo(function Section({
  title,
  row,
  children
}) {
  const color = useColor();
  return (
    <View
      style={{
        flexDirection: row ? "row" : "column",
        marginBottom: Theme.padding.p04
      }}
    >
      <Text
        h3
        title={title}
        style={{
          color: color.background, // TODO: add prop to text for inverse
          backgroundColor: color.primary,
          padding: Theme.padding.p02,
          borderColor: color.secondary,
          borderWidth: 2
        }}
      />
      <View
        style={{
          backgroundColor: color.background,
          padding: Theme.padding.p03,
          borderColor: color.secondary,
          borderWidth: 2,
          borderTopWidth: 0
        }}
      >
        {children}
      </View>
    </View>
  );
});

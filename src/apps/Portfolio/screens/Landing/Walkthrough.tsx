import React, { memo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "../../../../components";
import { useColor } from "../../../../hooks";
import { useRootSelector } from "../../../../utils";
import { getWidth } from "../../../../models";

interface Data {
  key: number;
  text: string;
  color: string;
}

const styles = (width: number, color: string) =>
  StyleSheet.create({
    item: {
      backgroundColor: color,
      justifyContent: "center",
      width
    }
  });

export default memo(function Walkthrough() {
  const width = useRootSelector(getWidth);
  const color = useColor();
  const data: Data[] = [
    { key: 1, text: "hello", color: color.primary },
    { key: 2, text: "bob", color: color.secondary },
    { key: 3, text: "steve", color: color.success },
    { key: 4, text: "jill", color: color.brand }
  ];

  const renderItem = ({ item }: { item: Data }) => 
    <View style={styles(width, item.color).item}>
      <Text title={item.text} center />
    </View>
  ;

  return (
    <FlatList
      pagingEnabled
      horizontal
      keyExtractor={item => String(item.key)}
      data={data}
      renderItem={renderItem}
    />
  );
});

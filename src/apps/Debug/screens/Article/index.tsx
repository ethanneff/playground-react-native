import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Screen } from "../../../../components";
import { Content } from "../../../../components/Content";
import { data } from "./data";
import { useColor, useNav } from "../../../../behaviors";

export default memo(function DebugArticle() {
  const nav = useNav();
  const color = useColor();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background
    }
  });
  return (
    <Screen onLeftPress={nav.to("debug")}>
      <View style={styles.container}>
        <Content body={data} />
      </View>
    </Screen>
  );
});

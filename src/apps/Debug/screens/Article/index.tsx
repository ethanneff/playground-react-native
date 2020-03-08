import React, { memo } from "react";
import { View } from "react-native";
import { Screen } from "../../../../components";
import { Content } from "../../../../components/Content";
import { data } from "./data";
import { useNav } from "../../../../hooks";

export default memo(function DebugArticle() {
  const nav = useNav();
  const color = useColor();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background
    }
  });
  return (
    <Screen onLeftPress={nav.to("debug")} title="Article">
      <View>
        <Content body={data} />
      </View>
    </Screen>
  );
});

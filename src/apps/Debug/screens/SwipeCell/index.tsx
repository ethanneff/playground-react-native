import React, { memo } from "react";
import { Screen, Text } from "../../../../components";
import { useNav } from "../../../../hooks";

export default memo(function SwipeCell() {
  const nav = useNav();
  return (
    <Screen onLeftPress={nav.to("debug")}>
      <Text title="swipecell" />
    </Screen>
  );
});

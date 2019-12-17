import { FlatList, View } from "react-native";
import React, { memo, useCallback, useState } from "react";
import { Theme } from "../../utils";
import { getActivitySquares } from "./utils";
import { ActivityWeek } from "./Week";
import { Text } from "../Text";
import { useColor } from "../../hooks";

type Site = "github" | "leetcode" | "hackerrank";

interface Props {
  username: string;
  site: Site;
  size?: number;
  margin?: number;
}

export const Activity = memo(function Activity({
  username,
  site,
  size = Theme.padding.p06,
  margin = 1
}: Props) {
  // TODO: handle username
  // TODO: handle site
  const color = useColor();
  const activity = getActivitySquares();
  const [selected, setSelected] = useState();
  const onPress = item => () => {
    // setSelected(item);
  };
  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={activity.matrix}
        inverted
        horizontal
        keyExtractor={item => item[0].date.format("MM-DD")}
        renderItem={({ item, index }) => 
          <ActivityWeek
            max={activity.max}
            item={item}
            index={index}
            size={size}
            margin={margin}
            onPress={onPress}
          />
        }
      />
      <Text
        overline
        secondary
        title={"hello"}
        center
        style={{ paddingTop: Theme.padding.p03 }}
      />
    </>
  );
});

import { FlatList } from "react-native";
import React, { memo } from "react";
import { Theme } from "../../utils";
import { getActivitySquares, ActivityDay } from "./utils";
import { ActivityWeek } from "./Week";
import { Text } from "../Text";

type Site = "github" | "leetcode" | "hackerrank";

interface Props {
  username: string;
  site: Site;
  size?: number;
  margin?: number;
}

export const Activity = memo(function Activity({
  size = Theme.padding.p06,
  margin = 1
}: Props) {
  // TODO: handle username
  // TODO: handle site

  const activity = getActivitySquares();
  const onPress = (item: ActivityDay) => () => item;
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

import { FlatList } from "react-native";
import React, { memo, useEffect, useState, useCallback } from "react";
import { Theme } from "../../utils";
import { getActivitySquares, getApiActivity } from "./utils";
import { ActivityWeekRow } from "./Week";
import { Text } from "../Text";
import {
  ActivityModel,
  Site,
  ActivityDay,
  ActivityDayInWeek
} from "./interfaces";

interface Props {
  username: string;
  site: Site;
  size?: number;
  margin?: number;
}

const initialActivity: ActivityModel = {
  matrix: [],
  max: 0,
  loading: true
};

export const Activity = memo(function Activity({
  size = Theme.padding.p06,
  margin = 2,
  username,
  site
}: Props) {
  const [activity, setActivity] = useState<ActivityModel>(initialActivity);
  const [current, setCurrent] = useState(" ");

  // TODO: need to persist
  // TODO: need selection color
  // TODO: need to default select today
  const updateActivity = useCallback(async () => {
    const active = await getApiActivity({ username, site });
    const { matrix, max } = getActivitySquares(active);
    setActivity({ matrix, max, loading: false });
  }, [site, username]);

  useEffect(() => {
    updateActivity();
  }, [updateActivity]);

  const onPress = useCallback(
    (item: ActivityDay) => () => {
      const sub = item.count === 1 ? "submission" : "submissions";
      const date = item.date.format("MMM DD, YYYY");
      setCurrent(`${item.count} ${sub} on ${date}`);
    },
    []
  );

  const renderItem = useCallback(
    ({ item, index }: { item: ActivityDayInWeek; index: number }) => (
      <ActivityWeekRow
        max={activity.max}
        item={item}
        index={index}
        size={size}
        margin={margin}
        onPress={onPress}
      />
    ),
    [activity.max, margin, onPress, size]
  );

  const keyExtractor = useCallback(item => item[0].date.format("MM-DD"), []);

  return activity.loading ? (
    <Text h5 medium title="loading..." />
  ) : (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={activity.matrix}
        inverted
        horizontal
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <Text
        overline
        medium
        secondary
        title={current}
        center
        style={{ paddingTop: Theme.padding.p03 }}
      />
    </>
  );
});

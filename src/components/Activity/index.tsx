import { FlatList } from "react-native";
import React, { memo, useEffect, useState, useCallback } from "react";
import { Theme } from "../../utils";
import {
  getActivitySquares,
  getApiActivity,
  getCurrentFormat,
  getDateFormat
} from "./utils";
import { ActivityWeekRow } from "./Week";
import { Text } from "../Text";
import {
  ActivityModel,
  Site,
  ActivityDay,
  ActivityDayInWeek
} from "./interfaces";
import dayjs from "dayjs";

interface Props {
  username: string;
  site: Site;
  size?: number;
  margin?: number;
}

const initialActivity: ActivityModel = {
  matrix: [],
  max: 0,
  loading: true,
  current: ""
};

export const Activity = memo(function Activity({
  size = Theme.padding.p06,
  margin = 2,
  username,
  site
}: Props) {
  const [activity, setActivity] = useState<ActivityModel>(initialActivity);

  // TODO: need to persist
  // TODO: need selection color
  const updateActivity = useCallback(async () => {
    const active = await getApiActivity({ username, site });
    const { matrix, max } = getActivitySquares(active);
    const activeToday = active[getDateFormat(dayjs())] || 0;
    setActivity({
      matrix,
      max,
      loading: false,
      current: getCurrentFormat(activeToday, dayjs())
    });
  }, [site, username]);

  useEffect(() => {
    updateActivity();
  }, [updateActivity]);

  const onPress = useCallback(
    (item: ActivityDay) => () => {
      setActivity(state => ({
        ...state,
        current: getCurrentFormat(item.count, item.date)
      }));
    },
    []
  );

  const renderItem = useCallback(
    ({ item, index }: { item: ActivityDayInWeek; index: number }) => 
      <ActivityWeekRow
        max={activity.max}
        item={item}
        index={index}
        size={size}
        margin={margin}
        onPress={onPress}
      />
    ,
    [activity.max, margin, onPress, size]
  );

  const keyExtractor = useCallback(item => getDateFormat(item[0].date), []);

  return activity.loading ? 
    <Text h5 medium title="loading..." />
   : 
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
        title={activity.current}
        center
        style={{ paddingTop: Theme.padding.p03 }}
      />
    </>
  ;
});

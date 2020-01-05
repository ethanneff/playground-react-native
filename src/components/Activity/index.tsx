import { FlatList, View } from "react-native";
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
import { Button } from "../Button";

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
  error: undefined,
  current: undefined
};

// TODO: simplify the problem... have 2 cells.. try to render only 1 even both cells reference the same board

export const Activity = memo(function Activity({
  size = Theme.padding.p06,
  margin = 2,
  username,
  site
}: Props) {
  const [activity, setActivity] = useState<ActivityModel>(initialActivity);

  // TODO: need to persist
  // TODO: need selection color
  const getActivity = useCallback(async () => {
    try {
      const active = await getApiActivity({ username, site });
      const { matrix, max } = getActivitySquares(active);
      const activeToday = active[getDateFormat(dayjs())] || 0;
      setActivity({
        matrix,
        max,
        loading: false,
        error: undefined,
        current: getCurrentFormat(activeToday, dayjs())
      });
    } catch (error) {
      setActivity({
        ...initialActivity,
        loading: false,
        error: error.message
      });
    }
  }, [site, username]);

  useEffect(() => {
    getActivity();
  }, [getActivity]);

  const onItemPress = useCallback(
    (item: ActivityDay) => () => {
      setActivity(state => ({
        ...state,
        current: getCurrentFormat(item.count, item.date)
      }));
    },
    []
  );

  const onRetryPress = useCallback(() => getActivity(), [getActivity]);

  const renderItem = useCallback(
    ({ item, index }: { item: ActivityDayInWeek; index: number }) => 
      <ActivityWeekRow
        max={activity.max}
        item={item}
        index={index}
        size={size}
        margin={margin}
        onPress={onItemPress}
      />
    ,
    [activity.max, margin, onItemPress, size]
  );

  const keyExtractor = useCallback(item => getDateFormat(item[0].date), []);

  return activity.loading ? 
    <Text h5 medium title="loading..." />
   : activity.error ? 
    <View>
      <Text title={activity.error} />
      <Button title="Retry" wrap contained danger half onPress={onRetryPress} />
    </View>
   : 
    <>
      <FlatList
        initialNumToRender={60}
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

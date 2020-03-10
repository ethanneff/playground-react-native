import { FlatList, View, ActivityIndicator } from "react-native";
import React, { memo, useEffect, useState, useCallback } from "react";
import { Theme } from "../../utils";
import {
  getActivitySquares,
  getApiActivity,
  getSubmissionFormat,
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
  activity: {
    matrix: [],
    max: 0
  },
  request: "loading",
  selected: {
    submissions: undefined,
    day: undefined
  }
};

// TODO: simplify the problem... have 2 cells.. try to render only 1 even both cells reference the same board

export const Activity = memo(function Activity({
  size = Theme.padding.p06,
  margin = 2,
  username,
  site
}: Props) {
  const [state, setState] = useState<ActivityModel>(initialActivity);

  // TODO: need to persist
  // TODO: need selection color
  const getActivity = useCallback(async () => {
    try {
      const active = await getApiActivity({ username, site });
      const { matrix, max } = getActivitySquares(active);
      const today = dayjs();
      const todayFormat = getDateFormat(dayjs());
      const count = active[todayFormat] || 0;
      setState({
        activity: {
          matrix,
          max
        },
        request: "success",
        selected: {
          submissions: getSubmissionFormat(count, today),
          day: todayFormat
        }
      });
    } catch (error) {
      setState({
        ...initialActivity,
        request: "failure"
      });
    }
  }, [site, username]);

  useEffect(() => {
    getActivity();
  }, [getActivity]);

  const onItemPress = useCallback(
    (item: ActivityDay) => () => {
      setState(data => ({
        ...data,
        selected: {
          submissions: getSubmissionFormat(item.count, item.date),
          day: getDateFormat(item.date)
        }
      }));
    },
    []
  );

  const onRetryPress = useCallback(() => getActivity(), [getActivity]);

  const renderItem = useCallback(
    ({ item, index }: { item: ActivityDayInWeek; index: number }) => 
      <ActivityWeekRow
        max={state.activity.max}
        item={item}
        index={index}
        size={size}
        margin={margin}
        onPress={onItemPress}
      />
    ,
    [state.activity.max, margin, onItemPress, size]
  );

  const keyExtractor = useCallback(item => getDateFormat(item[0].date), []);

  return state.request === "loading" ? 
    <ActivityIndicator />
   : state.request === "failure" ? 
    <View>
      <Text title="Missing network connection" />
      <Button title="Retry" color="danger" onPress={onRetryPress} />
    </View>
   : 
    <>
      <FlatList
        initialNumToRender={60}
        showsHorizontalScrollIndicator={false}
        data={state.activity.matrix}
        inverted
        horizontal
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <Text
        overline
        medium
        secondary
        title={state.selected.submissions}
        center
        style={{ paddingTop: Theme.padding.p03 }}
      />
    </>
  ;
});

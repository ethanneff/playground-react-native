import React, { memo, useCallback, useEffect, useState } from 'react';
import { FlashList, View, type FlashListRenderItem } from '../../components';
import { spacing } from '../../features';
import { Button } from '../Button';
import { Card } from '../Card';
import { Loader } from '../Loader';
import { Pressable } from '../Pressable';
import { Text } from '../Text';
import { Week } from './Week';
import { getApiActivity } from './api';
import {
  type ActivityDay,
  type ActivityModel,
  type ActivityWeek,
  type Site,
} from './types';
import {
  getActivitySquares,
  getDateFormat,
  getSubmissionFormat,
  updateActivitySquares,
} from './utils';

type Props = {
  margin?: number;
  site: Site;
  size?: number;
  title?: string;
  username: string;
};

const initialActivity: ActivityModel = {
  activity: getActivitySquares(),
  request: 'loading',
  selected: {
    day: 0,
    submissions: ' ',
  },
};

export const Activity = memo(function Activity({
  margin = 2,
  site,
  size = spacing(6),
  title,
  username,
}: Props) {
  const [state, setState] = useState<ActivityModel>(initialActivity);
  const keyExtractor = useCallback(
    (item: ActivityWeek) => String(item[0].date),
    [],
  );

  const getActivity = useCallback(async () => {
    try {
      const today = Date.now();
      const api = await getApiActivity({ site, username });
      const todayFormat = getDateFormat(today);
      const todayCount = api.contributions[todayFormat] || 0;
      setState((prev) => ({
        ...prev,
        activity: updateActivitySquares(prev.activity, api),
        request: 'success',
        selected: {
          day: 0,
          submissions: getSubmissionFormat(todayCount, today),
        },
      }));
    } catch (error) {
      setState({
        ...initialActivity,
        request: 'failure',
      });
    }
  }, [site, username]);

  const refresh = useCallback(() => {
    setState(initialActivity);
    getActivity();
  }, [getActivity]);

  useEffect(() => {
    getActivity();
  }, [getActivity]);

  const onItemPress = useCallback(
    (item: ActivityDay) => () => {
      setState((data) => ({
        ...data,
        selected: {
          day: item.date,
          submissions: getSubmissionFormat(item.count, item.date),
        },
      }));
    },
    [],
  );

  const renderItem = useCallback<FlashListRenderItem<ActivityWeek>>(
    ({ item }) => (
      <Week
        item={item}
        margin={margin}
        max={state.activity.max}
        onPress={onItemPress}
        size={size}
      />
    ),
    [state.activity.max, margin, onItemPress, size],
  );

  return null;

  return (
    <Card>
      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: spacing(4),
        }}
      >
        {title ? (
          <Pressable onPress={refresh}>
            <Text
              emphasis="medium"
              title={title}
              type="h4"
            />
          </Pressable>
        ) : null}
        {state.activity.total ? (
          <Text
            emphasis="medium"
            title={`${state.activity.total} submissions`}
            type="overline"
          />
        ) : null}
      </View>
      {state.request === 'loading' ? (
        <Loader size="large" />
      ) : state.request === 'failure' ? (
        <>
          <Text title="Missing network connection" />
          <Button
            color="negative"
            onPress={refresh}
            title="Retry"
          />
        </>
      ) : (
        <>
          <FlashList
            data={state.activity.matrix}
            estimatedItemSize={28}
            horizontal
            inverted
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
          />
          <Text
            center
            emphasis="medium"
            style={{ paddingTop: spacing(3) }}
            title={state.selected.submissions}
            type="overline"
          />
        </>
      )}
    </Card>
  );
});

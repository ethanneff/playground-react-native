import React, { memo, useCallback, useEffect, useState } from 'react';
import { type ListRenderItem } from 'react-native';
import { View } from '../../components';
import { spacing } from '../../features';
import { Button } from '../Button';
import { Card } from '../Card';
import { FlatList } from '../FlatList';
import { Loader } from '../Loader';
import { Text } from '../Text';
import { TouchableOpacity } from '../TouchableOpacity';
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
  size = spacing(6),
  margin = 2,
  username,
  site,
  title,
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

  const renderItem = useCallback<ListRenderItem<ActivityWeek>>(
    ({ index, item }) => (
      <Week
        index={index}
        item={item}
        margin={margin}
        max={state.activity.max}
        onPress={onItemPress}
        size={size}
      />
    ),
    [state.activity.max, margin, onItemPress, size],
  );

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
          <TouchableOpacity onPress={refresh}>
            <Text
              emphasis="medium"
              title={title}
              type="h4"
            />
          </TouchableOpacity>
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
          <FlatList
            data={state.activity.matrix}
            horizontal
            initialNumToRender={0}
            inverted
            keyExtractor={keyExtractor}
            keyboardShouldPersistTaps="handled"
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

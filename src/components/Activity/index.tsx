import {FlatList, View, ActivityIndicator} from 'react-native';
import React, {memo, useEffect, useState, useCallback} from 'react';
import {Theme, colorWithOpacity} from '../../utils';
import {
  getActivitySquares,
  updateActivitySquares,
  getApiActivity,
  getSubmissionFormat,
  getDateFormat,
} from './utils';
import {Week, ActivityWeek} from './Week';
import {Text} from '../Text';
import {Button} from '../Button';
import {ActivityDay} from './Day';
import {useColor} from '../../hooks';

interface Props {
  username: string;
  site: Site;
  size?: number;
  margin?: number;
}

export type Site = 'github' | 'leetCode' | 'hackerRank' | 'gitlab' | 'random';

export type ActivityMatrix = Array<ActivityWeek>;

type ActivityModel = {
  activity: {
    matrix: ActivityMatrix;
    max: number;
  };
  request: 'loading' | 'failure' | 'success';
  selected: {
    submissions: string;
    day: number;
  };
};

const initialActivity: ActivityModel = {
  activity: getActivitySquares(),
  request: 'loading',
  selected: {
    submissions: ' ',
    day: 0,
  },
};

export const Activity = memo(function Activity({
  size = Theme.padding.p06,
  margin = 2,
  username,
  site,
}: Props) {
  const color = useColor();
  const [state, setState] = useState<ActivityModel>(initialActivity);

  const getActivity = useCallback(async () => {
    try {
      const today = Date.now();
      const api = await getApiActivity({username, site});
      const todayFormat = getDateFormat(today);
      const count = api[todayFormat] || 0;
      setState((prev) => ({
        ...prev,
        activity: updateActivitySquares(prev.activity, api),
        request: 'success',
        selected: {
          submissions: getSubmissionFormat(count, today),
          day: 0,
        },
      }));
    } catch (error) {
      setState({
        ...initialActivity,
        request: 'failure',
      });
    }
  }, [site, username]);

  useEffect(() => {
    getActivity();
  }, [getActivity]);

  const onItemPress = useCallback(
    (item: ActivityDay) => () => {
      setState((data) => ({
        ...data,
        selected: {
          submissions: getSubmissionFormat(item.count, item.date),
          day: item.date,
        },
      }));
    },
    [],
  );

  const onRetryPress = useCallback(() => getActivity(), [getActivity]);

  const renderItem = useCallback(
    ({item, index}: {item: ActivityWeek; index: number}) => (
      <Week
        max={state.activity.max}
        item={item}
        index={index}
        size={size}
        margin={margin}
        onPress={onItemPress}
      />
    ),
    [state.activity.max, margin, onItemPress, size],
  );

  const keyExtractor = useCallback((item) => String(item[0].date), []);

  return state.request === 'failure' ? (
    <View>
      <Text title="Missing network connection" />
      <Button title="Retry" color="danger" onPress={onRetryPress} />
    </View>
  ) : (
    <View>
      {state.request === 'loading' && (
        <ActivityIndicator
          size="large"
          style={{
            backgroundColor: colorWithOpacity(color.background, 0.2),
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: 1,
          }}
        />
      )}
      <FlatList
        initialNumToRender={0}
        showsHorizontalScrollIndicator={false}
        data={state.activity.matrix}
        inverted
        horizontal
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <Text
        type="overline"
        emphasis="medium"
        secondary
        title={state.selected.submissions}
        center
        style={{paddingTop: Theme.padding.p03}}
      />
    </View>
  );
});

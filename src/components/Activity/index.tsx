import {ActivityIndicator, FlatList, View} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Theme} from '../../utils';
import {Text} from '../Text';
import {Button} from '../Button';
import {Card} from '../Card';
import {TouchableOpacity} from '../TouchableOpacity';
import {ActivityDay} from './Day';
import {ActivityWeek, Week} from './Week';
import {
  getActivitySquares,
  getApiActivity,
  getDateFormat,
  getSubmissionFormat,
  updateActivitySquares,
} from './utils';

interface Props {
  username: string;
  site: Site;
  size?: number;
  margin?: number;
  title: string;
}

export type Site = 'github' | 'leetCode' | 'hackerRank' | 'gitlab' | 'random';

export type ActivityMatrix = Array<ActivityWeek>;

type ActivityModel = {
  activity: {
    matrix: ActivityMatrix;
    max: number;
    total: number;
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
  title,
}: Props) {
  const [state, setState] = useState<ActivityModel>(initialActivity);
  const keyExtractor = useCallback((item) => String(item[0].date), []);

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
          submissions: getSubmissionFormat(item.count, item.date),
          day: item.date,
        },
      }));
    },
    [],
  );

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

  return (
    <Card>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: Theme.padding.p04,
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={refresh}>
          <Text type="h4" emphasis="medium" title={title} />
        </TouchableOpacity>
        {!state.activity.total ? null : (
          <Text
            type="overline"
            emphasis="medium"
            title={`${state.activity.total} submissions`}
          />
        )}
      </View>
      {state.request === 'loading' ? (
        <ActivityIndicator size="large" />
      ) : state.request === 'failure' ? (
        <View>
          <Text title="Missing network connection" />
          <Button title="Retry" color="danger" onPress={refresh} />
        </View>
      ) : (
        <View>
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
      )}
    </Card>
  );
});

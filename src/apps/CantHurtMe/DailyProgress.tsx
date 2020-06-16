import dayjs from 'dayjs';
import React, {memo, useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {Icon, Text} from '../../components';
import {Theme} from '../../utils';
import {useColor} from '../../hooks';

const generateHistory = () => {
  const data = [];
  for (let i = 2; i >= -20; i--) {
    data.push({date: dayjs().add(i, 'day')});
  }
  return data;
};

export const DailyProgress = memo(function DailyProgress() {
  const data = generateHistory();
  const color = useColor();

  const renderItem = useCallback(
    ({item}) => (
      <View>
        <Icon
          color={
            item.date.isSame(dayjs(), 'day')
              ? color.success
              : item.date > dayjs()
              ? color.secondary
              : color.danger
          }
          name={
            item.date.isSame(dayjs(), 'day')
              ? 'check'
              : item.date > dayjs()
              ? 'cancel'
              : 'close'
          }
          style={{alignSelf: 'center'}}
        />
        <View
          style={{
            borderTopColor: color.text,
            borderTopWidth: 2,
            margin: Theme.padding.p01,
            width: Theme.padding.p15,
          }}>
          <Text center title={item.date.format('MMM DD')} />
        </View>
      </View>
    ),
    [color.danger, color.secondary, color.success, color.text],
  );

  const keyExtractor = useCallback((item) => String(item.date), []);

  return (
    <FlatList
      data={data}
      horizontal
      inverted
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
});

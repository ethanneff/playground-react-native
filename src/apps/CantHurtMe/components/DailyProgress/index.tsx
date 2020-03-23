import dayjs from 'dayjs';
import React, { memo, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Text, Icon } from '../../../../components';
import { Theme } from '../../../../utils';
import { useColor } from '../../../../hooks';

const generateHistory = () => {
  const data = [];
  for (let i = 2; i >= -20; i--) {
    data.push({ date: dayjs().add(i, 'day') });
  }
  return data;
};

export const DailyProgress = memo(function DailyProgress() {
  const data = generateHistory();
  const color = useColor();

  const renderItem = useCallback(
    ({ item }) => (
      <View>
        <Icon
          style={{ alignSelf: 'center' }}
          name={
            item.date.isSame(dayjs(), 'day')
              ? 'check'
              : item.date > dayjs()
              ? 'cancel'
              : 'close'
          }
          color={
            item.date.isSame(dayjs(), 'day')
              ? color.success
              : item.date > dayjs()
              ? color.secondary
              : color.danger
          }
          onPress={() => undefined}
        />
        <View
          style={{
            borderTopColor: color.text,
            borderTopWidth: 2,
            margin: Theme.padding.p01,
            width: Theme.padding.p15,
          }}
        >
          <Text title={item.date.format('MMM DD')} center />
        </View>
      </View>
    ),
    [color.danger, color.secondary, color.success, color.text]
  );

  const keyExtractor = useCallback(item => String(item.date), []);

  return (
    <FlatList
      horizontal
      keyExtractor={keyExtractor}
      inverted
      data={data}
      renderItem={renderItem}
    />
  );
});

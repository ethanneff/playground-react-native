import dayjs, { type Dayjs } from 'dayjs';
import React, { memo, useCallback, useState } from 'react';
import {
  FlatList,
  type FlatListRenderItem,
  Icon,
  Text,
  TouchableOpacity,
  View,
} from '../../components';
import { spacing, useColors } from '../../features';

const generateHistory = () => {
  const data = [];
  for (let i = 2; i >= -20; i--) data.push({ date: dayjs().add(i, 'day') });

  return data;
};

type Item = {
  date: Dayjs;
};

type ProgressItemProps = {
  item: Item;
};

const ProgressItem = ({ item }: ProgressItemProps) => {
  const colors = useColors();
  const [dateFormat, setDateFormat] = useState('ddd');
  const onPress = useCallback(() => {
    setDateFormat((prev) => (prev === 'ddd' ? 'MMM DD' : 'ddd'));
  }, []);
  const iconColor = item.date.isSame(dayjs(), 'day')
    ? 'positive'
    : item.date > dayjs()
    ? 'tertiary'
    : 'negative';
  const iconName = item.date.isSame(dayjs(), 'day')
    ? 'check'
    : item.date > dayjs()
    ? 'cancel'
    : 'close';

  return (
    <TouchableOpacity onPress={onPress}>
      <Icon
        color={iconColor}
        name={iconName}
        style={{ alignSelf: 'center' }}
      />
      <View
        style={{
          borderTopColor: colors.border.primaryA,
          borderTopWidth: 2,
          margin: spacing(1),
          width: spacing(12),
        }}
      >
        <Text
          center
          title={item.date.format(dateFormat)}
        />
      </View>
    </TouchableOpacity>
  );
};

export const DailyProgress = memo(function DailyProgress() {
  const data: Item[] = generateHistory();

  const renderItem = useCallback<FlatListRenderItem<Item>>(
    ({ item }) => <ProgressItem item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Item) => String(item.date), []);

  return (
    <FlatList
      data={data}
      estimatedItemSize={56}
      horizontal
      inverted
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps="handled"
      renderItem={renderItem}
    />
  );
});

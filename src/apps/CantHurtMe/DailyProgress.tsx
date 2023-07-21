import add from 'date-fns/add';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import React, { useCallback, useState } from 'react';
import {
  FlashList,
  Icon,
  Pressable,
  Text,
  View,
  type FlashListRenderItem,
} from '../../components';
import { spacing, useColors } from '../../features';

const generateHistory = () => {
  const today = new Date();
  const data = [];
  for (let i = 2; i >= -20; i--) {
    data.push({ date: add(today, { days: i }) });
  }

  return data;
};

type Item = {
  date: Date;
};

type ProgressItemProps = {
  readonly item: Item;
};

const ProgressItem = ({ item }: ProgressItemProps) => {
  const today = new Date();
  const colors = useColors();
  const [visibleDate, setVisibleDate] = useState(false);
  const onPress = useCallback(() => {
    setVisibleDate((prev) => !prev);
  }, []);
  const iconColor = isSameDay(today, item.date)
    ? 'positive'
    : item.date > today
    ? 'tertiary'
    : 'negative';
  const iconName = isSameDay(today, item.date)
    ? 'check'
    : item.date > today
    ? 'cancel'
    : 'close';

  return (
    <Pressable onPress={onPress}>
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
          width: spacing(15),
        }}
      >
        <Text
          center
          style={{
            opacity: visibleDate ? 1 : 0,
            width: '100%',
          }}
          title={format(item.date, 'EEE')}
        />
        <Text
          center
          style={{
            opacity: visibleDate ? 0 : 1,
            position: 'absolute',
            width: '100%',
          }}
          title={format(item.date, 'MMM dd')}
        />
      </View>
    </Pressable>
  );
};

export const DailyProgress = () => {
  const data: Item[] = generateHistory();

  const renderItem = useCallback<FlashListRenderItem<Item>>(
    ({ item }) => <ProgressItem item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Item) => String(item.date), []);

  return (
    <FlashList
      data={data}
      estimatedItemSize={56}
      horizontal
      inverted
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

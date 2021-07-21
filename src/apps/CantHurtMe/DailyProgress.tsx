import dayjs, {Dayjs} from 'dayjs';
import React, {memo, useCallback, useState} from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';
import {Icon, Text, TouchableOpacity} from '../../components';
import {useColor} from '../../hooks';
import {padding} from '../../utils';

const generateHistory = () => {
  const data = [];
  for (let i = 2; i >= -20; i--) data.push({date: dayjs().add(i, 'day')});

  return data;
};

type Item = {
  date: Dayjs;
};

type ProgressItemProps = {
  item: Item;
};

const ProgressItem = ({item}: ProgressItemProps) => {
  const color = useColor();
  const [dateFormat, setDateFormat] = useState('ddd');
  const onPress = useCallback(() => {
    setDateFormat(prev => (prev === 'ddd' ? 'MMM DD' : 'ddd'));
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
      <Icon color={iconColor} name={iconName} style={{alignSelf: 'center'}} />
      <View
        style={{
          borderTopColor: color.border.primaryA,
          borderTopWidth: 2,
          margin: padding(1),
          width: padding(12),
        }}>
        <Text center title={item.date.format(dateFormat)} />
      </View>
    </TouchableOpacity>
  );
};

export const DailyProgress = memo(function DailyProgress() {
  const data: Item[] = generateHistory();

  const renderItem = useCallback<ListRenderItem<Item>>(
    ({item}) => <ProgressItem item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Item) => String(item.date), []);

  return (
    <FlatList
      data={data}
      horizontal
      inverted
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps="handled"
      renderItem={renderItem}
    />
  );
});

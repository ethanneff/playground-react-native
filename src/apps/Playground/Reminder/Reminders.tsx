import {FlatList} from 'react-native';
import React, {memo, useCallback} from 'react';
import {Text} from '../../../components';
import {Reminder} from '.';

interface Props {
  reminders: Reminder[];
}

export const Reminders = memo(function Reminders({reminders}: Props) {
  const renderItem = useCallback(
    ({item, index}) => (
      <Text
        title={item.format}
        type={index === reminders.length - 1 ? 'button' : undefined}
      />
    ),
    [reminders],
  );

  const keyExtractor = useCallback((item: Reminder) => item.id, []);

  return (
    <FlatList
      data={reminders}
      inverted
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      style={{flex: 1}}
    />
  );
});

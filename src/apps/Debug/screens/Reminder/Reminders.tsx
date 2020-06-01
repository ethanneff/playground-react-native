import {FlatList} from 'react-native';
import React, {memo, useCallback} from 'react';
import {Text} from '../../../../components';
import {Reminder} from '.';

interface Props {
  reminders: Reminder[];
}

export default memo(function Reminders(props: Props) {
  const renderItem = useCallback(
    ({item, index}) => (
      <Text
        title={item.format}
        type={index === props.reminders.length - 1 ? 'button' : undefined}
      />
    ),
    [props],
  );

  return (
    <FlatList
      inverted
      keyExtractor={(item) => item.id}
      style={{flex: 1}}
      data={props.reminders}
      renderItem={renderItem}
    />
  );
});

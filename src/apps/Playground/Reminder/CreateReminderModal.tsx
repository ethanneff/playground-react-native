import React, {memo, useCallback, useState} from 'react';
import {Dayjs} from 'dayjs';
import {StyleSheet} from 'react-native';
import {Button, Modal, Text} from '../../../components';
import {Theme} from '../../../utils';
import OneTime from './OneTime';
import Radio from './Radio';
import Location from './Location';
import Repeat from './Repeat';

type ReminderType = 'One time' | 'Repeat' | 'Location';
const reminderTypes: ReminderType[] = ['One time', 'Repeat', 'Location'];

interface Props {
  onBackgroundPress: () => void;
  onOneTimePress: (date: Dayjs) => () => void; // TODO: handle models better so don't have to pass up to parent
  onLocationPress: (id: string) => () => void;
}

export default memo(function CreateReminderModal({
  onBackgroundPress,
  onOneTimePress,
}: Props) {
  const [state, setState] = useState<ReminderType>('One time');
  const styles = StyleSheet.create({
    section: {
      paddingBottom: Theme.padding.p02,
      paddingTop: Theme.padding.p06,
    },
    submit: {
      marginTop: Theme.padding.p06,
    },
  });

  const handleReminderTypePress = useCallback(
    (type) => () => setState(type),
    [],
  );

  return (
    <Modal onBackgroundPress={onBackgroundPress}>
      <Text title="Create Reminder" type="h2" />
      <Text style={styles.section} title="Reminder type" type="caption" />
      <Radio
        buttons={reminderTypes}
        onChange={handleReminderTypePress}
        value={state}
      />
      <Text style={styles.section} title="Reminder time" type="caption" />
      {state === 'One time' ? (
        <OneTime onPress={onOneTimePress} />
      ) : state === 'Repeat' ? (
        <Repeat />
      ) : state === 'Location' ? (
        <Location />
      ) : (
        <Text title="invalid form type" />
      )}
      <Button
        buttonStyle={styles.submit}
        color="primary"
        disable
        emphasis="high"
        title="submit"
      />
    </Modal>
  );
});

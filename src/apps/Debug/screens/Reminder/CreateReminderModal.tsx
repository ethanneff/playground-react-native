import React, {memo, useCallback, useState} from 'react';
import {Button, Modal, Text} from '../../../../components';
import OneTime from './OneTime';
import Radio from './Radio';
import {Dayjs} from 'dayjs';
import Location from './Location';
import Repeat from './Repeat';
import {Theme} from '../../../../utils';
import {StyleSheet} from 'react-native';

type ReminderType = 'One time' | 'Repeat' | 'Location';
const reminderTypes: ReminderType[] = ['One time', 'Repeat', 'Location'];

interface Props {
  onBackgroundPress: () => void;
  onOneTimePress: (date: Dayjs) => () => void; // TODO: handle models better so don't have to pass up to parent
  onLocationPress: (id: string) => () => void;
}

export default memo(function CreateReminderModal(props: Props) {
  const [state, setState] = useState<ReminderType>('One time');
  const styles = StyleSheet.create({
    section: {
      paddingTop: Theme.padding.p06,
      paddingBottom: Theme.padding.p02,
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
    <Modal onBackgroundPress={props.onBackgroundPress}>
      <Text type="h2" title="Create Reminder" />
      <Text type="caption" title="Reminder type" style={styles.section} />
      <Radio
        buttons={reminderTypes}
        value={state}
        onChange={handleReminderTypePress}
      />
      <Text type="caption" title="Reminder time" style={styles.section} />
      {state === 'One time' ? (
        <OneTime onPress={props.onOneTimePress} />
      ) : state === 'Repeat' ? (
        <Repeat />
      ) : state === 'Location' ? (
        <Location />
      ) : (
        <Text title="invalid form type" />
      )}
      <Button
        disable
        title="submit"
        color="primary"
        emphasis="high"
        buttonStyle={styles.submit}
      />
    </Modal>
  );
});

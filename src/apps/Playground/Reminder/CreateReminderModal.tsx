import { Dayjs } from 'dayjs';
import React, { memo, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Modal, Text } from '../../../components';
import { padding } from '../../../features';
import { Location } from './Location';
import { OneTime } from './OneTime';
import { Radio } from './Radio';
import { Repeat } from './Repeat';

type ReminderType = 'One time' | 'Repeat' | 'Location';
const reminderTypes: ReminderType[] = ['One time', 'Repeat', 'Location'];

type Props = {
  onBackgroundPress: () => void;
  onOneTimePress: (date: Dayjs) => () => void; // TODO: handle models better so don't have to pass up to parent
  onLocationPress: (id: string) => () => void;
};

export const CreateReminderModal = memo(function CreateReminderModal({
  onBackgroundPress,
  onOneTimePress,
  onLocationPress,
}: Props) {
  const [state, setState] = useState<ReminderType>('One time');
  const styles = StyleSheet.create({
    section: {
      paddingBottom: padding(2),
      paddingTop: padding(6),
    },
    submit: {
      marginTop: padding(6),
    },
  });

  const handleReminderTypePress = useCallback(
    (type) => () => setState(type),
    [],
  );

  return (
    <Modal onBackgroundPress={onBackgroundPress} showOverlay>
      <Text title="Create Reminder" type="h4" />
      <Text style={styles.section} title="Reminder type" type="overline" />
      <Radio
        buttons={reminderTypes}
        onChange={handleReminderTypePress}
        value={state}
      />
      <Text style={styles.section} title="Reminder time" type="overline" />
      {state === 'One time' ? (
        <OneTime onPress={onOneTimePress} />
      ) : state === 'Repeat' ? (
        <Repeat />
      ) : state === 'Location' ? (
        <Location onPress={onLocationPress} />
      ) : (
        <Text title="invalid form type" />
      )}
      <Button
        buttonStyle={styles.submit}
        color="accent"
        disabled
        emphasis="high"
        title="submit"
      />
    </Modal>
  );
});

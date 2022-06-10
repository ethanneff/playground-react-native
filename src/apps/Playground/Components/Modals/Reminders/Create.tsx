import { Dayjs } from 'dayjs';
import React, { memo, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Modal, Text } from '../../../../../components';
import { padding } from '../../../../../features';
import { Location } from './Location';
import { OneTime } from './OneTime';
import { Radio } from './Radio';
import { Repeat } from './Repeat';
import { ReminderType } from './types';

const reminderTypes: ReminderType[] = ['one time', 'repeat', 'location'];

type Props = {
  onBackgroundPress: () => void;
  onLocationPress: (id: string) => () => void;
  onOneTimePress: (date: Dayjs) => () => void;
};

export const Create = memo(function Create({
  onBackgroundPress,
  onOneTimePress,
  onLocationPress,
}: Props) {
  const [state, setState] = useState<ReminderType>('one time');
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
    (type: ReminderType) => () => setState(type),
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
      {state === 'one time' ? (
        <OneTime onPress={onOneTimePress} />
      ) : state === 'repeat' ? (
        <Repeat />
      ) : state === 'location' ? (
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
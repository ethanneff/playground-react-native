import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button, Modal, Text } from '../../../../../components';
import { spacing } from '../../../../../features';
import { Location } from './Location';
import { OneTime } from './OneTime';
import { Radio } from './Radio';
import { Repeat } from './Repeat';
import { type ReminderType } from './types';

const reminderTypes: ReminderType[] = ['one time', 'repeat', 'location'];

type Properties = {
  readonly onBackgroundPress: () => void;
  readonly onLocationPress: (id: string) => () => void;
  readonly onOneTimePress: (date: Date) => () => void;
};

export const Create = ({
  onBackgroundPress,
  onLocationPress,
  onOneTimePress,
}: Properties) => {
  const [state, setState] = useState<ReminderType>('one time');
  const styles = StyleSheet.create({
    section: {
      paddingBottom: spacing(2),
      paddingTop: spacing(6),
    },
    submit: {
      marginTop: spacing(6),
    },
  });

  const handleReminderTypePress = useCallback(
    (type: ReminderType) => () => {
      setState(type);
    },
    [],
  );

  const handlePress = useCallback(() => {
    Alert.alert('here');
  }, []);

  return (
    <Modal
      onBackgroundPress={onBackgroundPress}
      showOverlay
    >
      <Text
        title="Create Reminder"
        type="h4"
      />
      <Text
        style={styles.section}
        title="Reminder type"
        type="overline"
      />
      <Radio
        buttons={reminderTypes}
        onChange={handleReminderTypePress}
        value={state}
      />
      <Text
        style={styles.section}
        title="Reminder time"
        type="overline"
      />
      {state === 'one time' ? (
        <OneTime onPress={onOneTimePress} />
      ) : state === 'repeat' ? (
        <Repeat />
      ) : (
        <Location onPress={onLocationPress} />
      )}
      <Button
        buttonStyle={styles.submit}
        color="accent"
        disabled
        emphasis="high"
        onPress={handlePress}
        title="submit"
      />
    </Modal>
  );
};

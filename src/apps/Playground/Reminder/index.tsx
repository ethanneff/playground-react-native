import {useNavigation} from '@react-navigation/native';
import dayjs, {Dayjs} from 'dayjs';
import React, {memo, useCallback, useState} from 'react';
import {v4} from 'uuid';
import {Button, Modal, Screen, Text} from '../../../components';
import {RateApp} from '../../../features';
import {CreateReminderModal} from './CreateReminderModal';
import {Reminders} from './Reminders';
import {Reminder, ReminderType} from './types';

type State = {
  type: ReminderType;
  reminders: Reminder[];
  modals: {
    customDate: boolean;
    createReminder: boolean;
    location: boolean;
  };
  selected: {
    location: string | undefined;
  };
};

export const ReminderExample = memo(function PlaygroundReminder() {
  const {goBack} = useNavigation();
  const [form, setForm] = useState<State>({
    type: 'one time',
    reminders: [],
    modals: {
      customDate: false,
      createReminder: false,
      location: false,
    },
    selected: {
      location: undefined,
    },
  });

  const handleOneTimeReminder = useCallback(
    (date: Dayjs) => () => {
      if (date.isBefore(dayjs())) {
        setForm((prev) => ({
          ...prev,
          modals: {...prev.modals, customDate: true},
        }));
        return;
      }
      setForm((prev) => ({
        ...prev,
        modals: {
          ...prev.modals,
          createReminder: false,
        },
        reminders: [
          ...prev.reminders,
          {
            id: v4(),
            date: date.valueOf(),
            format: date.format('MMM DD, YYYY hh:mm A'),
          },
        ],
      }));
    },
    [],
  );

  const handleCustomDateClose = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      modals: {...prev.modals, customDate: false},
    }));
  }, []);

  const handleCreateReminder = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      modals: {...prev.modals, createReminder: true},
    }));
  }, []);

  const handleCreateReminderClose = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      modals: {...prev.modals, createReminder: false},
    }));
  }, []);

  const handleLocation = useCallback(
    (id: string) => () => {
      setForm((prev) => ({
        ...prev,
        modals: {...prev.modals, location: true},
        selected: {location: id},
      }));
    },
    [],
  );

  const handleLocationClose = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      modals: {...prev.modals, location: false},
    }));
  }, []);

  const [showRate, setShowRate] = useState(false);

  const handleRate = (value: boolean) => () => setShowRate(value);
  const navBack = useCallback(() => goBack(), [goBack]);

  return (
    <>
        <Button onPress={handleCreateReminder} title="create reminder" />
        <Text center title="reminders" type="h2" />
        <Reminders reminders={form.reminders} />
        <Button onPress={handleRate(true)} title="press me" />
      <Screen dropShadow onLeftPress={navBack} title="Reminder">
      </Screen>
      {showRate && <RateApp onComplete={handleRate(false)} />}
      {form.modals.createReminder && (
        <CreateReminderModal
          onBackgroundPress={handleCreateReminderClose}
          onLocationPress={handleLocation}
          onOneTimePress={handleOneTimeReminder}
        />
      )}
      {form.modals.customDate && (
        <Modal onBackgroundPress={handleCustomDateClose}>
          <Text title="hello" />
        </Modal>
      )}
      {form.modals.location && (
        <Modal onBackgroundPress={handleLocationClose}>
          <Text title="location" />
        </Modal>
      )}
    </>
  );
});

import {useNavigation} from '@react-navigation/native';
import dayjs, {Dayjs} from 'dayjs';
import React, {memo, useCallback, useState} from 'react';
import {v4} from 'uuid';
import {Button, Modal, Screen, Text} from '../../../components';
import {ScrollView} from '../../../conversions';
import {RateApp} from '../../../features';
import {useColor} from '../../../hooks';
import {CreateReminderModal} from './CreateReminderModal';
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
        setForm(prev => ({
          ...prev,
          modals: {...prev.modals, customDate: true},
        }));
        return;
      }
      setForm(prev => ({
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
    setForm(prev => ({
      ...prev,
      modals: {...prev.modals, customDate: false},
    }));
  }, []);

  const handleCreateReminder = useCallback(() => {
    setForm(prev => ({
      ...prev,
      modals: {...prev.modals, createReminder: true},
    }));
  }, []);

  const handleCreateReminderClose = useCallback(() => {
    setForm(prev => ({
      ...prev,
      modals: {...prev.modals, createReminder: false},
    }));
  }, []);

  const handleLocation = useCallback(
    (id: string) => () => {
      setForm(prev => ({
        ...prev,
        modals: {...prev.modals, location: true},
        selected: {location: id},
      }));
    },
    [],
  );

  const handleLocationClose = useCallback(() => {
    setForm(prev => ({
      ...prev,
      modals: {...prev.modals, location: false},
    }));
  }, []);

  const [showRate, setShowRate] = useState(false);

  const handleRate = (value: boolean) => () => setShowRate(value);

  const color = useColor();
  return (
    <>
      <Screen dropShadow onLeftPress={goBack} title="Reminder">
        <ScrollView style={{backgroundColor: color.background.secondary}}>
          <Text center emphasis="low" title="Modals" type="h4" />
          <Button
            center
            color="accent"
            onPress={handleCreateReminder}
            title="create reminder"
          />
          <Button
            center
            color="accent"
            onPress={handleRate(true)}
            title="rate me"
          />
          <Text center emphasis="low" title="Reminders" type="h4" />
          {form.reminders.map((reminder, index) => (
            <Text
              key={reminder.id}
              title={reminder.format}
              type={index === form.reminders.length - 1 ? 'button' : undefined}
            />
          ))}
        </ScrollView>
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
        <Modal onBackgroundPress={handleCustomDateClose} showOverlay>
          <Text title="hello" />
        </Modal>
      )}
      {form.modals.location && (
        <Modal onBackgroundPress={handleLocationClose} showOverlay>
          <Text title="location" />
        </Modal>
      )}
    </>
  );
});

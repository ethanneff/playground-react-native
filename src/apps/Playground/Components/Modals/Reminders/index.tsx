import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useState } from 'react';
import { v4 } from 'uuid';
import { Modal, Text } from '../../../../../components';
import { Create } from './Create';
import { Reminder, ReminderType } from './types';

type State = {
  modals: {
    createReminder: boolean;
    customDate: boolean;
    location: boolean;
  };
  reminders: Reminder[];
  selected: {
    location: string | undefined;
  };
  type: ReminderType;
};

type Props = {
  onComplete: () => void;
};

export const Reminders = ({ onComplete }: Props) => {
  const [form, setForm] = useState<State>({
    type: 'one time',
    reminders: [],
    modals: {
      customDate: false,
      createReminder: true,
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
          modals: { ...prev.modals, customDate: true },
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
      onComplete();
    },
    [onComplete],
  );

  const handleCustomDateClose = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      modals: { ...prev.modals, customDate: false },
    }));
  }, []);

  const handleCreateReminderClose = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      modals: { ...prev.modals, createReminder: false },
    }));
  }, []);

  const handleLocation = useCallback(
    (id: string) => () => {
      setForm((prev) => ({
        ...prev,
        modals: { ...prev.modals, location: true },
        selected: { location: id },
      }));
    },
    [],
  );

  const handleLocationClose = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      modals: { ...prev.modals, location: false },
    }));
  }, []);

  return (
    <>
      {form.modals.createReminder ? (
        <Create
          onBackgroundPress={handleCreateReminderClose}
          onLocationPress={handleLocation}
          onOneTimePress={handleOneTimeReminder}
        />
      ) : null}
      {form.modals.customDate ? (
        <Modal onBackgroundPress={handleCustomDateClose} showOverlay>
          <Text title="hello" />
        </Modal>
      ) : null}
      {form.modals.location ? (
        <Modal onBackgroundPress={handleLocationClose} showOverlay>
          <Text title="location" />
        </Modal>
      ) : null}
    </>
  );
};

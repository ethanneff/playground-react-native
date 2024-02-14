import { format, isBefore } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { v4 } from 'uuid';
import { Modal, Text } from '../../../../../components';
import { Create } from './Create';
import { type Reminder, type ReminderType } from './types';

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

type Properties = {
  readonly onComplete: () => void;
};

export const Reminders = ({ onComplete }: Properties) => {
  const [form, setForm] = useState<State>({
    modals: {
      createReminder: true,
      customDate: false,
      location: false,
    },
    reminders: [],
    selected: {
      location: undefined,
    },
    type: 'one time',
  });

  const handleOneTimeReminder = useCallback(
    (date: Date) => () => {
      if (isBefore(date, new Date())) {
        setForm((previous) => ({
          ...previous,
          modals: { ...previous.modals, customDate: true },
        }));
        return;
      }
      setForm((previous) => ({
        ...previous,
        modals: {
          ...previous.modals,
          createReminder: false,
        },
        reminders: [
          ...previous.reminders,
          {
            date: date.valueOf(),
            format: format(date, 'MMM dd, yyyy hh:mm A'),
            id: v4(),
          },
        ],
      }));
      onComplete();
    },
    [onComplete],
  );

  const handleCustomDateClose = useCallback(() => {
    setForm((previous) => ({
      ...previous,
      modals: { ...previous.modals, customDate: false },
    }));
  }, []);

  const handleCreateReminderClose = useCallback(() => {
    setForm((previous) => ({
      ...previous,
      modals: { ...previous.modals, createReminder: false },
    }));
  }, []);

  const handleLocation = useCallback(
    (id: string) => () => {
      setForm((previous) => ({
        ...previous,
        modals: { ...previous.modals, location: true },
        selected: { location: id },
      }));
    },
    [],
  );

  const handleLocationClose = useCallback(() => {
    setForm((previous) => ({
      ...previous,
      modals: { ...previous.modals, location: false },
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
        <Modal
          onBackgroundPress={handleCustomDateClose}
          showOverlay
        >
          <Text title="hello" />
        </Modal>
      ) : null}
      {form.modals.location ? (
        <Modal
          onBackgroundPress={handleLocationClose}
          showOverlay
        >
          <Text title="location" />
        </Modal>
      ) : null}
    </>
  );
};

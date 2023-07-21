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

type Props = {
  readonly onComplete: () => void;
};

export const Reminders = ({ onComplete }: Props) => {
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

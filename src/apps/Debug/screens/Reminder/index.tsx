import React, { memo, useState, useCallback } from "react";
import { Screen, Text, Button, Modal } from "../../../../components";
import { useNav } from "../../../../hooks";
import dayjs, { Dayjs } from "dayjs";
import Reminders from "./Reminders";
import CreateReminderModal from "./CreateReminderModal";
import "react-native-get-random-values";
import { v4 } from "uuid";
import { RateApp } from "../../../../features";

type ReminderType = "one time" | "repeat" | "location";
export type Reminder = {
  id: string;
  date: number;
  format: string;
};
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

export default memo(function DebugReminder() {
  const nav = useNav();
  const [form, setForm] = useState<State>({
    type: "one time",
    reminders: [],
    modals: {
      customDate: false,
      createReminder: false,
      location: false
    },
    selected: {
      location: undefined
    }
  });

  const handleOneTimeReminder = useCallback(
    (date: Dayjs) => () => {
      if (date.isBefore(dayjs())) {
        setForm(prev => ({
          ...prev,
          modals: { ...prev.modals, customDate: true }
        }));
        return;
      }
      setForm(prev => ({
        ...prev,
        modals: {
          ...prev.modals,
          createReminder: false
        },
        reminders: [
          ...prev.reminders,
          {
            id: v4(),
            date: date.valueOf(),
            format: date.format("MMM DD, YYYY hh:mm A")
          }
        ]
      }));
    },
    []
  );

  const handleCustomDateClose = useCallback(() => {
    setForm(prev => ({
      ...prev,
      modals: { ...prev.modals, customDate: false }
    }));
  }, []);

  const handleCreateReminder = useCallback(() => {
    setForm(prev => ({
      ...prev,
      modals: { ...prev.modals, createReminder: true }
    }));
  }, []);

  const handleCreateReminderClose = useCallback(() => {
    setForm(prev => ({
      ...prev,
      modals: { ...prev.modals, createReminder: false }
    }));
  }, []);

  const handleLocation = useCallback(
    (id: string) => () => {
      setForm(prev => ({
        ...prev,
        modals: { ...prev.modals, location: true },
        selected: { location: id }
      }));
    },
    []
  );

  const handleLocationClose = useCallback(() => {
    setForm(prev => ({
      ...prev,
      modals: { ...prev.modals, location: false }
    }));
  }, []);

  const [showRate, setShowRate] = useState(false);

  return (
    <>
      <Screen onLeftPress={nav.to("debug")} title="Reminder">
        <Button title="create reminder" onPress={handleCreateReminder} />
        <Text h2 title="reminders" center />
        <Reminders reminders={form.reminders} />
        <Button title="press me" onPress={() => setShowRate(true)} />
      </Screen>
      {showRate && <RateApp onComplete={() => setShowRate(false)} />}
      {form.modals.createReminder && 
        <CreateReminderModal
          onBackgroundPress={handleCreateReminderClose}
          onOneTimePress={handleOneTimeReminder}
          onLocationPress={handleLocation}
        />
      }
      {form.modals.customDate && 
        <Modal onBackgroundPress={handleCustomDateClose}>
          <Text title="hello" />
        </Modal>
      }
      {form.modals.location && 
        <Modal onBackgroundPress={handleLocationClose}>
          <Text title="location" />
        </Modal>
      }
    </>
  );
});

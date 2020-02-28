import React, { memo, useState, useCallback } from "react";
import { Screen, Text, Button, Modal } from "../../../../components";
import { useNav } from "../../../../hooks";
import dayjs, { Dayjs } from "dayjs";
import Reminders from "./Reminders";
import CreateReminderModal from "./CreateReminderModal";

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
  };
};

export default memo(function DebugReminder() {
  const nav = useNav();
  const [form, setForm] = useState<State>({
    type: "one time",
    reminders: [],
    modals: {
      customDate: false,
      createReminder: false
    }
  });

  const handleOneTimeReminder = useCallback(
    (date: Dayjs) => () => {
      if (date.isBefore(dayjs())) {
        setForm(prev => ({
          ...prev,
          modals: { ...prev.modals, createReminder: false, customDate: true }
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
            id: String(Date.now()),
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

  return (
    <>
      <Screen onLeftPress={nav.to("debug")} title="Reminder">
        <Button title="create reminder" onPress={handleCreateReminder} />
        <Text h2 title="Reminders" center />
        <Reminders reminders={form.reminders} />
      </Screen>
      {form.modals.customDate && 
        <Modal onBackgroundPress={handleCustomDateClose}>
          <Text title="hello" />
        </Modal>
      }
      {form.modals.createReminder && 
        <CreateReminderModal
          onBackgroundPress={handleCreateReminderClose}
          onOneTimePress={handleOneTimeReminder}
        />
      }
    </>
  );
});

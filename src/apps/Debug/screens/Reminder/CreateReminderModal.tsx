import React, { memo, useState, useCallback } from "react";
import { Text, Modal } from "../../../../components";
import OneTime from "./OneTime";
import Radio from "./Radio";
import { Dayjs } from "dayjs";
import Location from "./Location";
import Repeat from "./Repeat";
import { View } from "react-native";

type ReminderType = "one time" | "repeat" | "location";
const reminderTypes: ReminderType[] = ["one time", "repeat", "location"];

interface Props {
  onBackgroundPress: () => void;
  onOneTimePress: (date: Dayjs) => () => void; // TODO: handle models better so don't have to pass up to parent
  onLocationPress: (id: string) => () => void;
}

export default memo(function CreateReminderModal(props: Props) {
  const [state, setState] = useState<ReminderType>("one time");

  const handleReminderTypePress = useCallback(type => () => setState(type), []);

  return (
    <Modal onBackgroundPress={props.onBackgroundPress} noScroll>
      <Text h2 title="Create Reminder" />
      <Text overline title="Reminder type" />
      <Radio
        horizontal
        buttons={reminderTypes}
        value={state}
        onChange={handleReminderTypePress}
      />
      {state === "one time" ? (
        <OneTime onPress={props.onOneTimePress} />
      ) : state === "repeat" ? (
        <Repeat />
      ) : state === "location" ? (
        <Location onLocationPress={props.onLocationPress} />
      ) : (
        <Text title="invalid form type" />
      )}
    </Modal>
  );
});

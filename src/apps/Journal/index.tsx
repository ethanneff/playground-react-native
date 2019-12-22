import React, { memo } from "react";
import { StyleSheet, ScrollView } from "react-native";
import {
  Screen,
  Text,
  TextInput,
  Card,
  Calendar,
  Activity
} from "../../components";
import { useColor, useNav } from "../../hooks";
import { Theme } from "../../utils";

export default memo(function Journal() {
  const color = useColor();
  const nav = useNav();
  const styles = StyleSheet.create({
    bottom: {
      paddingBottom: Theme.padding.p04
    }
  });

  return (
    <Screen onLeftPress={nav.to("portfolioLanding")} title="nope" gutter>
      <ScrollView>
        <Card>
          <Text h2 title="Activity" style={styles.bottom} />
          <Text style={styles.bottom} overline title="Hackerrank" />
          <Activity username="ethanneff" site="github" />
          <Text style={styles.bottom} overline title="Hackerrank" />
          <Activity username="ethanneff" site="leetcode" />
          <Text style={styles.bottom} overline title="Hackerrank" />
          <Activity username="ethanneff" site="hackerrank" />
        </Card>
        <Card>
          <Text h2 title="Calendar" style={styles.bottom} />
          <Calendar hiddenDays />
        </Card>
        <Card>
          <Text h2 title="Record" style={styles.bottom} />
          <Text
            overline
            title="one objective that will make everything easier"
            style={styles.bottom}
          />
          <TextInput
            title="Primary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <Text overline title="Additional objectives" style={styles.bottom} />
          <TextInput
            title="Secondary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="Secondary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="Secondary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <Text overline title="Bonus objectives" style={styles.bottom} />
          <TextInput
            title="tertiary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="tertiary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="tertiary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="tertiary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="tertiary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
        </Card>
        <Card>
          <Text h2 title="Review" style={styles.bottom} />
          <TextInput
            title="How likely are you to recommend this day?"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="Why did you give this score?"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
        </Card>
        <Card>
          <Text h2 title="Retro" style={styles.bottom} />
          <TextInput
            title="What went well?"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="What could be improved?"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="What will you commit to tomorrow?"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
        </Card>
      </ScrollView>
    </Screen>
  );
});

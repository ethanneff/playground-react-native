import React, {memo, useCallback, useState} from 'react';
import {ScrollView, Switch, View} from 'react-native';
import dayjs from 'dayjs';
import {Button, Screen, Text, TextInput} from '../../../../components';
import {useColor, useNav} from '../../../../hooks';
import {Theme} from '../../../../utils';
import {Section} from './Section';

// https://www.startupschool.org/updates/250717/edit

type Form = {
  launched: boolean;
  launchWeeks: string;
  usersTalkedTo: string;
  usersLearnedFrom: string;
  topGoals: string;
  primaryMetric: string;
  biggestObstacle: string;
  morale: string;
  targetCustomer: string;
};

const initialState: Form = {
  launched: false,
  launchWeeks: '',
  usersTalkedTo: '',
  usersLearnedFrom: '',
  topGoals: '',
  primaryMetric: '',
  biggestObstacle: '',
  morale: '',
  targetCustomer: '',
};

export default memo(function DebugStartup() {
  const color = useColor();
  const nav = useNav();
  const [form, setForm] = useState<Form>(initialState);
  const launchWeeks = parseInt(form.launchWeeks, 10);
  const launchSubText =
    launchWeeks >= 5
      ? "That's a long way out! Think hard: is there an MVP you could launch earlier?"
      : 'Almost there, looking forward to your launch!';

  const updateForm = useCallback(
    (key: keyof Form, value: string | boolean) =>
      setForm((state) => ({...state, [key]: value})),
    [],
  );
  const handleLaunchChange = useCallback(
    (value: boolean) => updateForm('launched', value),
    [updateForm],
  );
  const handleUserChange = useCallback(
    (value: string) => updateForm('usersTalkedTo', value),
    [updateForm],
  );
  const handleMoraleChange = useCallback(
    (value: string) => updateForm('morale', value),
    [updateForm],
  );
  const handleObstacleChange = useCallback(
    (value: string) => updateForm('biggestObstacle', value),
    [updateForm],
  );
  const handleLearnChange = useCallback(
    (value: string) => updateForm('usersLearnedFrom', value),
    [updateForm],
  );
  const handleMetricChange = useCallback(
    (value: string) => updateForm('primaryMetric', value),
    [updateForm],
  );
  const handleGoalChange = useCallback(
    (value: string) => updateForm('topGoals', value),
    [updateForm],
  );
  const handleWeeksToLaunchChange = useCallback(
    (value: string) => updateForm('launchWeeks', value),
    [updateForm],
  );

  const handleSubmit = useCallback(() => undefined, []);

  return (
    <Screen onLeftPress={nav.to('debug')} title="Weekly Update">
      <View
        style={{
          paddingBottom: Theme.padding.p04,
          borderBottomColor: color.secondary,
          borderBottomWidth: 2,
        }}>
        <Text type="h4" center title={dayjs().format('MMM DD, YYYY')} />
      </View>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: color.light,
          padding: Theme.padding.p04,
        }}>
        <Section title="Launch">
          <View>
            <Text title="Are you launched?" />
            <Switch value={form.launched} onValueChange={handleLaunchChange} />
          </View>
          <View>
            <TextInput
              title="Weeks to launch?"
              keyboardType="numeric"
              onChangeText={handleWeeksToLaunchChange}
              value={form.launchWeeks}
            />
            <Text title={launchSubText} hidden={launchSubText.length === 0} />
          </View>
        </Section>
        <Section title="Users">
          <TextInput
            title="Users/prospective users talked to this week?"
            onChangeText={handleUserChange}
            value={form.usersTalkedTo}
          />
          <TextInput
            title="What have you learned from them?"
            onChangeText={handleLearnChange}
            value={form.usersLearnedFrom}
          />
        </Section>
        <Section title="Goals">
          <TextInput
            title="What are your top 1-3 goals for the next week?"
            onChangeText={handleGoalChange}
            value={form.topGoals}
          />
          <TextInput
            title="What most improved your primary metric?"
            onChangeText={handleMetricChange}
            value={form.primaryMetric}
          />
          <TextInput
            title="Biggest obstacle?"
            onChangeText={handleObstacleChange}
            value={form.biggestObstacle}
          />
        </Section>
        <Section title="Morale">
          <TextInput
            title="On a scale of 1-10, what is your morale?"
            keyboardType="numeric"
            onChangeText={handleMoraleChange}
            value={form.morale} // 1 (we are totally burned out) to  10 (we couldn't be more excited and optimistic!)
          />
        </Section>
        <Button title="submit" onPress={handleSubmit} color="primary" />
      </ScrollView>
    </Screen>
  );
});

import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { memo, useCallback, useState } from 'react';
import { Switch } from 'react-native';
import { Button, Input, Screen, Text } from '../../../components';
import { ScrollView } from '../../../conversions';
import { padding, useColor } from '../../../features';
import { Section } from './Section';

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

export const Startup = memo(function PlaygroundStartup() {
  const color = useColor();
  const { goBack } = useNavigation();
  const [form, setForm] = useState<Form>(initialState);
  const launchWeeks = parseInt(form.launchWeeks, 10);
  const launchSubText =
    launchWeeks >= 5
      ? "That's a long way out! Think hard: is there an MVP you could launch earlier?"
      : 'Almost there, looking forward to your launch!';

  const updateForm = useCallback(
    (key: keyof Form, value: string | boolean) =>
      setForm(state => ({ ...state, [key]: value })),
    [],
  );
  const handleLaunchChange = useCallback(
    (value?: boolean) => updateForm('launched', !!value),
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
    <Screen dropShadow onLeftPress={goBack} title="Weekly Update">
      <ScrollView
        contentContainerStyle={{
          padding: padding(4),
        }}
        style={{ backgroundColor: color.background.secondary }}
      >
        <Text center title={dayjs().format('MMM DD, YYYY')} type="h4" />
        <Section title="Launch">
          <Text title="Are you launched?" />
          <Switch onValueChange={handleLaunchChange} value={form.launched} />
          <Input
            keyboardType="numeric"
            onChangeText={handleWeeksToLaunchChange}
            title="Weeks to launch?"
            value={form.launchWeeks}
          />
          <Text hidden={launchSubText.length === 0} title={launchSubText} />
        </Section>
        <Section title="Users">
          <Input
            onChangeText={handleUserChange}
            title="Users/prospective users talked to this week?"
            value={form.usersTalkedTo}
          />
          <Input
            onChangeText={handleLearnChange}
            title="What have you learned from them?"
            value={form.usersLearnedFrom}
          />
        </Section>
        <Section title="Goals">
          <Input
            onChangeText={handleGoalChange}
            title="What are your top 1-3 goals for the next week?"
            value={form.topGoals}
          />
          <Input
            onChangeText={handleMetricChange}
            title="What most improved your primary metric?"
            value={form.primaryMetric}
          />
          <Input
            onChangeText={handleObstacleChange}
            title="Biggest obstacle?"
            value={form.biggestObstacle}
          />
        </Section>
        <Section title="Morale">
          <Input
            keyboardType="numeric"
            onChangeText={handleMoraleChange}
            title="On a scale of 1-10, what is your morale?"
            value={form.morale} // 1 (we are totally burned out) to  10 (we couldn't be more excited and optimistic!)
          />
        </Section>
        <Button
          center
          color="accent"
          emphasis="high"
          onPress={handleSubmit}
          title="submit"
        />
      </ScrollView>
    </Screen>
  );
});

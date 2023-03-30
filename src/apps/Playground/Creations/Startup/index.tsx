import dayjs from 'dayjs';
import React, { memo, useCallback, useState } from 'react';
import {
  Button,
  Input,
  KeyboardAwareScrollView,
  Screen,
  Spacing,
  Switch,
  Text,
} from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { spacing, useColors } from '../../../../features';
import { Section } from './Section';

// https://www.startupschool.org/updates/250717/edit

type Form = {
  biggestObstacle: string;
  launchWeeks: string;
  launched: boolean;
  morale: string;
  primaryMetric: string;
  targetCustomer: string;
  topGoals: string;
  usersLearnedFrom: string;
  usersTalkedTo: string;
};

const initialState: Form = {
  biggestObstacle: '',
  launchWeeks: '',
  launched: false,
  morale: '',
  primaryMetric: '',
  targetCustomer: '',
  topGoals: '',
  usersLearnedFrom: '',
  usersTalkedTo: '',
};

export const Startup = memo(function PlaygroundStartup() {
  const colors = useColors();
  const { goBack } = useNavigation();
  const [form, setForm] = useState<Form>(initialState);
  const launchWeeks = parseInt(form.launchWeeks, 10);
  const launchSubText =
    launchWeeks >= 5
      ? "That's a long way out! Think hard: is there an MVP you could launch earlier?"
      : 'Almost there, looking forward to your launch!';

  const updateForm = useCallback((key: keyof Form, value: boolean | string) => {
    setForm((state) => ({ ...state, [key]: value }));
  }, []);
  const handleLaunchChange = useCallback(
    (value?: boolean) => {
      updateForm('launched', Boolean(value));
    },
    [updateForm],
  );
  const handleUserChange = useCallback(
    (value: string) => {
      updateForm('usersTalkedTo', value);
    },
    [updateForm],
  );
  const handleMoraleChange = useCallback(
    (value: string) => {
      updateForm('morale', value);
    },
    [updateForm],
  );
  const handleObstacleChange = useCallback(
    (value: string) => {
      updateForm('biggestObstacle', value);
    },
    [updateForm],
  );
  const handleLearnChange = useCallback(
    (value: string) => {
      updateForm('usersLearnedFrom', value);
    },
    [updateForm],
  );
  const handleMetricChange = useCallback(
    (value: string) => {
      updateForm('primaryMetric', value);
    },
    [updateForm],
  );
  const handleGoalChange = useCallback(
    (value: string) => {
      updateForm('topGoals', value);
    },
    [updateForm],
  );
  const handleWeeksToLaunchChange = useCallback(
    (value: string) => {
      updateForm('launchWeeks', value);
    },
    [updateForm],
  );

  const handleSubmit = useCallback(() => undefined, []);

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Weekly Update"
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ padding: spacing(4) }}
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: colors.background.secondary }}
      >
        <Text
          center
          title={dayjs().format('MMM DD, YYYY')}
          type="h4"
        />
        <Section title="Launch">
          <Text title="Are you launched?" />
          <Switch
            onValueChange={handleLaunchChange}
            value={form.launched}
          />
          <Spacing padding={2} />
          <Input
            keyboardType="numeric"
            onChangeText={handleWeeksToLaunchChange}
            title="Weeks to launch?"
            value={form.launchWeeks}
          />
          <Text
            hidden={launchSubText.length === 0}
            title={launchSubText}
          />
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
            value={form.morale} // 1 (we are totally burned out) to 10 (we couldn't be more excited and optimistic!)
          />
        </Section>
        <Spacing padding={2} />
        <Button
          center
          color="accent"
          emphasis="high"
          onPress={handleSubmit}
          title="submit"
        />
      </KeyboardAwareScrollView>
    </Screen>
  );
});

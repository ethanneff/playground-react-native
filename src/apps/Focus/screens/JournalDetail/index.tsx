import { RouteProp } from '@react-navigation/core';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useCallback, useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Card,
  Icon,
  Modal,
  Screen,
  ScrollView,
  Slider,
  Spacing,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
} from '../../../../components';
import { spacing, useColors, useDropShadow } from '../../../../features';
import { AuthStackRoutes } from '../../types';

type State = {
  commit: string;
  focus: boolean;
  goal: string;
  goalModal: boolean;
  goals: string[];
  improve: string;
  nps: number;
  significant: boolean;
  well: string;
};

export const JournalDetail = memo(function JournalDetail() {
  const { goBack } =
    useNavigation<StackNavigationProp<AuthStackRoutes, 'journal-detail'>>();
  const route = useRoute<RouteProp<AuthStackRoutes, 'journal-detail'>>();
  const colors = useColors();
  const dropShadow = useDropShadow();

  const [state, setState] = useState<State>({
    well: '',
    improve: '',
    commit: '',
    goals: [],
    goalModal: false,
    goal: '',
    focus: false,
    significant: false,
    nps: 0,
  });

  const handleChange = (key: string) => (value: string) => {
    setState((p) => ({ ...p, [key]: value }));
  };

  const handleSwitchChange = (key: string) => (value: boolean) => {
    setState((p) => ({ ...p, [key]: value }));
  };

  const handleGoalAdd = useCallback(() => {
    setState((p) => ({
      ...p,
      goals: [...p.goals, p.goal],
      goal: '',
      goalModal: false,
    }));
  }, []);

  const handleNps = useCallback((value: number) => {
    setState((p) => ({ ...p, nps: value }));
  }, []);

  const handleModal = useCallback(
    (goalModal: boolean) => () =>
      setState((p) => ({ ...p, goalModal, goal: '' })),
    [],
  );

  const handleSubmit = useCallback(() => {
    goBack();
  }, [goBack]);

  const title = route?.params?.item?.title || 'empty';
  const goalLength = state.goals.length;

  return (
    <>
      <Screen
        dropShadow
        leftIcon="close"
        onLeftPress={goBack}
        title="details"
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: spacing(4),
            paddingVertical: spacing(2),
          }}
          style={{ backgroundColor: colors.background.secondary }}
        >
          <Card>
            <Text
              title="Status"
              type="h5"
            />
            <Spacing padding={2} />
            <TextInput
              backgroundColor="secondary"
              onChangeText={handleChange('effort')}
              placeholder="what went well?"
              value={state.well}
            />
            <Spacing padding={2} />
            <TextInput
              backgroundColor="secondary"
              onChangeText={handleChange('effort')}
              placeholder="what could be improved?"
              value={state.improve}
            />
            <Spacing padding={2} />
            <TextInput
              backgroundColor="secondary"
              onChangeText={handleChange('effort')}
              placeholder="what will you commit to?"
              value={state.commit}
            />
          </Card>
          <Card>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text
                title="Goals"
                type="h5"
              />
              <TouchableOpacity onPress={handleModal(true)}>
                <Icon name="plus" />
              </TouchableOpacity>
            </View>
            {goalLength ? (
              <ScrollView
                contentContainerStyle={{
                  paddingTop: spacing(4),
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {state.goals.map((g, index) => (
                  <TouchableOpacity
                    key={g}
                    style={{
                      flex: 0,
                      backgroundColor: colors.background.secondary,
                      padding: spacing(2),
                      marginRight: index < goalLength ? spacing(2) : spacing(0),
                    }}
                  >
                    <Text title={g} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : null}
          </Card>

          <Card>
            <Text
              title="Metrics"
              type="h5"
            />
            <Spacing padding={2} />

            <Text title="Did you have intense focus?" />
            <Switch
              onValueChange={handleSwitchChange('focus')}
              value={state.focus}
            />
            <Spacing padding={2} />
            <Text title="Did you make any significant progress?" />
            <Switch
              onValueChange={handleSwitchChange('significant')}
              value={state.significant}
            />
            <Spacing padding={2} />
            <Text title="How would you rate this interval?" />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                title={`${state.nps}`}
                type="h6"
              />
              <Spacing padding={2} />
              <Slider
                maximumValue={10}
                minimumValue={0}
                onSlidingComplete={handleNps}
                step={1}
                style={{ flex: 1 }}
                value={state.nps}
              />
            </View>
          </Card>
          <Card>
            <Text title={title} />
          </Card>
        </ScrollView>
        <View style={{ ...dropShadow(0, -3) }}>
          <Spacing
            padding={4}
            style={{ backgroundColor: colors.background.primaryA }}
          >
            <Button
              center
              color="accent"
              emphasis="high"
              onPress={handleSubmit}
              title="submit"
            />
          </Spacing>
        </View>
      </Screen>

      {state.goalModal ? (
        <Modal
          onBackgroundPress={handleModal(false)}
          showOverlay
        >
          <Text
            title="Goal Name"
            type="h6"
          />
          <TextInput
            onChangeText={handleChange('goal')}
            placeholder="goal..."
            style={{ backgroundColor: colors.background.secondary }}
            value={state.goal}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingTop: spacing(4),
            }}
          >
            <Button
              emphasis="high"
              onPress={handleModal(false)}
              title="cancel"
            />
            <Button
              color="accent"
              emphasis="high"
              onPress={handleGoalAdd}
              title="create"
            />
          </View>
        </Modal>
      ) : null}
    </>
  );
});

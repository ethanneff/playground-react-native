import { RouteProp } from '@react-navigation/core';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import {
  Button,
  Card,
  Icon,
  KeyboardAwareScrollView,
  Modal,
  Screen,
  ScrollView,
  Slider,
  Spacing,
  Switch,
  Text,
  TextInput,
  TextInputRef,
  TouchableOpacity,
  View,
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
  loading: boolean;
  nps: number;
  significant: boolean;
  well: string;
};

export const IntervalDetails = memo(function IntervalDetails() {
  const { goBack } =
    useNavigation<StackNavigationProp<AuthStackRoutes, 'interval-details'>>();
  const route = useRoute<RouteProp<AuthStackRoutes, 'interval-details'>>();
  const inputWell = useRef<TextInputRef>(null);
  const inputCommit = useRef<TextInputRef>(null);
  const inputImprove = useRef<TextInputRef>(null);
  const colors = useColors();
  const dropShadow = useDropShadow();
  const focus = useIsFocused();

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
    loading: false,
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

  const handleSubmitEditing = useCallback(
    (key: keyof State) => () => {
      if (key === 'well') inputImprove.current?.focus();
      if (key === 'improve') inputCommit.current?.focus();
      if (key === 'commit') Keyboard.dismiss();
    },
    [],
  );

  useEffect(() => {
    if (!focus) return;
    inputWell.current?.focus();
  }, [focus]);

  const title = route?.params?.item?.title || 'empty';
  const goalLength = state.goals.length;

  return (
    <>
      <Screen
        dropShadow
        leftIcon="close"
        onLeftPress={goBack}
        title="Update Interval"
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{
            paddingHorizontal: spacing(4),
            paddingVertical: spacing(2),
          }}
          style={{ backgroundColor: colors.background.secondary }}
        >
          <Card>
            <Text
              emphasis="medium"
              title="Interval"
              type="h4"
            />
            <Spacing padding={2} />
            <Text title={title} />
          </Card>
          <Card>
            <Text
              emphasis="medium"
              title="Status"
              type="h4"
            />
            <Spacing padding={2} />
            <TextInput
              autoCapitalize="sentences"
              autoComplete="off"
              autoCorrect
              backgroundColor="secondary"
              blurOnSubmit={false}
              editable={!state.loading}
              keyboardType="default"
              onChangeText={handleChange('well')}
              onRef={inputWell}
              onSubmitEditing={handleSubmitEditing('well')}
              placeholder="what went well?"
              returnKeyType="next"
              textContentType="none"
              value={state.well}
            />
            <Spacing padding={2} />
            <TextInput
              autoCapitalize="sentences"
              autoComplete="off"
              autoCorrect
              backgroundColor="secondary"
              blurOnSubmit={false}
              editable={!state.loading}
              keyboardType="default"
              onChangeText={handleChange('improve')}
              onRef={inputImprove}
              onSubmitEditing={handleSubmitEditing('improve')}
              placeholder="what could be improved?"
              returnKeyType="next"
              textContentType="none"
              value={state.improve}
            />
            <Spacing padding={2} />
            <TextInput
              autoCapitalize="sentences"
              autoComplete="off"
              autoCorrect
              backgroundColor="secondary"
              blurOnSubmit={false}
              editable={!state.loading}
              keyboardType="default"
              onChangeText={handleChange('commit')}
              onRef={inputCommit}
              onSubmitEditing={handleSubmitEditing('commit')}
              placeholder="what will you commit to?"
              returnKeyType="next"
              textContentType="none"
              value={state.commit}
            />
          </Card>
          <Card>
            <View
              row
              style={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Text
                emphasis="medium"
                title="Goals"
                type="h4"
              />
              <TouchableOpacity onPress={handleModal(true)}>
                <Icon
                  color="tertiary"
                  name="plus"
                  size={spacing(8)}
                />
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
              emphasis="medium"
              title="Metrics"
              type="h4"
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
            <Text title="From 0 to 10, how does this interval rank?" />
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
                flex
                maximumValue={10}
                minimumValue={0}
                onSlidingComplete={handleNps}
                step={1}
                value={state.nps}
              />
            </View>
          </Card>
        </KeyboardAwareScrollView>
        <View style={{ ...dropShadow(1, -2) }}>
          <Spacing
            padding={4}
            style={{
              backgroundColor: colors.background.primaryA,
            }}
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
            autoCapitalize="sentences"
            autoComplete="off"
            autoCorrect
            blurOnSubmit
            editable={!state.loading}
            keyboardType="default"
            onChangeText={handleChange('goal')}
            onSubmitEditing={handleGoalAdd}
            placeholder="goal..."
            returnKeyType="done"
            style={{ backgroundColor: colors.background.secondary }}
            textContentType="none"
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
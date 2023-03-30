import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import {
  Button,
  Card,
  Icon,
  KeyboardAwareScrollView,
  Screen,
  ScrollView,
  Slider,
  Spacing,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type TextInputRef,
} from '../../../../components';
import {
  useIsFocused,
  useNavigation,
  useRoute,
  type RouteProp,
  type StackNavigationProp,
} from '../../../../conversions';
import { spacing, useColors, useDropShadow } from '../../../../features';
import { type AuthStackRoutes } from '../../types';
import { CreateGoalModal } from './CreateGoalModal';

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
  uncomfortable: boolean;
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
    commit: '',
    focus: false,
    goal: '',
    goalModal: false,
    goals: [],
    improve: '',
    loading: false,
    nps: 0,
    significant: false,
    uncomfortable: false,
    well: '',
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
      goal: '',
      goalModal: false,
      goals: [...p.goals, p.goal],
    }));
  }, []);

  const handleNps = useCallback((value: number) => {
    setState((p) => ({ ...p, nps: value }));
  }, []);

  const handleModal = useCallback(
    (goalModal: boolean) => () => {
      setState((p) => ({ ...p, goal: '', goalModal }));
    },
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

  const title = route.params.item.title || 'empty';
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
              placeholder="I did..."
              returnKeyType="next"
              textContentType="none"
              title="What went well?"
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
              placeholder="I should have..."
              returnKeyType="next"
              textContentType="none"
              title="What could be improved?"
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
              placeholder="I will..."
              returnKeyType="next"
              textContentType="none"
              title="What will you commit to?"
              value={state.commit}
            />
          </Card>
          <Card>
            <View
              alignItems="center"
              flexDirection="row"
              justifyContent="space-between"
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
                      backgroundColor: colors.background.secondary,
                      flex: 0,
                      marginRight: index < goalLength ? spacing(2) : spacing(0),
                      padding: spacing(2),
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
            <Text title="Was your focus intense?" />
            <Spacing padding={1} />
            <Switch
              onValueChange={handleSwitchChange('focus')}
              value={state.focus}
            />
            <Spacing padding={2} />
            <Text title="Were you outside your comfort zone?" />
            <Spacing padding={1} />
            <Switch
              onValueChange={handleSwitchChange('uncomfortable')}
              value={state.uncomfortable}
            />
            <Spacing padding={2} />
            <Text title="Did you make any significant progress?" />
            <Spacing padding={1} />
            <Switch
              onValueChange={handleSwitchChange('significant')}
              value={state.significant}
            />
            <Spacing padding={2} />
            <Text title="How would you rank this interval?" />
            <Spacing padding={1} />
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Text
                emphasis="medium"
                title={`${state.nps}`}
                type="h6"
              />
              <Spacing padding={2} />
              <Slider
                defaultValue={state.nps}
                flex
                maximumValue={10}
                minimumValue={0}
                onSlidingComplete={handleNps}
                step={1}
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
        <CreateGoalModal
          loading={state.loading}
          onChangeText={handleChange('goal')}
          onModalClose={handleModal(false)}
          onSubmit={handleGoalAdd}
        />
      ) : null}
    </>
  );
});

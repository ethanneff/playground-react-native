import React, { useCallback, useState } from 'react';
import { v4 } from 'uuid';
import {
  Button,
  Card,
  Icon,
  Modal,
  Pressable,
  Screen,
  ScrollView,
  Spacing,
  Text,
  TextInput,
  View,
} from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { spacing, useColors, useDropShadow } from '../../../../features';
import { getLargestDimension, useAppSelector } from '../../../../redux';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const weeks = ['0', '1', '2', '3', '4'];

type Goal = {
  completedAt: number | null;
  createdAt: number;
  id: string;
  title: string;
  updatedAt: number;
};

type ActiveGoal = {
  id: string | null;
  title: string;
};

type GoalModal = 'add' | 'close' | 'edit';

export const WeekendPlanner = () => {
  const colors = useColors();
  const { goBack } = useNavigation();
  const dropShadow = useDropShadow();
  const height = useAppSelector(getLargestDimension);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activeGoal, setActiveGoal] = useState<ActiveGoal>({
    id: null,
    title: '',
  });
  const [goalModal, setGoalModal] = useState<GoalModal>('close');

  const handleGoalModalAdd = useCallback(() => {
    setGoalModal('add');
  }, []);

  const handleGoalModalEdit = useCallback(
    (goal: Goal) => () => {
      setActiveGoal({ id: goal.id, title: goal.title });
      setGoalModal('edit');
    },
    [],
  );

  const handleGoalTextChange = useCallback((title: string) => {
    setActiveGoal((p) => ({ ...p, title }));
  }, []);

  const handleGoalModalClose = useCallback(() => {
    setGoalModal('close');
    setActiveGoal({ id: null, title: '' });
  }, []);

  const handleGoalAdd = useCallback(() => {
    const title = activeGoal.title.trim();
    const now = Date.now();
    const newGoal: Goal = {
      completedAt: null,
      createdAt: now,
      id: v4(),
      title,
      updatedAt: now,
    };
    if (goalModal === 'add') {
      setGoals((p) => [...p, newGoal]);
    } else {
      setGoals((p) =>
        p.map((item) =>
          item.id === activeGoal.id ? { ...item, title, updatedAt: now } : item,
        ),
      );
    }
    setActiveGoal({ id: null, title: '' });
    setGoalModal('close');
  }, [activeGoal, goalModal]);

  const handleGoalComplete = useCallback(
    (goal: Goal) => () => {
      const now = Date.now();
      setGoals((prev) =>
        prev.map((item) =>
          goal.id === item.id
            ? {
                ...item,
                completedAt: item.completedAt ? null : now,
                updatedAt: now,
              }
            : item,
        ),
      );
    },
    [],
  );

  return (
    <>
      <Screen
        dropShadow
        onLeftPress={goBack}
        title="WeekendPlanner"
      >
        <ScrollView
          contentContainerStyle={{
            gap: spacing(4),
            padding: spacing(4),
          }}
          style={{ backgroundColor: colors.background.secondary }}
        >
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
              <Pressable onPress={handleGoalModalAdd}>
                <Icon
                  color="accent"
                  name="plus"
                  padded
                />
              </Pressable>
            </View>
            {goals.length ? <Spacing padding={spacing(2)} /> : null}
            {goals.map((goal) => (
              <View
                alignItems="center"
                flexDirection="row"
                key={goal.id}
              >
                <Pressable
                  containerStyle={{ padding: spacing(2) }}
                  onPress={handleGoalComplete(goal)}
                >
                  <Icon
                    name={
                      goal.completedAt
                        ? 'checkbox-marked-outline'
                        : 'checkbox-blank-outline'
                    }
                  />
                </Pressable>
                <Spacing padding={spacing(1)} />
                <Pressable onPress={handleGoalModalEdit(goal)}>
                  <Text
                    centerVertically
                    style={{
                      textDecorationLine: goal.completedAt
                        ? 'line-through'
                        : 'none',
                    }}
                    title={goal.title}
                  />
                </Pressable>
              </View>
            ))}
          </Card>
          <Card>
            <Text
              emphasis="medium"
              title="Plan"
              type="h4"
            />
            <Spacing padding={spacing(2)} />
            {months.map((month) => (
              <View
                flex={1}
                flexDirection="row"
                justifyContent="space-between"
                key={month}
              >
                <View
                  alignItems="center"
                  flex={1}
                  height={height / 20}
                  justifyContent="center"
                  margin={spacing(1)}
                >
                  <Text
                    emphasis="medium"
                    title={month}
                  />
                </View>
                {weeks.map((week) => (
                  <View
                    justifyContent="center"
                    key={`${month}-${week}`}
                    style={{
                      backgroundColor:
                        Math.random() > 0.7
                          ? colors.background.tertiary
                          : colors.background.accent,
                      flex: 1,
                      margin: spacing(1),
                      ...dropShadow(2),
                    }}
                  >
                    <Text
                      center
                      title=""
                    />
                  </View>
                ))}
              </View>
            ))}
          </Card>
        </ScrollView>
      </Screen>
      {goalModal === 'close' ? null : (
        <Modal
          onBackgroundPress={handleGoalModalClose}
          showOverlay
        >
          <View>
            <TextInput
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect
              blurOnSubmit
              editable
              focusOnLoad
              keyboardType="default"
              onChangeText={handleGoalTextChange}
              onSubmitEditing={handleGoalAdd}
              placeholder="goal"
              returnKeyType="send"
              textContentType="none"
              value={activeGoal.title}
            />
            <Spacing padding={spacing(2)} />
            <View
              flexDirection="row"
              justifyContent="space-between"
            >
              <Button
                color="secondary"
                onPress={handleGoalModalClose}
                title="close"
              />
              <Button
                color="accent"
                emphasis="high"
                onPress={handleGoalAdd}
                title={`${goalModal} goal`}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

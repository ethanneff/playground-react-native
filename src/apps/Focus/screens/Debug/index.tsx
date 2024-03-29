import React, { useCallback } from 'react';
import {
  Button,
  Collapsible,
  Screen,
  ScrollView,
  Text,
  Toast,
} from '../../../../components';
import {
  JsonTree,
  type StackNavigationProperty,
  useNavigation,
} from '../../../../conversions';
import { useAuth } from '../../../../features';
import { useAppSelector } from '../../../../redux';
import { Collections, type Goal, type Interval } from '../../data';
import { type UnAuthStackRoutes } from '../../types';

export const Debug = () => {
  const { goBack } =
    useNavigation<StackNavigationProperty<UnAuthStackRoutes, 'debug'>>();
  const data = useAppSelector((state) => state.focus);
  const uid = data.auth.uid ?? '';
  const { logout } = useAuth();

  const showToast = useCallback((description: string) => {
    Toast.show({
      props: {
        description,
        title: 'Error',
      },
      type: 'negative',
    });
  }, []);

  const addGoal = useCallback(async () => {
    try {
      const item: Goal = {
        active: true,
        id: Math.random().toString(),
        name: new Date().toISOString(),
        uid,
      };
      await Collections.goals.add(item);
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message);
      }
    }
  }, [showToast, uid]);

  const addInterval = useCallback(async () => {
    try {
      const item: Interval = {
        id: Math.random().toString(),
        name: new Date().toISOString(),
        uid,
      };
      await Collections.intervals.add(item);
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message);
      }
    }
  }, [showToast, uid]);

  const updatePreference = useCallback(async () => {
    try {
      await Collections.preferences.add({
        uid: Math.random().toString(),
      });
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message);
      }
    }
  }, [showToast]);

  const updateUser = useCallback(async () => {
    try {
      await Collections.users.doc(uid).set({
        photoUrl: 'none',
      });
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message);
      }
    }
  }, [showToast, uid]);

  return (
    <Screen
      onLeftPress={goBack}
      title="Debug"
    >
      <ScrollView>
        <Collapsible title="State">
          <Text
            numberOfLines={5}
            selectable
            title={JSON.stringify(data, null, 2)}
          />
          <JsonTree
            data={data}
            invertTheme
            theme={{
              base00: '#1d1f21',
              base01: '#282a2e',
              base02: '#373b41',
              base03: '#969896',
              base04: '#b4b7b4',
              base05: '#c5c8c6',
              base06: '#e0e0e0',
              base07: '#ffffff',
              base08: '#CC342B',
              base09: '#F96A38',
              base0A: '#FBA922',
              base0B: '#198844',
              base0C: '#3971ED',
              base0D: '#3971ED',
              base0E: '#A36AC7',
              base0F: '#3971ED',
              scheme: 'google',
            }}
          />
        </Collapsible>
        <Collapsible title="Actions">
          <Button
            onPress={addGoal}
            title="add goal"
          />
          <Button
            onPress={addInterval}
            title="add interval"
          />
          <Button
            onPress={updatePreference}
            title="update preference"
          />
          <Button
            onPress={updateUser}
            title="update user"
          />
          <Button
            onPress={logout}
            title="logout"
          />
        </Collapsible>
      </ScrollView>
    </Screen>
  );
};

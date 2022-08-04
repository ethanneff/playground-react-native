import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useCallback } from 'react';
import {
  Button,
  Collapsible,
  Screen,
  ScrollView,
  Text,
  Toast,
} from '../../../../components';
import { JsonTree } from '../../../../conversions';
import { useRootSelector } from '../../../../redux';
import { Collections, Goal, Interval } from '../../data';
import { UnAuthStackRoutes } from '../../types';
import { useLogout } from '../../utils';

export const Debug = memo(function Debug() {
  const { goBack } =
    useNavigation<StackNavigationProp<UnAuthStackRoutes, 'debug'>>();
  const data = useRootSelector((state) => state.focus);
  const uid = data.auth.uid || '';
  const { handleLogout } = useLogout();

  const showToast = useCallback((e: unknown) => {
    Toast.show({
      type: 'negative',
      props: {
        title: 'Error',
        description: `${e}`,
      },
    });
  }, []);

  const addGoal = useCallback(async () => {
    try {
      const item: Goal = {
        id: Math.random().toString(),
        name: new Date().toISOString(),
        uid,
        active: true,
      };
      await Collections.goals.add(item);
    } catch (e) {
      showToast(e);
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
    } catch (e) {
      showToast(e);
    }
  }, [showToast, uid]);

  const updatePreference = useCallback(async () => {
    try {
      await Collections.preferences.add({
        uid: Math.random().toString(),
      });
    } catch (e) {
      showToast(e);
    }
  }, [showToast]);

  const updateUser = useCallback(async () => {
    try {
      await Collections.users.doc(uid).set({
        photoUrl: 'none',
      });
    } catch (e) {
      showToast(e);
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
              scheme: 'google',
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
            onPress={handleLogout}
            title="logout"
          />
        </Collapsible>
      </ScrollView>
    </Screen>
  );
});

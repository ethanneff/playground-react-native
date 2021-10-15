import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { Button, Screen, Text } from '../../components';
import { ScrollView } from '../../conversions';
import { padding, RootNavigation, RootRoutes, useColor } from '../../features';
import {
  toggleActionSheet,
  toggleAlert,
  toggleLoading,
  toggleNotification,
  useRootDispatch,
} from '../../redux';

export default memo(function Admin() {
  const dispatch = useRootDispatch();
  const { navigate } = useNavigation<RootNavigation>();
  const onPress = useCallback(
    (to: keyof RootRoutes) => () => navigate(to),
    [navigate],
  );
  const color = useColor();

  const handleLoading = useCallback(() => {
    dispatch(
      toggleLoading({
        visible: true,
        onBackgroundPress: () => {
          dispatch(toggleLoading({ visible: false }));
        },
      }),
    );
    setTimeout(() => {
      dispatch(toggleLoading({ visible: false }));
    }, 3000);
  }, [dispatch]);

  const handleAlert = useCallback(() => {
    dispatch(
      toggleAlert({
        visible: true,
        title: 'Alert',
        message: 'This is an alert',
        onBackgroundPress: () => undefined,
        confirmTitle: 'Confirm',
        onConfirmPress: () => undefined,
        cancelTitle: 'Cancel',
        onCancelPress: () => undefined,
      }),
    );
  }, [dispatch]);

  const handleNotification = useCallback(() => {
    dispatch(
      toggleNotification({
        visible: true,
        title: 'Notification',
        message: 'This is an notification',
        type: 'accent',
      }),
    );
  }, [dispatch]);

  const handleActionSheet = useCallback(() => {
    dispatch(
      toggleActionSheet({
        visible: true,
        title: 'Action sheet',
        message: 'This is an action sheet',
        items: [],
        onBackgroundPress: () => undefined,
        onCancelPress: () => undefined,
      }),
    );
  }, [dispatch]);

  return (
    <Screen dropShadow title="Admin">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: padding(4) }}
        style={{ backgroundColor: color.background.secondary }}
      >
        <Text emphasis="medium" title="Apps" type="h3" />
        <Button onPress={onPress('arcade')} title="arcade" />
        <Button onPress={onPress('portfolio')} title="portfolio" />
        <Button onPress={onPress('cant-hurt-me')} title="can't hurt me" />
        <Button onPress={onPress('checklists')} title="checklists" />
        <Button onPress={onPress('focus')} title="focus" />
        <Button onPress={onPress('journal')} title="journal" />
        <Button onPress={onPress('progress')} title="progress" />
        <Button onPress={onPress('comfort-zone')} title="comfort zone" />
        <Button onPress={onPress('the-one-thing')} title="the one thing" />
        <Button onPress={onPress('complete')} title="complete" />
        <Button onPress={onPress('deep-work')} title="deep work" />

        <Text emphasis="medium" title="Navigation" type="h3" />
        <Button onPress={handleLoading} title="loading" />
        <Button onPress={handleAlert} title="alert" />
        <Button onPress={handleActionSheet} title="action sheet" />
        <Button onPress={handleNotification} title="notification" />

        <Text emphasis="medium" title="Learning" type="h3" />
        <Button onPress={onPress('playground')} title="playground" />
      </ScrollView>
    </Screen>
  );
});

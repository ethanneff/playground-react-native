import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { Button, Screen, ScrollView, Text } from '../../components';
import {
  type RootNavigation,
  type RootRoutes,
  spacing,
  useColors,
} from '../../features';

export default memo(function Admin() {
  const { navigate } = useNavigation<RootNavigation>();
  const onPress = useCallback(
    (to: keyof RootRoutes) => () => {
      navigate(to);
    },
    [navigate],
  );
  const colors = useColors();

  return (
    <Screen
      dropShadow
      title="Admin"
    >
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: spacing(4) }}
        style={{ backgroundColor: colors.background.secondary }}
      >
        <Text
          emphasis="medium"
          title="Apps"
          type="h3"
        />

        <Button
          onPress={onPress('portfolio')}
          title="portfolio"
        />
        <Button
          onPress={onPress('cant-hurt-me')}
          title="can't hurt me"
        />
        <Button
          onPress={onPress('checklists')}
          title="checklists"
        />
        <Button
          onPress={onPress('focus')}
          title="focus"
        />
        <Button
          onPress={onPress('journal')}
          title="journal"
        />
        <Button
          onPress={onPress('progress')}
          title="progress"
        />
        <Button
          onPress={onPress('comfort-zone')}
          title="comfort zone"
        />
        <Button
          onPress={onPress('the-one-thing')}
          title="the one thing"
        />
        <Button
          onPress={onPress('complete')}
          title="complete"
        />
        <Button
          onPress={onPress('deep-work')}
          title="deep work"
        />

        <Text
          emphasis="medium"
          title="Learning"
          type="h3"
        />
        <Button
          onPress={onPress('playground')}
          title="playground"
        />
      </ScrollView>
    </Screen>
  );
});

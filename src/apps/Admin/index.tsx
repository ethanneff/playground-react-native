import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {Button, Screen, Text} from '../../components';

export default memo(function Admin() {
  const {navigate} = useNavigation();
  const onPress = useCallback((to: string) => () => navigate(to), [navigate]);

  return (
    <Screen gutter title="admin">
      <ScrollView>
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
        <Button onPress={onPress('notification')} title="notification" />
        <Button onPress={onPress('alert')} title="alert" />

        <Text emphasis="medium" title="Learning" type="h3" />
        <Button onPress={onPress('playground')} title="playground" />
      </ScrollView>
    </Screen>
  );
});

import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Button, Screen, Text} from '../../components';
import {ScrollView} from '../../conversions';
import {useColor} from '../../hooks';
import {RootNavigation, RootRoutes} from '../../providers/Navigation/types';
import {padding} from '../../utils';

export default memo(function Admin() {
  const {navigate} = useNavigation<RootNavigation>();
  const onPress = useCallback(
    (to: keyof RootRoutes) => () => navigate(to),
    [navigate],
  );
  const color = useColor();

  return (
    <Screen dropShadow title="Admin">
      <ScrollView
        contentContainerStyle={{paddingHorizontal: padding(4)}}
        style={{backgroundColor: color.background.secondary}}>
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
        <Button onPress={onPress('actionSheet')} title="action sheet" />

        <Text emphasis="medium" title="Learning" type="h3" />
        <Button onPress={onPress('playground')} title="playground" />
      </ScrollView>
    </Screen>
  );
});

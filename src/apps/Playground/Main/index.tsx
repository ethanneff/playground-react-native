import React, {memo, useCallback} from 'react';
import {FlatList} from 'react-native';
import {Button, Screen} from '../../../components';
import {useNav} from '../../../hooks';

const playgroundScreens = [
  'playgroundArticle',
  'playgroundBall',
  'playgroundChat',
  'playgroundDrag',
  'playgroundFonts',
  'playgroundImageCollection',
  'playgroundInput',
  'playgroundOKRs',
  'playgroundPinchSpread',
  'playgroundQuestionnaire',
  'playgroundSearchBar',
  'playgroundStartup',
  'playgroundStopwatch',
  'playgroundDarkMode',
  'playgroundColors',
  'playgroundSwipeFeed',
  'playgroundGameOfLife',
  'playgroundReminder',
  'playgroundTinder',
  'playgroundDrift',
  'playgroundAppleMask',
  'playgroundBouncingBalls',
  'playgroundBejeweled',
  'playgroundSlotMachine',
  'playgroundFortuneWheel',
  'playgroundAppleFit',
];

const formatTitle = (str: string) => str.replace('playground', '');

export default memo(function Playground() {
  const nav = useNav();
  const renderItem = useCallback(
    ({item}: {item: string}) => (
      <Button key={item} onPress={nav(item)} title={formatTitle(item)} />
    ),
    [nav],
  );
  const keyExtractor = useCallback((item: string) => item, []);
  const navBack = useCallback(nav('portfolio'), [nav]);
  return (
    <Screen onLeftPress={navBack} title="Playground">
      <FlatList
        data={playgroundScreens}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Screen>
  );
});

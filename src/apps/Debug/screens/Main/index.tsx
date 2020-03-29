import React, {memo, useCallback} from 'react';
import {Button, Screen} from '../../../../components';
import {NavigationScreen} from '../../../../models';
import {useNav} from '../../../../hooks';
import {FlatList} from 'react-native';

const debugScreens: NavigationScreen[] = [
  'debugArticle',
  'debugBall',
  'debugCards',
  'debugChat',
  'debugDrag',
  'debugFonts',
  'debugImageCollection',
  'debugInput',
  'debugOKRs',
  'debugPinchSpread',
  'debugQuestionnaire',
  'debugSearchBar',
  'debugStartup',
  'debugStopwatch',
  'debugDarkMode',
  'debugColors',
  'debugSwipeFeed',
  'debugGameOfLife',
  'debugReminder',
  'debugTinder',
  'debugDrift',
];

export default memo(function Debug() {
  const nav = useNav();
  const renderItem = useCallback(
    ({item}) => <Button title={item} key={item} onPress={nav.to(item)} />,
    [nav],
  );
  const keyExtractor = useCallback((item) => item, []);
  return (
    <Screen onLeftPress={nav.to('portfolioLanding')} title="Debug">
      <FlatList
        keyExtractor={keyExtractor}
        data={debugScreens}
        renderItem={renderItem}
      />
    </Screen>
  );
});

import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent, Platform, View} from 'react-native';
import {KeyboardHandler, Screen, Text} from '../../../../components';
import {useColor} from '../../../../hooks';
import {useRootSelector} from '../../../../utils';
import {List, OrganizeButton} from '../../components';
import {config} from '../../configs';
import {getInboxListId} from '../../models';

export const Capture = memo(function Capture() {
  const color = useColor();
  const {navigate} = useNavigation();

  const keyboardHeight = useRootSelector(
    (state) => state.device.keyboardHeight,
  );
  const [dimensions, setDimensions] = useState({container: 0, button: 0});
  const android = Platform.OS === 'android';

  const listHeight =
    keyboardHeight === 0
      ? dimensions.container -
        dimensions.button -
        (android ? config.padding * 8 : config.padding * 13)
      : dimensions.container -
        keyboardHeight -
        (android ? config.padding * 3 : config.padding * 7);

  const listId = useRootSelector(getInboxListId);

  const onOrganize = useCallback(() => undefined, []);

  const onLayout = useCallback(
    (key: string) => (event: LayoutChangeEvent) => {
      const {height} = event.nativeEvent.layout;
      const preventMultipleUpdates =
        dimensions.container > 0 && dimensions.button > 0;
      if (preventMultipleUpdates) return;

      setDimensions((p) => ({...p, [key]: height}));
    },
    [dimensions.button, dimensions.container],
  );

  const navToAccount = useCallback(() => navigate('account'), [navigate]);

  return (
    <Screen onRightPress={navToAccount} rightIcon="account" title="Capture">
      <KeyboardHandler
        backgroundColor={color.surface}
        onLayout={onLayout('container')}
        render={dimensions.container > 0}>
        {listId ? (
          <View style={{padding: config.padding}}>
            <List
              listId={listId}
              listMaxHeight={listHeight}
              placeholder="Item title..."
              title="Add item"
            />
            <OrganizeButton
              listId={listId}
              onLayout={onLayout('button')}
              onPress={onOrganize}
            />
          </View>
        ) : (
          <Text title="missing account" />
        )}
      </KeyboardHandler>
    </Screen>
  );
});

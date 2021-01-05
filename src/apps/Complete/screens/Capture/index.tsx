import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent, Platform, View} from 'react-native';
import {Button, KeyboardHandler, Screen, Text} from '../../../../components';
import {useColor} from '../../../../hooks';
import {useRootSelector} from '../../../../utils';
import {Card, List} from '../../components';
import {config} from '../../configs';
import {getInboxBoardId} from '../../models';

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
        (android ? config.padding * 8 : config.padding * 10)
      : dimensions.container -
        keyboardHeight -
        (android ? config.padding * 3 : config.padding * 4);

  const boardId = useRootSelector(getInboxBoardId);
  const listId = useRootSelector(
    (s) => s.completeBoard.items[boardId].lists[0],
  );
  const noListItems = useRootSelector(
    (s) => s.completeList.items[listId].items.length === 0,
  );

  const onOrganize = useCallback(() => undefined, []);

  const onLayout = useCallback(
    (key: string) => (event: LayoutChangeEvent) => {
      const {height} = event.nativeEvent.layout;
      const {container, button} = dimensions;
      const preventMultipleUpdates = container > 0 && button > 0;
      if (preventMultipleUpdates) return;
      setDimensions((p) => ({...p, [key]: height}));
    },
    [dimensions],
  );

  const navToAccount = useCallback(() => navigate('account'), [navigate]);

  return (
    <Screen onRightPress={navToAccount} rightIcon="account" title="Capture">
      <KeyboardHandler
        backgroundColor={color.surface}
        onLayout={onLayout('container')}
        render={dimensions.container > 0}>
        {listId ? (
          <View style={{height: '100%', padding: config.padding}}>
            <List
              boardId={boardId}
              listId={listId}
              listMaxHeight={listHeight}
              placeholder="Item title..."
              title="Add item"
            />
            <Card onLayout={onLayout('button')}>
              <Button
                center
                color="primary"
                disable={noListItems}
                onPress={onOrganize}
                title="Organize"
              />
            </Card>
          </View>
        ) : (
          <Text title="missing account" />
        )}
      </KeyboardHandler>
    </Screen>
  );
});

import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent, Platform, View} from 'react-native';
import {Button, KeyboardHandler, Screen} from '../../../../components';
import {useColor} from '../../../../hooks';
import {Theme, useRootSelector} from '../../../../utils';
import {Card, List} from '../../components';
import {config} from '../../configs';

const initialState = {container: 0, button: 0};
export const Capture = memo(function Capture() {
  const color = useColor();
  const {navigate} = useNavigation();
  const keyboardHeight = useRootSelector((s) => s.device.keyboardHeight);
  const [dimensions, setDimensions] = useState(initialState);
  const android = Platform.OS === 'android';

  const listHeight =
    keyboardHeight === 0
      ? dimensions.container - dimensions.button - Theme.padding.p44
      : dimensions.container -
        keyboardHeight -
        (android ? config.padding * 3 : Theme.padding.p19);

  const itemId = useRootSelector(
    (s) =>
      s.completeUser?.items.filter(
        (id) => s.completeItem.items[id].title === 'Inbox',
      )[0],
  );
  if (!itemId) throw new Error('missing item id');
  const noListItems = useRootSelector(
    (s) => s.completeItem.items[itemId].children.length === 0,
  );

  const onOrganize = useCallback(() => undefined, []);

  const onLayout = useCallback(
    (key: keyof typeof initialState) => (event: LayoutChangeEvent) => {
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
    <Screen onRightPress={navToAccount} rightIcon="account" title="Plan">
      <KeyboardHandler
        backgroundColor={color.surface}
        onLayout={onLayout('container')}
        render={dimensions.container > 0}>
        <View style={{padding: config.padding}}>
          <List
            itemId={itemId}
            listMaxHeight={listHeight}
            parentItemId={null}
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
      </KeyboardHandler>
    </Screen>
  );
});

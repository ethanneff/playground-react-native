import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {
  Keyboard,
  LayoutChangeEvent,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, Screen} from '../../../../components';
import {useColor} from '../../../../hooks';
import {useRootSelector} from '../../../../utils';
import {Card} from '../../components/Card';
import {List} from '../../components/List';
import {config} from '../../configs';
import {getInbox} from '../../models';

// TODO: update addItem to be used for organize button

export const Capture = memo(function Capture() {
  const color = useColor();
  const {navigate} = useNavigation();
  const navBack = useCallback(() => navigate('admin'), [navigate]);
  const keyboardHeight = useRootSelector(
    (state) => state.device.keyboardHeight,
  );
  const [dimensions, setDimensions] = useState({
    container: 0,
    button: 0,
    header: 0,
  });
  const android = Platform.OS === 'android';

  const listHeight =
    keyboardHeight === 0
      ? dimensions.container -
        dimensions.button -
        (android ? config.padding * 8 : config.padding * 14)
      : dimensions.container -
        keyboardHeight -
        (android ? config.padding * 3 : config.padding * 8);

  const [list] = useState(useRootSelector(getInbox));

  const onOrganize = useCallback(() => undefined, []);

  const onLayout = useCallback(
    (key: string) => (event: LayoutChangeEvent) => {
      const {height} = event.nativeEvent.layout;
      if (key === 'container' && dimensions.container > 0) {
        return;
      }
      setDimensions((p) => ({...p, [key]: height}));
    },
    [dimensions.container],
  );

  const onDismissKeyboard = useCallback(() => Keyboard.dismiss(), []);

  const navToAccount = useCallback(() => navigate('account'), [navigate]);

  return (
    <Screen
      onLeftPress={navBack}
      onRightPress={navToAccount}
      rightIcon="account"
      title="Capture">
      <TouchableWithoutFeedback
        onLayout={onLayout('container')}
        onPress={onDismissKeyboard}
        style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: color.surface,
            padding: config.padding,
          }}>
          {!dimensions.container ? null : (
            <View>
              <List
                addButtonPlaceholder="Item title..."
                addButtonTitle="Add item"
                borderRadius={config.borderRadius}
                itemColor={color.surface}
                key={list.id}
                list={list}
                listColor={color.background}
                maxHeight={listHeight}
                padding={config.padding}
              />
              <Card
                backgroundColor={color.background}
                borderRadius={config.borderRadius}
                onLayout={onLayout('button')}
                padding={config.padding / 2}>
                <Button
                  center
                  color="primary"
                  disable={list.items.length === 0}
                  onPress={onOrganize}
                  title="Organize"
                />
              </Card>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  );
});

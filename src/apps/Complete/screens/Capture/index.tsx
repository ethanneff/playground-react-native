import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Screen, Text} from '../../../../components';
import {useColor} from '../../../../hooks';
import {Theme} from '../../../../utils';
import {Card} from '../../components/Card';
import {List} from '../../components/List';
import {config} from '../../configs';
import {ListObject} from '../../types';
import {useKeyboard} from './useKeyboard';

// TODO: update addItem to be used for organize button

const width = Dimensions.get('window').width - config.padding * 2;
export const Capture = memo(function Capture() {
  const color = useColor();
  const {navigate} = useNavigation();
  const navBack = useCallback(() => navigate('admin'), [navigate]);
  const {keyboardHeight, dismissKeyboard} = useKeyboard();
  const [dimensions, setDimensions] = useState({
    container: 0,
    button: 0,
    header: 0,
  });

  const listHeight =
    keyboardHeight === 0
      ? dimensions.container -
        dimensions.button -
        dimensions.header -
        config.padding * 15
      : dimensions.container -
        dimensions.header -
        keyboardHeight -
        config.padding * 8;

  const [list] = useState<ListObject>({
    id: '1',
    name: 'Inbox',
    items: [
      {id: '1', name: 'do dishes'},
      {id: '2', name: 'walk dog'},
      {id: '3', name: 'run 4 miles'},
    ],
  });

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

  return (
    <Screen onLeftPress={navBack} title="Capture">
      <TouchableWithoutFeedback
        onLayout={onLayout('container')}
        onPress={dismissKeyboard}
        style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: color.surface,
            padding: config.padding,
          }}>
          {!dimensions.container ? null : (
            <View>
              <Card
                backgroundColor={color.background}
                borderRadius={config.borderRadius}
                onLayout={onLayout('header')}
                padding={config.padding}>
                <View>
                  <Text
                    center
                    emphasis="high"
                    style={{paddingBottom: config.padding}}
                    title="Record every thought"
                    type="h4"
                  />
                  <Text
                    center
                    emphasis="medium"
                    title="Clear your mind. Focus on the most important. Organize periodically."
                  />
                </View>
              </Card>
              <List
                addButtonPlaceholder="Item title..."
                addButtonTitle="Add item"
                borderRadius={config.borderRadius}
                itemColor={color.surface}
                itemHeight={Theme.padding.p18}
                itemWidth={width - config.padding * 2}
                key={list.id}
                list={list}
                listColor={color.background}
                listHeight={listHeight}
                listWidth={width}
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

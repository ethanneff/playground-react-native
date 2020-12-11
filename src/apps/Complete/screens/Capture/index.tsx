import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import {Button, Screen, Text} from '../../../../components';
import {useColor} from '../../../../hooks';
import {useRootSelector} from '../../../../utils';
import {Card} from '../../components/Card';
import {List} from '../../components/List';
import {config} from '../../configs';
import {ListObject} from '../../types';

// TODO: update addItem to be used for organize button

export const Capture = memo(function Capture() {
  const color = useColor();
  const {navigate} = useNavigation();
  const navBack = useCallback(() => navigate('admin'), [navigate]);
  const [dimensions, setDimensions] = useState({
    container: {width: 0, height: 0},
    button: {width: 0, height: 0},
    header: {width: 0, height: 0},
  });
  const keyboardVisible = useRootSelector(
    (state) => state.device.keyboardVisible,
  );
  const buttonHeight = keyboardVisible ? 0 : dimensions.button.height;
  const listMaxHeight =
    dimensions.container.height -
    buttonHeight -
    dimensions.header.height -
    config.padding * 12;

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
      const {width, height} = event.nativeEvent.layout;
      setDimensions((p) => ({...p, [key]: {width, height}}));
    },
    [],
  );

  return (
    <Screen onLeftPress={navBack} title="Capture">
      <View
        onLayout={onLayout('container')}
        style={{
          backgroundColor: color.surface,
          flex: 1,
          padding: config.padding,
        }}>
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
              title="Clear your mind. Keep focus on the most important. Organize periodically."
            />
          </View>
        </Card>
        <View>
          <List
            addButtonPlaceholder="Item title..."
            addButtonTitle="Add item"
            borderRadius={config.borderRadius}
            cardColor={color.surface}
            key={list.id}
            list={list}
            listColor={color.background}
            maxHeight={listMaxHeight}
            padding={config.padding}
          />
        </View>
        {keyboardVisible ? null : (
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
        )}
      </View>
    </Screen>
  );
});

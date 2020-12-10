import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {View} from 'react-native';
import {Button, Screen, Text} from '../../../../components';
import {useColor} from '../../../../hooks';
import {Card} from '../../components/Card';
import {List} from '../../components/List';
import {config} from '../../configs';
import {ListObject} from '../../types';

export const Capture = memo(function Capture() {
  const color = useColor();
  const {navigate} = useNavigation();
  const navBack = useCallback(() => navigate('admin'), [navigate]);

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

  return (
    <Screen onLeftPress={navBack} title="Capture">
      <View
        style={{
          backgroundColor: color.surface,
          flex: 1,
          padding: config.padding,
        }}>
        <Card
          backgroundColor={color.background}
          borderRadius={config.borderRadius}
          padding={config.padding}
          style={{marginBottom: config.padding}}>
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
        <List
          addButtonPlaceholder="Item title..."
          addButtonTitle="Add item"
          borderRadius={config.borderRadius}
          cardColor={color.surface}
          key={list.id}
          list={list}
          listColor={color.background}
          maxHeight={300}
          padding={config.padding}
        />
        <View
          style={{
            padding: config.padding / 2,
            backgroundColor: color.background,
          }}>
          <Button
            center
            color="primary"
            onPress={onOrganize}
            title="Organize"
          />
        </View>
      </View>
    </Screen>
  );
});

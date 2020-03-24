import React, { useState, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Card, Dialog, Text, Icon } from '../../../../../components';
import { questionnairesInitialState } from '../models';

export const Questionnaire = () => {
  const [actionSheet, setActionSheet] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const handleLongPress = (id: string) => () => {
    setActionSheet((state) => !state);
    setActiveItem(id);
  };
  const handleItemPress = (id: string) => () => setActiveItem(id);
  const handleActionSheetClose = () => setActionSheet(false);

  const renderItem = useCallback(
    ({ item }) => {
      const length = item.questions.length;
      const subtitle = `${length} question${length === 1 ? '' : 's'}`;
      return (
        <Card
          onPress={handleItemPress(item.id)}
          selected={activeItem === item.id}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flex: 0.9 }}>
              <Text h3 title={item.title} />
              <Text caption title={subtitle} />
            </View>
            <Icon name="dots-horizontal" onPress={handleLongPress(item.id)} />
          </View>
        </Card>
      );
    },
    [activeItem]
  );

  return (
    <>
      <FlatList
        keyExtractor={(item) => item.id}
        data={Object.values(questionnairesInitialState)}
        renderItem={renderItem}
      />
      {actionSheet && (
        <Dialog title="hello" onBackgroundPress={handleActionSheetClose} />
      )}
    </>
  );
};

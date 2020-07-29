import React, {useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Card, Dialog, Icon, Text} from '../../../../components';
import {questionnairesInitialState} from '../models';

export const Questionnaire = (): JSX.Element => {
  const [actionSheet, setActionSheet] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const handleLongPress = (id: string) => () => {
    setActionSheet((state) => !state);
    setActiveItem(id);
  };
  const handleItemPress = (id: string) => () => setActiveItem(id);
  const handleActionSheetClose = () => setActionSheet(false);

  const renderItem = useCallback(
    ({item}) => {
      const length = item.questions.length;
      const subtitle = `${length} question${length === 1 ? '' : 's'}`;
      return (
        <Card
          onPress={handleItemPress(item.id)}
          selected={activeItem === item.id}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 0.9}}>
              <Text title={item.title} type="h3" />
              <Text title={subtitle} type="caption" />
            </View>
            <Icon name="dots-horizontal" onPress={handleLongPress(item.id)} />
          </View>
        </Card>
      );
    },
    [activeItem],
  );

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <>
      <FlatList
        data={Object.values(questionnairesInitialState)}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      {actionSheet && (
        <Dialog onBackgroundPress={handleActionSheetClose} title="hello" />
      )}
    </>
  );
};

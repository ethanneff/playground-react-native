import React, {useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Card, Dialog, Icon, Text} from '../../../../../components';
import {
  createQuestionnaire,
  getQuestionnaireArray,
  removeQuestionnaire,
  selectQuestionnaire,
} from '../models';
import {useColor} from '../../../../../hooks';
import {useRootDispatch, useRootSelector} from '../../../../../utils';

export const Questionnaires = () => {
  const questionnaires = useRootSelector(getQuestionnaireArray);
  const selected = useRootSelector((state) => state.questionnaires.selected);
  const [actionSheet, setActionSheet] = useState(false);
  const dispatch = useRootDispatch();
  const color = useColor();
  const handleLongPress = useCallback(
    (id: string) => () => dispatch(removeQuestionnaire(id)),
    [dispatch],
  );
  const handleItemPress = useCallback(
    (id: string) => () => dispatch(selectQuestionnaire(id)),
    [dispatch],
  );
  const handleActionSheetClose = useCallback(() => setActionSheet(false), []);
  const handleCreate = useCallback(
    () => dispatch(createQuestionnaire(String(Date.now()))),
    [dispatch],
  );
  const handleItemMenu = useCallback(() => {
    setActionSheet((state) => !state);
  }, []);
  const renderItem = useCallback(
    ({item}) => {
      const length = item.questions.length;
      const subtitle = `${length} question${length === 1 ? '' : 's'}`;
      return (
        <Card
          onPress={handleItemPress(item.id)}
          onLongPress={handleLongPress(item.id)}
          selected={selected === item.id}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 0.9}}>
              <Text type="h3" title={item.title} />
              <Text type="caption" title={subtitle} />
            </View>
            <Icon name="dots-horizontal" onPress={handleItemMenu} />
          </View>
        </Card>
      );
    },
    [handleItemMenu, handleItemPress, handleLongPress, selected],
  );

  return (
    <>
      <FlatList
        keyExtractor={(item) => item.id}
        data={questionnaires}
        extraData={selected}
        renderItem={renderItem}
      />
      <Icon
        name="plus"
        color={color.background}
        onPress={handleCreate}
        style={{
          margin: 10,
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
        fab
      />
      {actionSheet && (
        <Dialog title="hello" onBackgroundPress={handleActionSheetClose} />
      )}
    </>
  );
};

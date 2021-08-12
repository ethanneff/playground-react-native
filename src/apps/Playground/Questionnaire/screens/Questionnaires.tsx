import React, {useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import {
  Card,
  Icon,
  Modal,
  Text,
  TouchableOpacity,
} from '../../../../components';
import {useRootDispatch, useRootSelector} from '../../../../redux';
import {
  createQuestionnaire,
  getQuestionnaireArray,
  Questionnaire,
  removeQuestionnaire,
  selectQuestionnaire,
} from '../models';

export const Questionnaires = (): JSX.Element => {
  const questionnaires = useRootSelector(getQuestionnaireArray);
  const selected = useRootSelector(state => state.questionnaires.selected);
  const [actionSheet, setActionSheet] = useState(false);
  const dispatch = useRootDispatch();
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
    setActionSheet(state => !state);
  }, []);
  const renderItem = useCallback(
    ({item}) => {
      const length = item.questions.length;
      const subtitle = `${length} question${length === 1 ? '' : 's'}`;
      return (
        <Card
          onLongPress={handleLongPress(item.id)}
          onPress={handleItemPress(item.id)}
          selected={selected === item.id}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 0.9}}>
              <Text title={item.title} type="h3" />
              <Text title={subtitle} type="caption" />
            </View>
            <TouchableOpacity onPress={handleItemMenu}>
              <Icon name="dots-horizontal" />
            </TouchableOpacity>
          </View>
        </Card>
      );
    },
    [handleItemMenu, handleItemPress, handleLongPress, selected],
  );

  const keyExtractor = useCallback((item: Questionnaire) => item.id, []);

  return (
    <>
      <FlatList
        data={questionnaires}
        extraData={selected}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={handleCreate}>
        <Icon
          color="primaryA"
          fab
          name="plus"
          style={{
            margin: 10,
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
        />
      </TouchableOpacity>
      {actionSheet && (
        <Modal onBackgroundPress={handleActionSheetClose}>
          <Text title="hello" />
        </Modal>
      )}
    </>
  );
};

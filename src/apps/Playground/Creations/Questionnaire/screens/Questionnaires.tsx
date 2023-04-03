import React, { useCallback, useState } from 'react';
import {
  Card,
  FlashList,
  Icon,
  Modal,
  Text,
  TouchableOpacity,
  View,
  type FlashListRenderItem,
} from '../../../../../components';
import { useRootDispatch, useRootSelector } from '../../../../../redux';
import {
  createQuestionnaire,
  getQuestionnaireArray,
  removeQuestionnaire,
  selectQuestionnaire,
  type Questionnaire,
} from '../models';

export const Questionnaires = () => {
  const questionnaires = useRootSelector(getQuestionnaireArray);
  const selected = useRootSelector((state) => state.questionnaires.selected);
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
  const handleActionSheetClose = useCallback(() => {
    setActionSheet(false);
  }, []);
  const handleCreate = useCallback(
    () => dispatch(createQuestionnaire(String(Date.now()))),
    [dispatch],
  );
  const handleItemMenu = useCallback(() => {
    setActionSheet((state) => !state);
  }, []);
  const renderItem = useCallback<FlashListRenderItem<Questionnaire>>(
    ({ item }) => {
      const { length } = item.questions;
      const subtitle = `${length} question${length === 1 ? '' : 's'}`;
      return (
        <Card
          onLongPress={handleLongPress(item.id)}
          onPress={handleItemPress(item.id)}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flex: 0.9 }}>
              <Text
                title={item.title}
                type="h3"
              />
              <Text
                title={subtitle}
                type="caption"
              />
            </View>
            <TouchableOpacity onPress={handleItemMenu}>
              <Icon name="dots-horizontal" />
            </TouchableOpacity>
          </View>
        </Card>
      );
    },
    [handleItemMenu, handleItemPress, handleLongPress],
  );

  const keyExtractor = useCallback((item: Questionnaire) => item.id, []);

  return (
    <>
      <FlashList
        data={questionnaires}
        estimatedItemSize={161}
        extraData={selected}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={handleCreate}>
        <Icon
          color="primaryA"
          fab
          name="plus"
          style={{
            bottom: 0,
            margin: 10,
            position: 'absolute',
            right: 0,
          }}
        />
      </TouchableOpacity>
      {actionSheet ? (
        <Modal onBackgroundPress={handleActionSheetClose}>
          <Text title="hello" />
        </Modal>
      ) : null}
    </>
  );
};

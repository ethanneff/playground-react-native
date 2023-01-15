import React, { useCallback, useState } from 'react';
import {
  Card,
  FlatList,
  FlatListRenderItem,
  Icon,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from '../../../../../components';
import {
  Questionnaire as QuestionnaireType,
  questionnairesInitialState,
} from '../models';

export const Questionnaire = (): JSX.Element => {
  const [actionSheet, setActionSheet] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const handleLongPress = (id: string) => () => {
    setActionSheet((state) => !state);
    setActiveItem(id);
  };
  const handleItemPress = useCallback(
    (id: string) => () => setActiveItem(id),
    [],
  );
  const handleActionSheetClose = useCallback(() => setActionSheet(false), []);

  const renderItem = useCallback<FlatListRenderItem<QuestionnaireType>>(
    ({ item }) => {
      const { length } = item.questions;
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
              <Text
                title={item.title}
                type="h3"
              />
              <Text
                title={subtitle}
                type="caption"
              />
            </View>
            <TouchableOpacity onPress={handleLongPress(item.id)}>
              <Icon name="dots-horizontal" />
            </TouchableOpacity>
          </View>
        </Card>
      );
    },
    [activeItem, handleItemPress],
  );

  const keyExtractor = useCallback((item: QuestionnaireType) => item.id, []);

  return (
    <>
      <FlatList
        data={Object.values(questionnairesInitialState.items)}
        estimatedItemSize={161}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        renderItem={renderItem}
      />
      {actionSheet ? (
        <Modal onBackgroundPress={handleActionSheetClose}>
          <Text title="hello" />
        </Modal>
      ) : null}
    </>
  );
};

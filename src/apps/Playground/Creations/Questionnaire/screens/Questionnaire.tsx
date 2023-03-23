import React, { useCallback } from 'react';
import {
  Card,
  FlatList,
  Icon,
  Text,
  TouchableOpacity,
  View,
  type FlatListRenderItem,
} from '../../../../../components';
import {
  questionnairesInitialState,
  type Questionnaire as QuestionnaireType,
} from '../models';

export const Questionnaire = (): JSX.Element => {
  const renderItem = useCallback<FlatListRenderItem<QuestionnaireType>>(
    ({ item }) => {
      const { length } = item.questions;
      const subtitle = `${length} question${length === 1 ? '' : 's'}`;
      return (
        <Card>
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
            <TouchableOpacity>
              <Icon name="dots-horizontal" />
            </TouchableOpacity>
          </View>
        </Card>
      );
    },
    [],
  );

  const keyExtractor = useCallback((item: QuestionnaireType) => item.id, []);

  return (
    <FlatList
      data={Object.values(questionnairesInitialState.items)}
      estimatedItemSize={161}
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps="handled"
      renderItem={renderItem}
    />
  );
};

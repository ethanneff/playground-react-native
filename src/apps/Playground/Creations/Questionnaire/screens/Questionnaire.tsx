import React, { useCallback } from 'react';
import {
  Card,
  FlashList,
  Icon,
  Text,
  TouchableOpacity,
  View,
  type FlashListRenderItem,
} from '../../../../../components';
import {
  questionnairesInitialState,
  type Questionnaire as QuestionnaireType,
} from '../models';

export const Questionnaire = () => {
  const renderItem = useCallback<FlashListRenderItem<QuestionnaireType>>(
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
    <FlashList
      data={Object.values(questionnairesInitialState.items)}
      estimatedItemSize={161}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

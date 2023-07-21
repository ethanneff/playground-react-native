import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, type ViewToken } from 'react-native';
import {
  Button,
  FlashList,
  Screen,
  Text,
  View,
  type FlashListRef,
  type FlashListRenderItem,
} from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { Questionnaires } from './screens/Questionnaires';

type Choice = {
  key: string;
  selected: boolean;
  title: string;
};
type Data = {
  choices?: Choice[];
  key: string;
  next?: string;
  title: string;
  type: 'button' | 'radio';
};

const data: Data[] = [
  {
    choices: [
      {
        key: '1',
        selected: false,
        title: 'individual',
      },
      {
        key: '2',
        selected: false,
        title: 'couple',
      },
      {
        key: '3',
        selected: false,
        title: 'teen',
      },
    ],
    key: '1',
    next: '2',
    title: 'What type of counseling are you looking for',
    type: 'radio',
  },
  { key: '2', title: '2', type: 'button' },
  { key: '3', title: '3', type: 'button' },
  { key: '4', title: '4', type: 'button' },
  { key: '5', title: '5', type: 'button' },
];
const { width } = Dimensions.get('window');
const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

export const Questionnaire = () => {
  const [output, setOutput] = useState({});
  const currentIndex = useRef(0);
  const { goBack } = useNavigation();
  const tableViewRef = useRef<FlashListRef<Data>>(null);
  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      currentIndex.current = viewableItems[0]?.index ?? 0;
    },
    [],
  );

  const onFinish = () => undefined;

  const onProgress = useCallback(
    (direction = 1) => {
      const index = currentIndex.current + direction;
      if (index < 0 || !tableViewRef.current) return;

      if (index >= data.length) {
        onFinish();
        return;
      }
      tableViewRef.current.scrollToIndex({
        animated: true,
        index,
      });
    },
    [currentIndex],
  );

  const onSelection = useCallback(
    (item: Data, choice: Choice) => {
      setOutput({
        ...output,
        [item.key]: {
          [choice.key]: true,
        },
      });
      onProgress();
    },
    [onProgress, output],
  );

  const updateSelection = useCallback(
    (item: Data, choice: Choice) => () => {
      onSelection(item, choice);
    },
    [onSelection],
  );

  const updateProgress = useCallback(
    (value: number) => () => {
      onProgress(value);
    },
    [onProgress],
  );

  const renderItem = useCallback<FlashListRenderItem<Data>>(
    ({ item }) => {
      let items = <View flex={1} />;

      if (item.choices)
        items = (
          <View flex={1}>
            {item.choices.map((choice) => (
              <Button
                key={choice.title}
                onPress={updateSelection(item, choice)}
                title={choice.title}
              />
            ))}
          </View>
        );

      return (
        <View width={width}>
          <Text title={item.title} />
          {items}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <Button
              onPress={updateProgress(-1)}
              title="prev"
            />
            <Button
              onPress={updateProgress(1)}
              title="next"
            />
            <Button
              onPress={updateProgress(2)}
              title="next2"
            />
          </View>
        </View>
      );
    },
    [updateProgress, updateSelection],
  );

  return (
    <Screen
      onLeftPress={goBack}
      title="Questionnaire"
    >
      <FlashList
        data={data}
        estimatedItemSize={161}
        horizontal
        onRef={tableViewRef}
        onViewableItemsChanged={handleViewableItemsChanged}
        pagingEnabled
        removeClippedSubviews
        renderItem={renderItem}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
      />
      <Questionnaires />
    </Screen>
  );
};

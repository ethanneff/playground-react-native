import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useRef, useState} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {Button, Screen, Text} from '../../../components';
import {Questionnaires} from './screens/Questionnaires';

const data = [
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
  {key: '2', title: '2'},
  {key: '3', title: '3'},
  {key: '4', title: '4'},
  {key: '5', title: '5'},
];
const width = Dimensions.get('window').width;
const viewabilityConfig = {itemVisiblePercentThreshold: 50};

export const Questionnaire = memo(function Questionnaire() {
  const [output, setOutput] = useState<any>({});
  const currentIndex = useRef(0);
  const {goBack} = useNavigation();
  const tableViewRef = useRef<FlatList | null>(null);
  const handleViewableItemsChanged = useCallback(({viewableItems}: any) => {
    currentIndex.current = viewableItems[0]?.index || 0;
  }, []);

  const onProgress = useCallback(
    (direction = 1) => {
      const index = currentIndex + direction;
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
    (item: any, choice: any) => {
      setOutput({
        ...output,
        [item.key]: {
          ...output[item.key],
          [choice.key]: true,
        },
      });
      onProgress();
    },
    [onProgress, output],
  );

  const onFinish = () => undefined;

  const updateSelection = useCallback(
    (item: any, choice: any) => () => onSelection(item, choice),
    [onSelection],
  );

  const updateProgress = useCallback(
    (value: number) => () => onProgress(value),
    [onProgress],
  );

  const renderItem = useCallback(
    ({item}) => {
      let items: any = <View style={{flex: 1}} />;

      if (item.choices)
        items = (
          <View style={{flex: 1}}>
            {item.choices.map((choice: any) => {
              return (
                <Button
                  key={choice.title}
                  onPress={updateSelection(item, choice)}
                  title={choice.title}
                />
              );
            })}
          </View>
        );

      return (
        <View style={{width: width}}>
          <Text title={item.title} />
          {items}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Button onPress={updateProgress(-1)} title="prev" />
            <Button onPress={updateProgress(1)} title="next" />
            <Button onPress={updateProgress(2)} title="next2" />
          </View>
        </View>
      );
    },
    [updateProgress, updateSelection],
  );

  return (
    <Screen onLeftPress={goBack} title="Questionnaire">
      <FlatList
        data={data}
        horizontal
        keyboardShouldPersistTaps="handled"
        onViewableItemsChanged={handleViewableItemsChanged}
        pagingEnabled
        ref={tableViewRef}
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
});

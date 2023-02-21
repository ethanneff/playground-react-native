import React, { useCallback, useRef, useState } from 'react';
import { type ListRenderItem, type ViewToken } from 'react-native';
import {
  FlatList,
  ScrollButton,
  Text,
  View,
  type FlatListRef,
} from '../../../../components';
import { spacing, useColors } from '../../../../features';

const data = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
];

const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

type OnViewableItemsChangedProps = {
  changed: ViewToken[];
  viewableItems: ViewToken[];
};

type Props = {
  horizontal?: boolean;
  location: number;
};

export const ExampleList = ({ horizontal, location }: Props) => {
  const [showBottom, setShowBottom] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const colors = useColors();
  const flatListRef = useRef<FlatListRef>(null);

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: OnViewableItemsChangedProps) => {
      const visible = viewableItems.some((item) => item.index === location);
      const bottom = Number(viewableItems[viewableItems.length - 1].index);
      const top = Number(viewableItems[0].index);
      setShowTop(visible ? false : bottom > location);
      setShowBottom(visible ? false : top < location);
    },
    [location],
  );

  const handleScrollToItem = useCallback(() => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: location,
      viewPosition: 0.5,
    });
  }, [location]);

  const renderItem = useCallback<ListRenderItem<string>>(
    ({ index, item }) => (
      <View
        style={{ paddingHorizontal: spacing(2), paddingVertical: spacing(1) }}
      >
        <View
          style={{
            backgroundColor:
              index === location - 1
                ? colors.background.positive
                : colors.background.primaryA,
            borderRadius: spacing(2),
            flex: 1,
            padding: spacing(2),
          }}
        >
          <Text
            style={{
              color:
                index === location - 1
                  ? colors.text.primaryB
                  : colors.text.primaryA,
            }}
            title={item}
          />
        </View>
      </View>
    ),
    [
      colors.background.positive,
      colors.background.primaryA,
      colors.text.primaryA,
      colors.text.primaryB,
      location,
    ],
  );

  const keyExtractor = useCallback((key: string) => key, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingVertical: spacing(2) }}
        data={data}
        horizontal={horizontal}
        keyExtractor={keyExtractor}
        onRef={flatListRef}
        onViewableItemsChanged={handleViewableItemsChanged}
        renderItem={renderItem}
        style={{ backgroundColor: colors.background.secondary }}
        viewabilityConfig={viewabilityConfig}
      />
      <ScrollButton
        backgroundColor="accent"
        onPress={handleScrollToItem}
        position={horizontal ? 'left' : 'top'}
        title={`scroll to ${location}`}
        visible={showTop}
      />
      <ScrollButton
        backgroundColor="accent"
        onPress={handleScrollToItem}
        position={horizontal ? 'right' : 'bottom'}
        title={`scroll to ${location}`}
        visible={showBottom}
      />
    </View>
  );
};
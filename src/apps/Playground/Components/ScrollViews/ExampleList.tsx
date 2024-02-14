import React, { useCallback, useRef, useState } from 'react';
import { type ViewToken } from 'react-native';
import {
  FlashList,
  ScrollButton,
  Text,
  View,
  type FlashListReference,
  type FlashListRenderItem,
} from '../../../../components';
import { spacing, useColors } from '../../../../features';
import { getSize } from './utils';

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

type OnViewableItemsChangedProperties = {
  changed: ViewToken[];
  viewableItems: ViewToken[];
};

type Properties = {
  readonly horizontal?: boolean;
  readonly location: number;
};

export const ExampleList = ({ horizontal, location }: Properties) => {
  const [showBottom, setShowBottom] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const colors = useColors();
  const flatListReference = useRef<FlashListReference<string>>(null);

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: OnViewableItemsChangedProperties) => {
      const visible = viewableItems.some((item) => item.index === location);
      const bottom = Number(viewableItems.at(-1)?.index);
      const top = Number(viewableItems[0]?.index);
      setShowTop(visible ? false : bottom > location);
      setShowBottom(visible ? false : top < location);
    },
    [location],
  );

  const handleScrollToItem = useCallback(() => {
    flatListReference.current?.scrollToIndex({
      animated: true,
      index: location,
      viewPosition: 0.5,
    });
  }, [location]);

  const renderItem = useCallback<FlashListRenderItem<string>>(
    ({ index, item }) => (
      <View
        paddingHorizontal={spacing(2)}
        paddingVertical={spacing(1)}
      >
        <View
          style={{
            backgroundColor:
              index === location - 1
                ? colors.background.positive
                : colors.background.primaryA,
            borderRadius: spacing(2),
            padding: spacing(2),
            ...getSize(undefined, !horizontal),
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
      horizontal,
      location,
    ],
  );

  const keyExtractor = useCallback((key: string) => key, []);

  return (
    <View style={{ backgroundColor: colors.background.secondary, flex: 1 }}>
      <FlashList
        contentContainerStyle={{
          paddingVertical: spacing(2),
        }}
        data={data}
        estimatedItemSize={50}
        horizontal={horizontal}
        keyExtractor={keyExtractor}
        onRef={flatListReference}
        onViewableItemsChanged={handleViewableItemsChanged}
        renderItem={renderItem}
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

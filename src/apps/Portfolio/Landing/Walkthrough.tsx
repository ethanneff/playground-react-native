import React, {memo, useCallback, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text, TouchableOpacity} from '../../../components';
import {useColor, useDropShadow} from '../../../hooks';
import {getWidth} from '../../../models';
import {colorWithOpacity, Theme, useRootSelector} from '../../../utils';

interface Slide {
  id: string;
  text: string;
  color: string;
}

interface Props {
  dotSize?: number;
  viewabilityConfig?: Record<string, unknown>;
}

export const Walkthrough = memo(function Walkthrough({
  dotSize = Theme.padding.p04,
  viewabilityConfig = {itemVisiblePercentThreshold: 50},
}: Props) {
  const dropShadow = useDropShadow();
  const width = useRootSelector(getWidth);
  const color = useColor();
  const flatList = useRef<FlatList | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    setActiveIndex(viewableItems[0].index || 0);
  }, []);

  const slides: Slide[] = [
    {id: '1', text: 'hello', color: color.info},
    {id: '2', text: 'bob', color: color.warning},
    {id: '3', text: 'steve', color: color.success},
    {id: '4', text: 'jill', color: color.brand},
  ];
  const keyExtractor = useCallback((item) => String(item.id), []);
  const onDotPress = useCallback(
    (index: number) => () => {
      if (!flatList.current) {
        return;
      }

      flatList.current.scrollToIndex({index});
    },
    [],
  );
  const renderItem = useCallback(
    ({item}) => {
      const styles = StyleSheet.create({
        item: {
          backgroundColor: item.color,
          justifyContent: 'center',
          width,
        },
      });

      return (
        <View style={styles.item}>
          <Text center title={item.text} />
        </View>
      );
    },
    [width],
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={slides}
        horizontal
        keyExtractor={keyExtractor}
        onViewableItemsChanged={onViewableItemsChanged}
        pagingEnabled
        ref={flatList}
        renderItem={renderItem}
        viewabilityConfig={viewabilityConfig}
      />
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          bottom: 0,
          width: '100%',
          justifyContent: 'center',
        }}>
        {slides.map((slide, index) => {
          return (
            <TouchableOpacity
              key={slide.id}
              onPress={onDotPress(index)}
              style={{
                marginHorizontal: Theme.padding.p01,
                marginBottom: Theme.padding.p02,
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize,
                borderColor: color.text,
                ...dropShadow(4),
                backgroundColor: colorWithOpacity(
                  activeIndex === index ? color.text : color.background,
                  0.6,
                ),
              }}
            />
          );
        })}
      </View>
    </View>
  );
});

import React, {memo, useCallback, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useColor} from '../../hooks';
import {getWidth} from '../../models';
import {config, useRootSelector} from '../../utils';
import {Content} from '../Content';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {Dots} from './Dots';
import {Slide} from './types';

type Props = {
  dotSize?: number;
  slides: Slide[];
  viewabilityConfig?: Record<string, unknown>;
};

type RenderItem = {item: Slide};

export const Carousel = memo(function Carousel({
  dotSize = config.padding(4),
  slides,
  viewabilityConfig = {itemVisiblePercentThreshold: 50},
}: Props) {
  const color = useColor();
  const width = useRootSelector(getWidth);
  const flatList = useRef<FlatList | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    setActiveIndex(viewableItems[0].index || 0);
  }, []);

  const keyExtractor = useCallback((item) => String(item.id), []);
  const onDotPress = useCallback(
    (index: number) => () => {
      if (!flatList.current) return;
      flatList.current.scrollToIndex({index});
    },
    [],
  );

  const renderItem = useCallback(
    ({item}: RenderItem) => {
      const styles = StyleSheet.create({
        item: {
          alignItems: 'center',
          backgroundColor: item.backgroundColor || color.background,
          justifyContent: 'center',
          padding: config.padding(4),
          width,
        },
      });

      return (
        <View style={styles.item}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            {item.icon && <Icon name={item.icon} size={config.padding(40)} />}
          </View>
          <View style={{flex: 1}}>
            <Text
              center
              style={{paddingVertical: config.padding(8)}}
              title={item.title}
              type="h4"
            />
            {item.sections && <Content center sections={item.sections} />}
          </View>
        </View>
      );
    },
    [color.background, width],
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
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
      />
      <Dots
        activeIndex={activeIndex}
        dotSize={dotSize}
        onDotPress={onDotPress}
        slides={slides}
      />
    </View>
  );
});

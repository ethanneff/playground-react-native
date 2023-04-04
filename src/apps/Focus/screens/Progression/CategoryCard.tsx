import dayjs, { type Dayjs } from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import React, { memo, useCallback } from 'react';
import {
  FlashList,
  Pressable,
  Spacing,
  Text,
  View,
  type FlashListRenderItem,
} from '../../../../components';
import {
  useNavigation,
  type StackNavigationProp,
} from '../../../../conversions';
import { spacing, useColors } from '../../../../features';
import { type AuthStackRoutes, type Category } from '../../types';
dayjs.extend(isToday);

type Props = {
  category: Category;
};

const mockData = [
  1, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
];

const day = dayjs();
const isWeekend = (d: Dayjs) => d.day() === 0 || d.day() === 6;

export const CategoryCard = memo(function CategoryCard({ category }: Props) {
  const { navigate } = useNavigation<StackNavigationProp<AuthStackRoutes>>();
  const colors = useColors();

  const handleCategoryPress = (categoryPress: Category) => () => {
    navigate('progression-details', { category: categoryPress });
  };

  const renderItem = useCallback<FlashListRenderItem<number>>(
    ({ index }) => {
      const historical = day.subtract(index, 'day');
      const weekend = isWeekend(historical);
      const today = historical.isToday();
      const backgroundColor = today
        ? colors.background.accent
        : weekend
        ? colors.background.tertiary
        : colors.background.secondary;

      return (
        <View
          style={{
            alignItems: 'center',
            backgroundColor,
            justifyContent: 'center',
            margin: spacing(0.25),
            padding: spacing(3),
          }}
        >
          <Text
            center
            style={{ color: undefined }}
            type="overline"
          />
          <Text
            bold={weekend}
            center
            style={{
              color: today ? colors.text.primaryB : colors.text.primaryA,
              position: 'absolute',
            }}
            title={historical.format('D')}
            type="overline"
          />
        </View>
      );
    },
    [
      colors.background.accent,
      colors.background.secondary,
      colors.background.tertiary,
      colors.text.primaryA,
      colors.text.primaryB,
    ],
  );

  return (
    <Pressable
      containerStyle={{
        paddingVertical: spacing(2),
      }}
      onPress={handleCategoryPress(category)}
    >
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          emphasis="high"
          title={category.name}
          type="h5"
        />
        {category.total ? (
          <Text
            emphasis="low"
            title={`${category.total}h`}
            type="h6"
          />
        ) : null}
      </View>
      <Spacing padding={spacing(1)} />
      <FlashList
        data={mockData}
        estimatedItemSize={28}
        horizontal
        inverted
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </Pressable>
  );
});

import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import dayjs, { Dayjs } from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import React, { memo, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Text, TouchableOpacity } from '../../../../components';
import { padding, useColor } from '../../../../features';
import { AuthStackRoutes, Category } from '../../types';
dayjs.extend(isToday);

type Props = {
  category: Category;
};

const mockData = [
  1, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 22, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 22, 2, 2, 2, 2, 22,
];

const day = dayjs();
const isWeekend = (d: Dayjs) => d.day() === 0 || d.day() === 6;

export const CategoryCard = memo(function CategoryCard({ category }: Props) {
  const { navigate } = useNavigation<StackNavigationProp<AuthStackRoutes>>();
  const color = useColor();

  const handleCategoryPress = (categoryPress: Category) => () => {
    navigate('category-detail', { category: categoryPress });
  };

  const renderItem = useCallback(
    ({ index }) => {
      const historical = day.subtract(index, 'day');
      const weekend = isWeekend(historical);
      const today = historical.isToday();
      const borderBottomColor = today
        ? color.border.accent
        : weekend
        ? color.border.secondary
        : color.background.primaryA;
      const borderColor = today
        ? color.border.accent
        : color.background.secondary;
      return (
        <View
          style={{
            backgroundColor: color.background.secondary,
            padding: 2,
            borderWidth: 1,
            borderColor,
            borderBottomColor,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            center
            style={{ color: color.background.secondary }}
            title="XX"
          />
          <Text
            center
            style={{ position: 'absolute' }}
            title={historical.format('D')}
            type="overline"
          />
        </View>
      );
    },
    [
      color.background.primaryA,
      color.background.secondary,
      color.border.accent,
      color.border.secondary,
    ],
  );

  return (
    <TouchableOpacity
      onPress={handleCategoryPress(category)}
      style={{
        paddingVertical: padding(2),
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text emphasis="high" title={category.name} type="h5" />
        {category.total ? (
          <Text emphasis="low" title={`${category.total}h`} type="h6" />
        ) : null}
      </View>
      <FlatList
        data={mockData}
        horizontal
        inverted
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: padding(2) }}
      />
    </TouchableOpacity>
  );
});

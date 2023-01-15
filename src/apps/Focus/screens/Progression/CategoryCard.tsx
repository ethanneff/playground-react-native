import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs, { type Dayjs } from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import React, { memo, useCallback } from 'react';
import { type ListRenderItem } from 'react-native';
import { FlatList, Text, TouchableOpacity, View } from '../../../../components';
import { spacing, useColors } from '../../../../features';
import { type AuthStackRoutes, type Category } from '../../types';
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
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackRoutes>>();
  const colors = useColors();

  const handleCategoryPress = (categoryPress: Category) => () => {
    navigate('progression-details', { category: categoryPress });
  };

  const renderItem = useCallback<ListRenderItem<number>>(
    ({ index }) => {
      const historical = day.subtract(index, 'day');
      const weekend = isWeekend(historical);
      const today = historical.isToday();
      const borderBottomColor = today
        ? colors.border.accent
        : weekend
        ? colors.border.secondary
        : colors.background.primaryA;
      const borderColor = today
        ? colors.border.accent
        : colors.background.secondary;
      return (
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.background.secondary,
            borderBottomColor,
            borderColor,
            borderWidth: 1,
            justifyContent: 'center',
            padding: 2,
          }}
        >
          <Text
            center
            style={{ color: colors.background.secondary }}
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
      colors.background.primaryA,
      colors.background.secondary,
      colors.border.accent,
      colors.border.secondary,
    ],
  );

  return (
    <TouchableOpacity
      onPress={handleCategoryPress(category)}
      style={{
        paddingVertical: spacing(2),
      }}
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
      <FlatList
        data={mockData}
        horizontal
        inverted
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: spacing(2) }}
      />
    </TouchableOpacity>
  );
});

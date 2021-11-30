import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Card, Text } from '../../../../components';
import { padding, useColor } from '../../../../features';
import { AuthStackRoutes, Category } from '../../types';

type Props = {
  category: Category;
};

const mockData = [
  1, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 22, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 22, 2, 2, 2, 2, 22,
];

export const CategoryCard = memo(function CategoryCard({ category }: Props) {
  const { navigate } = useNavigation<StackNavigationProp<AuthStackRoutes>>();
  const color = useColor();

  const handleCategoryPress = (categoryPress: Category) => () => {
    navigate('category-detail', { category: categoryPress });
  };

  const renderItem = useCallback(
    ({ index }) => (
      <View
        style={{
          backgroundColor: color.background.tertiary,
          margin: 2,
          padding: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text center title={index.toString()} type="overline" />
      </View>
    ),
    [color.background.tertiary],
  );

  return (
    <Card onPress={handleCategoryPress(category)}>
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
    </Card>
  );
});

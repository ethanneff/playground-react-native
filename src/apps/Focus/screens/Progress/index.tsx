import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Activity, Card, Screen, Text } from '../../../../components';
import { padding, useColor } from '../../../../features';
import { AuthStackRoutes, Category } from '../../types';

// TODO: create CategoryDetail screen (activity, stats [total, streak, best], details, schedule [offdays])
// TODO: click on category card opens CategoryDetail

// TODO: update activity to remove Card, Title, allow for custom interaction on item press, allow for forever scroll back
// TODO: create DailyDetail screen (view list of activity for that day)

// TODO: create SegmentDetail screen (focus, intensity, category, notes)

export const Progress = memo(function Progress() {
  const { navigate } = useNavigation<StackNavigationProp<AuthStackRoutes>>();
  const color = useColor();

  const categories: Category[] = [
    { id: '7', name: 'Ship Apps', total: 4 },
    { id: '6', name: 'Grow Muscle', total: 3 },
    { id: '5', name: 'Profit on Investments', total: 12 },
    { id: '4', name: 'Master Leetcode', total: 23 },
    { id: '3', name: 'Master System Design', total: 1 },
    { id: '2', name: 'Lead Others', total: 12 },
  ];

  const handleCategoryPress = (category: Category) => () => {
    navigate('category-detail', { category });
  };

  return (
    <Screen dropShadow title="Daily">
      <ScrollView
        contentContainerStyle={{
          padding: padding(4),
        }}
        style={{ backgroundColor: color.background.secondary }}
      >
        <Activity site="random" title="Deep Work" username="random" />
        {categories.map((category) => (
          <Card key={category.id} onPress={handleCategoryPress(category)}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                bold={false}
                emphasis="high"
                title={category.name}
                type="h5"
              />
              <Text
                emphasis="low"
                title={category.total.toString()}
                type="h6"
              />
            </View>
          </Card>
        ))}
      </ScrollView>
    </Screen>
  );
});

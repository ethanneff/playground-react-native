import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import { Calendar, Card, Screen, Text } from '../../../../components';
import { padding, useColor } from '../../../../features';
import { Category } from '../../types';
import { CategoryCard } from './CategoryCard';

// TODO: create CategoryDetail screen (activity, stats [total, streak, best], details, schedule [offdays])
// TODO: click on category card opens CategoryDetail

// TODO: update activity to remove Card, Title, allow for custom interaction on item press, allow for forever scroll back
// TODO: create DailyDetail screen (view list of activity for that day)

// TODO: create SegmentDetail screen (focus, intensity, category, notes)

// TODO: how to track milestones
// TODO: show journal for calendar press
// TODO: show deep work count on calendar (as opacity color dot)
// TODO: show streak per item (as opacity color dot)
// TODO: allow way to sort and add new categories
// TODO: make categories as flatlist
// TODO: intensity + focus = deep work splash screen (with rotating captions... e.g. where focus goes, energy flows)

const categories: Category[] = [
  { id: '7', name: 'Ship Apps', total: 4 },
  { id: '6', name: 'Grow Muscle', total: 3 },
  { id: '5', name: 'Profit on Investments', total: 0 },
  { id: '4', name: 'Master Leetcode', total: 23 },
  { id: '3', name: 'Master System Design', total: 1 },
  { id: '2', name: 'Lead Others', total: 12 },
].sort((a, b) => b.total - a.total);

export const Progress = memo(function Progress() {
  const color = useColor();

  return (
    <Screen dropShadow title="Progress">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: padding(4),
          paddingVertical: padding(2),
        }}
        style={{ backgroundColor: color.background.secondary }}
      >
        <Text
          emphasis="medium"
          style={{ paddingVertical: padding(2) }}
          title="Deep work over time"
          type="h4"
        />
        <Card>
          <Calendar />
        </Card>
        <Text
          emphasis="medium"
          style={{ paddingVertical: padding(2) }}
          title="Areas of deep work"
          type="h4"
        />
        {categories.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </ScrollView>
    </Screen>
  );
});

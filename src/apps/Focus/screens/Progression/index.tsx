import React, { memo } from 'react';
import {
  Calendar,
  Card,
  Screen,
  ScrollView,
  Text,
} from '../../../../components';
import { spacing, useColors, useLayout } from '../../../../features';
import { type Category } from '../../types';
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

export const Progression = memo(function Progression() {
  const colors = useColors();
  const { tabBarEdges } = useLayout();

  return (
    <Screen
      dropShadow
      edges={tabBarEdges}
      title="Progression"
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing(4),
          paddingVertical: spacing(2),
        }}
        style={{ backgroundColor: colors.background.secondary }}
      >
        <Card>
          <Text
            emphasis="medium"
            style={{ paddingBottom: spacing(2) }}
            title="Activity"
            type="h4"
          />
          <Calendar />
        </Card>
        <Card>
          <Text
            emphasis="medium"
            style={{ paddingBottom: spacing(2) }}
            title="Categories"
            type="h4"
          />
          {categories.map((category) => (
            <CategoryCard
              category={category}
              key={category.id}
            />
          ))}
        </Card>
      </ScrollView>
    </Screen>
  );
});

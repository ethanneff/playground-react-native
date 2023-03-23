import React, { memo, useCallback, useState } from 'react';
import { v4 } from 'uuid';
import {
  Card,
  Icon,
  Screen,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  type IconName,
} from '../../components';
import { spacing, useAdminNavBack, useColors } from '../../features';

type SectionProps = {
  description?: string;
  items: string[];
  subtitle?: string;
  title: string;
};

type ChecklistItemProps = {
  index: number;
  item: string;
};

const ChecklistItem = ({ index, item }: ChecklistItemProps) => {
  const [toggle, setToggle] = useState<IconName>('checkbox-blank-outline');
  const onPress = useCallback(() => {
    setToggle((prev) =>
      prev === 'checkbox-marked-outline'
        ? 'checkbox-blank-outline'
        : 'checkbox-marked-outline',
    );
  }, []);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        alignItems="center"
        flex={1}
        flexDirection="row"
      >
        <Icon
          name={toggle}
          style={{ paddingRight: spacing(2) }}
        />
        <View flex={1}>
          <Text title={`${index + 1}. ${item}`} />
        </View>
      </View>
      <View flexDirection="row">
        {days.map((day) => (
          <View
            flex={1}
            key={v4()}
          >
            <Text
              center
              emphasis="low"
              title={day}
              type="caption"
            />
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const Section = ({ description, items, subtitle, title }: SectionProps) => {
  return (
    <Card>
      <Text
        title={title}
        type="h4"
      />
      {subtitle ? (
        <Text
          emphasis="medium"
          style={{ paddingVertical: spacing(1) }}
          title={subtitle}
          type="subtitle1"
        />
      ) : null}
      <View style={{ paddingTop: spacing(2) }}>
        {description ? <Text title={description} /> : null}
        {items.length
          ? items.map((item, index) => (
              <ChecklistItem
                index={index}
                item={item}
                key={item}
              />
            ))
          : null}
      </View>
    </Card>
  );
};

export const Home = memo(function Home() {
  const colors = useColors();
  const { onLeftPress } = useAdminNavBack();

  return (
    <Screen
      dropShadow
      onLeftPress={onLeftPress}
      title="The One Thing"
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing(4),
          paddingVertical: spacing(2),
        }}
        style={{ backgroundColor: colors.background.secondary }}
      >
        <Section
          description="What’s the thing that gets you up in the morning and keeps you going when you’re tired and worn down - why you’re excited with your life?"
          items={[]}
          subtitle="Your Life Missioxn"
          title="Purpose"
        />
        <Section
          description="Your most important priority is the ONE Thing you can do right now that will help you achieve what matters most to you - big and specific"
          items={[]}
          subtitle="Your ONE Goal"
          title="Priority"
        />
        <Section
          items={['purpose', 'goals', 'time block', 'share', 'notifications']}
          subtitle="Immediate Reflection"
          title="Productivity"
        />
        <Section
          items={[
            'Meditate and pray for spiritual energy',
            'Eat right, exercise, and sleep sufficiently for physical energy',
            'Hug, kiss, and laugh with loved ones for emotional energy',
            'Set goals, plan, and calendar for mental energy',
            'Create success list (should do) instead of todo list (could do)',
            'Prepare environment to support your goals',
            'Time block your ONE Thing for business energy',
          ]}
          title="Morning Routine"
        />
        <Section
          items={[
            'Share daily progress texts with friends/family/coach',
            'Ask great questions with big and specific',
            'Find great answers with research and role models',
            'Do your ONE goal for 4 hours each morning',
            'Protect your time block (no distractions)',
            'Protect your environment (no distractions)',
            'Be accountable (own everything)',
            'Commit to be your best with everything (mastery)',
            'Maintain healthy habits',
            'Surround yourself with people who support you',
            'Live with no regrets (purpose, priority, and productivity)',
            'Reflect on ways to improve each action',
          ]}
          title="Daily Reflection"
        />
        <Section
          items={[
            'Review your annual and monthly goals (to get on target)',
            'Time block your next week calendar (time off, you ONE thing, 1hr planning, everything else)',
          ]}
          title="Weekly Reflection"
        />
      </ScrollView>
    </Screen>
  );
});

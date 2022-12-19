import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { Screen, ScrollView, Text, View } from '../../../../components';
import { spacing, useColors, useDropShadow } from '../../../../features';

const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

const weeks = ['0', '1', '2', '3', '4'];

export const WeekendPlanner = memo(function Playground52Weeks() {
  const colors = useColors();
  const { goBack } = useNavigation();
  const dropShadow = useDropShadow();

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="WeekendPlanner"
    >
      <ScrollView
        style={{
          backgroundColor: colors.background.secondary,
          padding: spacing(4),
        }}
      >
        {months.map((month) => (
          <View
            key={month}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                backgroundColor: colors.background.primaryA,

                flex: 1,
                margin: spacing(1),
                ...dropShadow(1),
              }}
            >
              <Text title={month} />
            </View>
            {weeks.map((week) => (
              <View
                key={week}
                style={{
                  backgroundColor:
                    Math.random() > 0.7
                      ? colors.background.primaryA
                      : colors.background.positive,
                  flex: 1,
                  margin: spacing(1),
                  ...dropShadow(1),
                }}
              >
                <Text
                  center
                  title=""
                />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
});

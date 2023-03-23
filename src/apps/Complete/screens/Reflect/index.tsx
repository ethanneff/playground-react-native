import React, { memo } from 'react';
import { Dimensions } from 'react-native';
import {
  Calendar,
  Card,
  Screen,
  ScrollView,
  Text,
  View,
} from '../../../../components';
import { useColors, useLayout } from '../../../../features';
import { completeConfig } from '../../utils';
import { Graph } from './Graph';

// TODO: add journal
// TODO: add historical data
// TODO: add purpose
// TODO: add goals

type TitleProps = {
  name: string;
};

const Title = ({ name }: TitleProps) => {
  return (
    <Text
      emphasis="high"
      style={{ paddingBottom: completeConfig.padding }}
      title={name}
      type="h4"
    />
  );
};

const data = [
  { date: new Date(2018, 9, 1).getTime(), value: 0 },
  { date: new Date(2018, 9, 16).getTime(), value: 0 },
  { date: new Date(2018, 9, 17).getTime(), value: 200 },
  { date: new Date(2018, 10, 1).getTime(), value: 200 },
  { date: new Date(2018, 10, 2).getTime(), value: 300 },
  { date: new Date(2018, 10, 5).getTime(), value: 300 },
];

export const Reflect = memo(function Reflect() {
  const colors = useColors();
  const { tabBarEdges } = useLayout();

  return (
    <Screen
      dropShadow
      edges={tabBarEdges}
      title="Reflect"
    >
      <ScrollView
        contentContainerStyle={{
          backgroundColor: colors.background.secondary,
          gap: completeConfig.padding,
          padding: completeConfig.padding,
        }}
        style={{ backgroundColor: colors.background.secondary }}
      >
        <Card elevation={4}>
          <View>
            <Title name="Purpose" />
            <Text title="Make a significant positive difference in global productivity" />
          </View>
        </Card>
        <Card elevation={4}>
          <View>
            <Title name="Goals" />
            <Text title="Top 3" />
            <Text title="Deep Focus" />
            <Text title="Smile" />
            <Text title="1 More Rep" />
          </View>
        </Card>
        <Card elevation={4}>
          <View>
            <Title name="Review (Progress)" />
            <View
              alignItems="center"
              flex={1}
              justifyContent="center"
            >
              <Graph
                data={data}
                height={200}
                width={
                  Dimensions.get('window').width - completeConfig.padding * 4
                }
              />
            </View>
          </View>
        </Card>
        <Card elevation={4}>
          <View>
            <Title name="Reflect (Journal)" />
            <Calendar hiddenDays />
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
});

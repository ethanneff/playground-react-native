import React, {memo} from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {Calendar, Screen, Text} from '../../../../components';
import {useColor} from '../../../../hooks';
import {Theme} from '../../../../utils';
import {Card} from '../../components/Card';
import {config} from '../../configs';
import {Graph} from './Graph';

// TODO: add journal
// TODO: add historical data
// TODO: add purpose
// TODO: add goals

type TitleProps = {name: string};

const Title = ({name}: TitleProps) => {
  return (
    <Text
      emphasis="high"
      style={{paddingBottom: config.padding}}
      title={name}
      type="h4"
    />
  );
};

const data = [
  {date: new Date(2018, 9, 1).getTime(), value: 0},
  {date: new Date(2018, 9, 16).getTime(), value: 0},
  {date: new Date(2018, 9, 17).getTime(), value: 200},
  {date: new Date(2018, 10, 1).getTime(), value: 200},
  {date: new Date(2018, 10, 2).getTime(), value: 300},
  {date: new Date(2018, 10, 5).getTime(), value: 300},
];

export const Reflect = memo(function Reflect() {
  const color = useColor();

  return (
    <Screen title="Reflect">
      <ScrollView
        contentContainerStyle={{
          padding: Theme.padding.p04,
          backgroundColor: color.surface,
        }}
        style={{backgroundColor: color.surface}}>
        <Card
          backgroundColor={color.background}
          borderRadius={config.borderRadius}
          padding={config.padding}>
          <View>
            <Title name="Purpose" />
            <Text title="Make a significant positive difference in global productivity" />
          </View>
        </Card>
        <Card
          backgroundColor={color.background}
          borderRadius={config.borderRadius}
          padding={config.padding}>
          <View>
            <Title name="Goals" />
            <Text title="Top 3" />
            <Text title="Deep Focus" />
            <Text title="Smile" />
            <Text title="1 More Rep" />
          </View>
        </Card>
        <Card
          backgroundColor={color.background}
          borderRadius={config.borderRadius}
          padding={config.padding}>
          <View>
            <Title name="Review (Progress)" />
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Graph
                data={data}
                height={200}
                width={Dimensions.get('window').width - config.padding * 4}
              />
            </View>
          </View>
        </Card>
        <Card
          backgroundColor={color.background}
          borderRadius={config.borderRadius}
          padding={config.padding}>
          <View>
            <Title name="Reflect (Journal)" />
            <Calendar />
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
});

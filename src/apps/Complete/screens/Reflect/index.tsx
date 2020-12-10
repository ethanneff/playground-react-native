import React, {memo} from 'react';
import {ScrollView, View} from 'react-native';
import {Calendar, Screen, Text} from '../../../../components';
import {useColor} from '../../../../hooks';
import {Theme} from '../../../../utils';
import {Card} from '../../components/Card';
import {config} from '../../configs';

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
          <Title name="Review (Progress)" />
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

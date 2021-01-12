import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar, Card, Input, Screen, Text} from '../../components';
import {ScrollView} from '../../conversions';
import {useColor} from '../../hooks';
import {Theme} from '../../utils';

export const Home = memo(function Home() {
  const color = useColor();
  const {goBack} = useNavigation();
  const styles = StyleSheet.create({
    bottom: {
      paddingBottom: Theme.padding.p04,
    },
  });

  const handleChangeText = useCallback(() => undefined, []);
  const navBack = useCallback(() => goBack(), [goBack]);

  return (
    <Screen dropShadow onLeftPress={navBack} title="Journal">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Theme.padding.p04,
          paddingVertical: Theme.padding.p02,
        }}
        style={{backgroundColor: color.surface}}>
        <Card>
          <Text style={styles.bottom} title="Calendar" type="h4" />
          <Calendar hiddenDays />
        </Card>
        <Card>
          <Text style={styles.bottom} title="Record" type="h4" />
          <Text
            emphasis="medium"
            style={styles.bottom}
            title="One objective that will make everything easier"
            type="subtitle1"
          />
          <Input
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="Primary goal"
            value=""
          />
          <Text
            emphasis="medium"
            style={styles.bottom}
            title="Additional objectives"
            type="subtitle1"
          />
          <Input
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="Secondary goal"
            value=""
          />
          <Input
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="Secondary goal"
            value=""
          />
          <Input
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="Secondary goal"
            value=""
          />
          <Text
            emphasis="medium"
            style={styles.bottom}
            title="Bonus objectives"
            type="subtitle1"
          />
          <Input
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="Tertiary goal"
            value=""
          />
          <Input
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="Tertiary goal"
            value=""
          />
          <Input
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="Tertiary goal"
            value=""
          />
          <Input
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="Tertiary goal"
            value=""
          />
          <Input
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="Tertiary goal"
            value=""
          />
        </Card>
        <Card>
          <Text style={styles.bottom} title="Review" type="h4" />
          <Input
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="How likely are you to recommend this day?"
            value=""
          />
          <Input
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="Why did you give this score?"
            value=""
          />
        </Card>
        <Card>
          <Text style={styles.bottom} title="Retro" type="h4" />
          <Input
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="What went well?"
            value=""
          />
          <Input
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="What could be improved?"
            value=""
          />
          <Input
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="What will you commit to tomorrow?"
            value=""
          />
        </Card>
        <View style={{height: Theme.padding.p04}} />
      </ScrollView>
    </Screen>
  );
});

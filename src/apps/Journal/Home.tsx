import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar, Card, Input, Screen, Text} from '../../components';
import {ScrollView} from '../../conversions';
import {padding, useAdminNavBack, useColor} from '../../features';

export const Home = memo(function Home() {
  const color = useColor();
  const {onLeftPress} = useAdminNavBack();
  const styles = StyleSheet.create({
    bottom: {
      paddingBottom: padding(4),
    },
  });

  const handleChangeText = useCallback(() => undefined, []);

  return (
    <Screen dropShadow onLeftPress={onLeftPress} title="Journal">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: padding(4),
          paddingVertical: padding(2),
        }}
        style={{backgroundColor: color.background.secondary}}>
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
        <View style={{height: padding(4)}} />
      </ScrollView>
    </Screen>
  );
});

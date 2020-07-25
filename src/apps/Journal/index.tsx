import React, {memo, useCallback} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Calendar, Card, Screen, Text, TextInput} from '../../components';
import {useColor, useNav} from '../../hooks';
import {Theme} from '../../utils';

export default memo(function Journal() {
  const color = useColor();
  const nav = useNav();
  const styles = StyleSheet.create({
    bottom: {
      paddingBottom: Theme.padding.p04,
    },
  });

  const handleChangeText = useCallback(() => undefined, []);
  const navBack = useCallback(nav('portfolioLanding'), [nav]);

  return (
    <Screen onLeftPress={navBack} title="Journal">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Theme.padding.p04,
          paddingVertical: Theme.padding.p02,
        }}
        style={{backgroundColor: color.surface}}>
        <Card>
          <Text style={styles.bottom} title="Calendar" type="h3" />
          <Calendar hiddenDays />
        </Card>
        <Card>
          <Text style={styles.bottom} title="Record" type="h3" />
          <Text
            emphasis="medium"
            style={styles.bottom}
            title="One objective that will make everything easier"
            type="h5"
          />
          <TextInput
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="Primary goal"
            value=""
          />
          <Text
            emphasis="medium"
            style={styles.bottom}
            title="Additional objectives"
            type="h5"
          />
          <TextInput
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="Secondary goal"
            value=""
          />
          <TextInput
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="Secondary goal"
            value=""
          />
          <TextInput
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="Secondary goal"
            value=""
          />
          <Text
            emphasis="medium"
            style={styles.bottom}
            title="Bonus objectives"
            type="h5"
          />
          <TextInput
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="tertiary goal"
            value=""
          />
          <TextInput
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="tertiary goal"
            value=""
          />
          <TextInput
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="tertiary goal"
            value=""
          />
          <TextInput
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="tertiary goal"
            value=""
          />
          <TextInput
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="tertiary goal"
            value=""
          />
        </Card>
        <Card>
          <Text style={styles.bottom} title="Review" type="h3" />
          <TextInput
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="How likely are you to recommend this day?"
            value=""
          />
          <TextInput
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="Why did you give this score?"
            value=""
          />
        </Card>
        <Card>
          <Text style={styles.bottom} title="Retro" type="h3" />
          <TextInput
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="What went well?"
            value=""
          />
          <TextInput
            onChangeText={handleChangeText}
            placeholder="fill me"
            title="What could be improved?"
            value=""
          />
          <TextInput
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

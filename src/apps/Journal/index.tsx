import React, {memo} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Screen, Text, TextInput, Card, Calendar} from '../../components';
import {useNav, useColor} from '../../hooks';
import {Theme} from '../../utils';

export default memo(function Journal() {
  const color = useColor();
  const nav = useNav();
  const styles = StyleSheet.create({
    bottom: {
      paddingBottom: Theme.padding.p04,
    },
  });

  return (
    <Screen onLeftPress={nav.to('portfolioLanding')} title="Journal">
      <ScrollView
        style={{backgroundColor: color.surface}}
        contentContainerStyle={{
          paddingHorizontal: Theme.padding.p04,
          paddingVertical: Theme.padding.p02,
        }}>
        <Card>
          <Text type="h3" title="Calendar" style={styles.bottom} />
          <Calendar hiddenDays />
        </Card>
        <Card>
          <Text type="h3" title="Record" style={styles.bottom} />
          <Text
            type="h5"
            emphasis="medium"
            title="One objective that will make everything easier"
            style={styles.bottom}
          />
          <TextInput
            title="Primary goal"
            placeholder="fill me"
            value={''}
            onChangeText={() => undefined}
          />
          <Text
            type="h5"
            emphasis="medium"
            title="Additional objectives"
            style={styles.bottom}
          />
          <TextInput
            title="Secondary goal"
            placeholder="fill me"
            value={''}
            onChangeText={() => undefined}
          />
          <TextInput
            title="Secondary goal"
            placeholder="fill me"
            value={''}
            onChangeText={() => undefined}
          />
          <TextInput
            title="Secondary goal"
            placeholder="fill me"
            value={''}
            onChangeText={() => undefined}
          />
          <Text
            type="h5"
            emphasis="medium"
            title="Bonus objectives"
            style={styles.bottom}
          />
          <TextInput
            title="tertiary goal"
            placeholder="fill me"
            value={''}
            onChangeText={() => undefined}
          />
          <TextInput
            title="tertiary goal"
            placeholder="fill me"
            value={''}
            onChangeText={() => undefined}
          />
          <TextInput
            title="tertiary goal"
            placeholder="fill me"
            value={''}
            onChangeText={() => undefined}
          />
          <TextInput
            title="tertiary goal"
            placeholder="fill me"
            value={''}
            onChangeText={() => undefined}
          />
          <TextInput
            title="tertiary goal"
            placeholder="fill me"
            value={''}
            onChangeText={() => undefined}
          />
        </Card>
        <Card>
          <Text type="h3" title="Review" style={styles.bottom} />
          <TextInput
            title="How likely are you to recommend this day?"
            placeholder="fill me"
            value={''}
            onChangeText={() => undefined}
          />
          <TextInput
            title="Why did you give this score?"
            placeholder="fill me"
            value={''}
            onChangeText={() => undefined}
          />
        </Card>
        <Card>
          <Text type="h3" title="Retro" style={styles.bottom} />
          <TextInput
            title="What went well?"
            placeholder="fill me"
            value={''}
            onChangeText={() => undefined}
          />
          <TextInput
            title="What could be improved?"
            placeholder="fill me"
            value={''}
            onChangeText={() => undefined}
          />
          <TextInput
            title="What will you commit to tomorrow?"
            placeholder="fill me"
            value={''}
            onChangeText={() => undefined}
          />
        </Card>
        <View style={{height: Theme.padding.p04}} />
      </ScrollView>
    </Screen>
  );
});

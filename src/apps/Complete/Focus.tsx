import React, {memo} from 'react';
import {ScrollView} from 'react-native';
import {Card, Screen, Text} from '../../components';
import {useColor} from '../../hooks';
import {Theme} from '../../utils';
// TODO: add landing page (actionables + record)
// TODO: add navigation to columsn
// TODO: rename items/cards columns/list
// TODO: add list pagination lock
// TODO: fix list height
// TODO: add textInput for each item
// TODO: add list add text input
// TODO: add card add text input
// TODO: scroll down on card add

export const Focus = memo(function Focus() {
  const color = useColor();

  return (
    <Screen title="Focus">
      <ScrollView
        contentContainerStyle={{
          padding: Theme.padding.p04,
          backgroundColor: color.surface,
        }}>
        <Card>
          <Text
            center
            style={{paddingBottom: Theme.padding.p04}}
            title="Try something new every day"
            type="h3"
          />
          <Text
            center
            emphasis="medium"
            title="Break comfort barriers to be more creative, better at dealing with change, and better a improving the future"
            type="h4"
          />
        </Card>
      </ScrollView>
    </Screen>
  );
});

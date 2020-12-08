import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {Button, Card, Screen, Text} from '../../../../components';
import {useColor} from '../../../../hooks';
import {Theme} from '../../../../utils';

// TODO: add journal
// TODO: add historical data
// TODO: add purpose
// TODO: add goals

export const Projects = memo(function Projects() {
  const color = useColor();
  const {navigate} = useNavigation();

  const navNext = useCallback(() => {
    navigate('Project');
  }, [navigate]);

  return (
    <Screen title="Projects">
      <ScrollView
        contentContainerStyle={{
          padding: Theme.padding.p04,
          backgroundColor: color.surface,
        }}
        style={{backgroundColor: color.surface}}>
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
          <Button onPress={navNext} title="go to project" />
        </Card>
      </ScrollView>
    </Screen>
  );
});

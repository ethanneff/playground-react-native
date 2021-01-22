import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {Button, Carousel, Screen} from '../../../../components';
import {Slide} from '../../../../components/Carousel/types';
import {Sections} from '../../../../components/Content/types';
import {completeConfig} from '../../utils';

export const Welcome = memo(function Landing() {
  const {navigate} = useNavigation();
  const onSignUp = useCallback(() => navigate('sign-up'), [navigate]);
  const onLogIn = useCallback(() => navigate('log-in'), [navigate]);

  const sections: Sections = [
    {
      paragraphs: [
        [{title: 'Start investing commission-free'}],
        [
          {title: 'Other fees may apply. View our'},
          {title: 'fee schedule', onPress: () => undefined},
          {title: 'to learn more. All investments have risks.'},
        ],
      ],
    },
  ];

  const slides: Slide[] = [
    {id: '1', title: 'Welcome to Accomplish', icon: 'trophy-outline', sections},
    {id: '2', title: 'bob', icon: 'trophy-outline'},
    {id: '3', title: 'steve', icon: 'trophy-outline'},
    {id: '4', title: 'jill', icon: 'trophy-outline'},
  ];

  return (
    <Screen>
      <View style={{flex: 1}}>
        <Carousel slides={slides} />
        <View style={{padding: completeConfig.padding}}>
          <Button
            center
            color="primary"
            emphasis="high"
            onPress={onSignUp}
            title="Sign up"
          />
          <Button center color="primary" onPress={onLogIn} title="Log in" />
        </View>
      </View>
    </Screen>
  );
});

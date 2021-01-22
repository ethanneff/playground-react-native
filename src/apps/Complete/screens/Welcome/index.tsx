import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {Button, Carousel, Screen} from '../../../../components';
import {Slide} from '../../../../components/Carousel/types';
import {config} from '../../../../utils';
import {LandingStackParams} from '../../navigation-types';
import {completeConfig} from '../../utils';

export const Welcome = memo(function Landing() {
  const {navigate} = useNavigation<StackNavigationProp<LandingStackParams>>();
  const onSignUp = useCallback(() => navigate('auth', {state: 'sign-up'}), [
    navigate,
  ]);
  const onLogIn = useCallback(() => navigate('auth', {state: 'log-in'}), [
    navigate,
  ]);

  const slides: Slide[] = [
    {
      id: '1',
      icon: 'trophy-outline',
      sections: [
        {
          title: 'Welcome to accomplish',
          titleType: 'h4',
          titleStyle: {paddingBottom: config.padding(10)},
          paragraphs: [
            [{title: 'Start investing commission-free'}],
            [
              {title: 'Other fees may apply. View our'},
              {title: 'fee schedule', onPress: () => undefined},
              {title: 'to learn more. All investments have risks.'},
            ],
          ],
        },
      ],
    },
    {
      id: '2',
      icon: 'trophy-outline',
      sections: [
        {
          title: 'Enjoy commission-free stock trading',
          titleType: 'h4',
          titleStyle: {paddingBottom: config.padding(10)},
          paragraphs: [
            [
              {
                title:
                  'Invest in thousands of US an global stocks without paying commission or foreign exchange fees.',
              },
            ],
            [{title: 'View fee disclosures', onPress: () => undefined}],
          ],
        },
      ],
    },
    {
      id: '3',
      icon: 'trophy-outline',
      sections: [
        {
          title: 'No account minimum',
          titleType: 'h4',
          titleStyle: {paddingBottom: config.padding(10)},
          paragraphs: [
            [
              {
                title:
                  'Top up your account with as little or as much as you like.',
              },
            ],
          ],
        },
      ],
    },
    {
      id: '4',
      icon: 'trophy-outline',
      sections: [
        {
          title: 'Everything at your fingertips',
          titleType: 'h4',
          titleStyle: {paddingBottom: config.padding(10)},
          paragraphs: [
            [
              {
                title:
                  'Stay on top of your portfolio with real-time market data, business news, and customized notifications.',
              },
            ],
          ],
        },
      ],
    },
    {
      id: '5',
      icon: 'trophy-outline',
      sections: [
        {
          title: 'Account protection',
          titleType: 'h4',
          titleStyle: {paddingBottom: config.padding(10)},
          paragraphs: [
            [
              {
                title:
                  'Robinhood Financial is a member of SIPC. Securities in your account are protected up to $500,000. For details, please see',
              },
              {title: 'www.sipc.org', onPress: () => undefined},
              {title: '.'},
            ],
          ],
        },
      ],
    },
  ];

  return (
    <Screen>
      <View style={{flex: 1}}>
        <Carousel duration={6000} slides={slides} />
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

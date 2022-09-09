import React, { memo, useCallback, useState } from 'react';
import {
  Button,
  Carousel,
  CarouselSlide,
  Screen,
  View,
} from '../../../../components';
import { FirebaseAuthTypes } from '../../../../conversions';
import { spacing } from '../../../../features';
import { useRootDispatch } from '../../../../redux';
import { createItem, loadUser, login } from '../../models';
import { completeConfig, getDefaultUserTemplate } from '../../utils';
import { Login } from './Login';

const slides: CarouselSlide[] = [
  {
    icon: 'trophy-outline',
    id: '1',
    sections: [
      {
        paragraphs: [
          [{ title: 'Start investing commission-free' }],
          [
            { title: 'Other fees may apply. View our' },
            { onPress: () => undefined, title: 'fee schedule' },
            { title: 'to learn more. All investments have risks.' },
          ],
        ],
        title: 'Welcome to Accomplish',
        titleStyle: { paddingBottom: spacing(10) },
        titleType: 'h4',
      },
    ],
  },
  {
    icon: 'trophy-outline',
    id: '2',
    sections: [
      {
        paragraphs: [
          [
            {
              title:
                'Invest in thousands of US an global stocks without paying commission or foreign exchange fees.',
            },
          ],
          [{ onPress: () => undefined, title: 'View fee disclosures' }],
        ],
        title: 'Enjoy commission-free stock trading',
        titleStyle: { paddingBottom: spacing(10) },
        titleType: 'h4',
      },
    ],
  },
  {
    icon: 'trophy-outline',
    id: '3',
    sections: [
      {
        paragraphs: [
          [
            {
              title:
                'Top up your account with as little or as much as you like.',
            },
          ],
        ],
        title: 'No account minimum',
        titleStyle: { paddingBottom: spacing(10) },
        titleType: 'h4',
      },
    ],
  },
  {
    icon: 'trophy-outline',
    id: '4',
    sections: [
      {
        paragraphs: [
          [
            {
              title:
                'Stay on top of your portfolio with real-time market data, business news, and customized notifications.',
            },
          ],
        ],
        title: 'Everything at your fingertips',
        titleStyle: { paddingBottom: spacing(10) },
        titleType: 'h4',
      },
    ],
  },
  {
    icon: 'trophy-outline',
    id: '5',
    sections: [
      {
        paragraphs: [
          [
            {
              title:
                'Robinhood Financial is a member of SIPC. Securities in your account are protected up to $500,000. For details, please see',
            },
            { onPress: () => undefined, title: 'www.sipc.org' },
            { title: '.' },
          ],
        ],
        title: 'Account protection',
        titleStyle: { paddingBottom: spacing(10) },
        titleType: 'h4',
      },
    ],
  },
];

export const Welcome = memo(function Welcome() {
  const dispatch = useRootDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const onToggleLogin = useCallback(() => setShowLogin((p) => !p), []);

  const onLoginSuccess = useCallback(
    (auth: FirebaseAuthTypes.User | null) => {
      if (!auth) throw new Error('no login');
      dispatch(login(auth));
      const { user, items } = getDefaultUserTemplate();
      items.forEach((item) => dispatch(createItem(item)));
      dispatch(loadUser({ ...user, email: auth.email || 'anonymous' }));
    },
    [dispatch],
  );

  return (
    <>
      <Screen>
        <View flex>
          <Carousel
            duration={6000}
            slides={slides}
          />
          <View style={{ padding: completeConfig.padding }}>
            <Button
              buttonStyle={{ marginBottom: spacing(2) }}
              center
              color="accent"
              emphasis="high"
              onPress={onToggleLogin}
              title="Get Started"
            />
          </View>
        </View>
      </Screen>
      {showLogin ? (
        <Login
          onBackgroundPress={onToggleLogin}
          onSuccess={onLoginSuccess}
          showAnonymous
          showEmail
          showFacebook
          showGoogle
          showPhone
        />
      ) : null}
    </>
  );
});

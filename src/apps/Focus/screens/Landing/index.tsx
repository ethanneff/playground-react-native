import React, { memo, useCallback } from 'react';

import {
  Button,
  Carousel,
  CarouselSlide,
  Screen,
  Toast,
  View,
} from '../../../../components';
import { auth } from '../../../../conversions';
import { spacing } from '../../../../features';

const slides: CarouselSlide[] = [
  {
    id: '1',
    icon: 'trophy-outline',
    sections: [
      {
        title: 'Welcome to Accomplish',
        titleType: 'h4',
        titleStyle: { paddingBottom: spacing(10) },
        paragraphs: [
          [{ title: 'Start investing commission-free' }],
          [
            { title: 'Other fees may apply. View our' },
            { title: 'fee schedule', onPress: () => undefined },
            { title: 'to learn more. All investments have risks.' },
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
        titleStyle: { paddingBottom: spacing(10) },
        paragraphs: [
          [
            {
              title:
                'Invest in thousands of US an global stocks without paying commission or foreign exchange fees.',
            },
          ],
          [{ title: 'View fee disclosures', onPress: () => undefined }],
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
        titleStyle: { paddingBottom: spacing(10) },
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
        titleStyle: { paddingBottom: spacing(10) },
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
        titleStyle: { paddingBottom: spacing(10) },
        paragraphs: [
          [
            {
              title:
                'Robinhood Financial is a member of SIPC. Securities in your account are protected up to $500,000. For details, please see',
            },
            { title: 'www.sipc.org', onPress: () => undefined },
            { title: '.' },
          ],
        ],
      },
    ],
  },
];

export const Landing = memo(function Landing() {
  const handleSubmit = useCallback(async () => {
    try {
      await auth().signInAnonymously();
    } catch (e) {
      Toast.show({
        type: 'accent',
        props: {
          title: 'bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70',
          description: 'bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70',
        },
      });
      // TODO: collect crash
    }
  }, []);

  return (
    <Screen>
      <View flex>
        <Carousel
          duration={6000}
          slides={slides}
        />
        <View style={{ padding: spacing(2) }}>
          <Button
            buttonStyle={{ marginBottom: spacing(2) }}
            center
            color="accent"
            emphasis="high"
            onPress={handleSubmit}
            title="Get Started"
          />
        </View>
      </View>
    </Screen>
  );
});

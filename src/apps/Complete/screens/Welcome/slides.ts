import { type CarouselSlide } from '../../../../components';
import { spacing } from '../../../../features';

export const slides: CarouselSlide[] = [
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
    icon: 'cat',
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
    icon: 'dog',
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
    icon: 'bird',
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

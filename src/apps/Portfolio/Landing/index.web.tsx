import React, { type ReactNode } from 'react';
import {
  Image,
  type DimensionValue,
  type ImageSourcePropType,
} from 'react-native';
import {
  Icon,
  Pressable,
  Sentence,
  Text,
  View,
  type IconName,
  type SentenceType,
} from '../../../components';
import { spacing, useColors } from '../../../features';

const missingCallback = () => false;

const image = require('../../../assets/line-chart.png') as ImageSourcePropType;

type SignInButtonProperties = {
  readonly icon: IconName;
  readonly onPress: () => void;
  readonly title: string;
};
const SignInButton = ({ icon, onPress, title }: SignInButtonProperties) => {
  const colors = useColors();
  return (
    <Pressable
      containerStyle={{
        alignItems: 'center',
        borderColor: colors.border.primaryA,
        borderRadius: spacing(10),
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: spacing(2),
        padding: spacing(2),
      }}
      onPress={onPress}
    >
      <Icon
        name={icon}
        style={{
          height: '30px' as DimensionValue,
          width: '30px' as DimensionValue,
        }}
      />
      <Text
        style={{ paddingLeft: spacing(2) }}
        title={title}
        type="h4"
      />
    </Pressable>
  );
};

type NavButtonProperties = {
  readonly inverted?: boolean;
  readonly onPress: () => void;
  readonly title: string;
};
const NavButton = ({ inverted, onPress, title }: NavButtonProperties) => {
  const colors = useColors();
  return (
    <Pressable
      containerStyle={{
        backgroundColor: inverted
          ? colors.background.primaryB
          : colors.background.primaryA,
        borderRadius: spacing(10),
        justifyContent: 'center',
        paddingHorizontal: spacing(2),
        paddingVertical: spacing(2),
      }}
      onPress={onPress}
    >
      <Text
        bold
        inverse={inverted}
        title={title}
        type="h5"
      />
    </Pressable>
  );
};

type HeaderProperties = {
  readonly height: number;
};

export const Header = ({ height }: HeaderProperties) => {
  const colors = useColors();
  return (
    <View
      style={{
        backgroundColor: colors.background.primaryA,
        borderBottomWidth: 1,
        borderColor: colors.border.primaryA,
        flexDirection: 'row',
        height,
        justifyContent: 'space-between',
        padding: spacing(4),
        position: 'absolute',
        width: '100%',
        zIndex: 2,
      }}
    >
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <Image
          source={image}
          style={{
            height: '30px' as DimensionValue,
            width: '30px' as DimensionValue,
          }}
        />
        <Text
          bold
          style={{ paddingHorizontal: spacing(4) }}
          title="Core"
          type="h3"
        />
        <NavButton
          onPress={missingCallback}
          title="Features"
        />
        <NavButton
          onPress={missingCallback}
          title="Premium"
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <NavButton
          onPress={missingCallback}
          title="Sign In"
        />
        <NavButton
          inverted
          onPress={missingCallback}
          title="Sign Up"
        />
      </View>
    </View>
  );
};

type AppIconProperties = {
  readonly onPress: () => void;
  readonly type: 'apple' | 'google-play';
};

const AppIcon = ({ onPress, type }: AppIconProperties) => {
  const colors = useColors();
  const iconSize = '48px' as DimensionValue;
  const text = type === 'apple' ? 'Download on the' : 'GET IT ON';
  const store = type === 'apple' ? 'App Store' : 'Google Play';
  return (
    <Pressable
      contentStyle={{
        backgroundColor: colors.background.primaryB,
        borderRadius: spacing(2),
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: spacing(4),
        paddingVertical: spacing(2),
        width: '248px' as DimensionValue,
      }}
      onPress={onPress}
    >
      <Icon
        color="primaryA"
        name={type}
        style={{ alignSelf: 'center', height: iconSize, width: iconSize }}
      />
      <View style={{ paddingLeft: spacing(2) }}>
        <Text
          inverse
          title={text}
          type="h5"
        />
        <Text
          inverse
          title={store}
          type="h3"
        />
      </View>
    </Pressable>
  );
};

type SectionProperties = {
  readonly backgroundColor: string;
  readonly children: ReactNode | ReactNode[];
  readonly paddingTop?: number;
};

const Section = ({
  backgroundColor,
  children,
  paddingTop,
}: SectionProperties) => (
  <View
    style={{
      backgroundColor,
      height: '100vh' as DimensionValue,
      paddingTop,
    }}
  >
    {children}
  </View>
);

export const Landing = () => {
  const height = spacing(18);
  const titleSentence: SentenceType[] = [
    { title: 'Get started with ', type: 'h2' },
    { bold: true, title: 'Core', type: 'h2' },
  ];
  const passwordSentence: SentenceType[] = [
    { title: 'Or use your password to ' },
    {
      bold: true,
      onPress: () => false,
      title: 'sign up ',
    },
    { title: 'or ' },
    {
      bold: true,
      onPress: () => false,
      title: 'sign in ',
    },
  ];
  const colors = useColors();

  const onNavLinkPress = (url: string) => () => window.open(url, '_blank');

  return (
    <>
      <Header height={height} />
      <Section
        backgroundColor={colors.background.secondary}
        paddingTop={height}
      >
        <Sentence
          sentences={titleSentence}
          style={{ alignSelf: 'center', paddingVertical: spacing(8) }}
        />
        <View style={{ alignSelf: 'center', width: '400px' as DimensionValue }}>
          <SignInButton
            icon="apple"
            onPress={missingCallback}
            title="Continue with Apple"
          />
          <SignInButton
            icon="google"
            onPress={missingCallback}
            title="Continue with Google"
          />
          <SignInButton
            icon="facebook"
            onPress={missingCallback}
            title="Continue with Facebook"
          />
          <Sentence
            sentences={passwordSentence}
            style={{
              alignSelf: 'center',
              paddingVertical: spacing(4),
            }}
          />
        </View>
        <View flex={1} />
        <View
          flexDirection="row"
          justifyContent="space-around"
        >
          <AppIcon
            onPress={missingCallback}
            type="apple"
          />
          <AppIcon
            onPress={missingCallback}
            type="google-play"
          />
        </View>
      </Section>
      <Section backgroundColor={colors.background.primaryA}>
        <View flex={1} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: spacing(4),
          }}
        >
          <NavButton
            onPress={onNavLinkPress('https://www.linkedin.com/in/ethanneff')}
            title="About us"
          />
          <NavButton
            onPress={onNavLinkPress('mailto:ethan.neff@eneff.com')}
            title="Contact us"
          />
          <NavButton
            onPress={missingCallback}
            title="Terms of Service"
          />
          <NavButton
            onPress={missingCallback}
            title="Privacy Policy"
          />
        </View>
      </Section>
    </>
  );
};

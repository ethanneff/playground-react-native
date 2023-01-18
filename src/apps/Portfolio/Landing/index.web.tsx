import React, { memo, type ReactNode } from 'react';
import { Image, type ImageSourcePropType } from 'react-native';
import {
  Icon,
  Sentence,
  Text,
  TouchableOpacity,
  View,
  type IconName,
  type SentenceType,
} from '../../../components';
import { spacing, useColors } from '../../../features';

const missingCallback = () => undefined;

const image = require('../../../assets/line-chart.png') as ImageSourcePropType;

type SignInButtonProps = {
  icon: IconName;
  onPress: () => void;
  title: string;
};
const SignInButton = memo(function SignInButton({
  icon,
  onPress,
  title,
}: SignInButtonProps) {
  const colors = useColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        borderColor: colors.border.primaryA,
        borderRadius: spacing(10),
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: spacing(2),
        padding: spacing(2),
      }}
    >
      <Icon
        name={icon}
        style={{ height: '30px', width: '30px' }}
      />
      <Text
        style={{ paddingLeft: spacing(2) }}
        title={title}
        type="h4"
      />
    </TouchableOpacity>
  );
});

type NavButtonProps = {
  inverted?: boolean;
  onPress: () => void;
  title: string;
};
const NavButton = memo(function NavButton({
  inverted,
  onPress,
  title,
}: NavButtonProps) {
  const colors = useColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: inverted
          ? colors.background.primaryB
          : colors.background.primaryA,
        borderRadius: spacing(10),
        justifyContent: 'center',
        paddingHorizontal: spacing(2),
        paddingVertical: spacing(2),
      }}
    >
      <Text
        bold
        inverse={inverted}
        title={title}
        type="h5"
      />
    </TouchableOpacity>
  );
});

type HeaderProps = {
  height: number;
};

export const Header = memo(function Header({ height }: HeaderProps) {
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
          style={{ height: '30px', width: '30px' }}
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
});

type AppIconProps = {
  onPress: () => void;
  type: 'apple' | 'google-play';
};

const AppIcon = memo(function AppIcon({ onPress, type }: AppIconProps) {
  const colors = useColors();
  const iconSize = '48px';
  const text = type === 'apple' ? 'Download on the' : 'GET IT ON';
  const store = type === 'apple' ? 'App Store' : 'Google Play';
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.background.primaryB,
        borderRadius: spacing(2),
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: spacing(4),
        paddingVertical: spacing(2),
        width: '248px',
      }}
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
    </TouchableOpacity>
  );
});

type SectionProps = {
  backgroundColor: string;
  children: ReactNode | ReactNode[];
  paddingTop?: number;
};

const Section = memo(function Section({
  backgroundColor,
  children,
  paddingTop,
}: SectionProps) {
  return (
    <View
      style={{
        backgroundColor,
        height: '100vh',
        paddingTop,
      }}
    >
      {children}
    </View>
  );
});

export const Landing = memo(function PortfolioLanding() {
  const height = spacing(18);
  const titleSentence: SentenceType[] = [
    { title: 'Get started with ', type: 'h2' },
    { bold: true, title: 'Core', type: 'h2' },
  ];
  const passwordSentence: SentenceType[] = [
    { title: 'Or use your password to ' },
    {
      bold: true,
      onPress: () => undefined,
      title: 'sign up ',
    },
    { title: 'or ' },
    {
      bold: true,
      onPress: () => undefined,
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
        <View style={{ alignSelf: 'center', width: '400px' }}>
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
});

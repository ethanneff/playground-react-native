import React, { memo, ReactNode } from 'react';
import { Image, View } from 'react-native';
import {
  Icon,
  IconName,
  Sentence,
  Text,
  TouchableOpacity,
} from '../../../components';
import { SentenceType } from '../../../components/Sentence/types';
import { spacing, useColors } from '../../../features';

const missingCallback = () => undefined;

const image = require('../../../assets/line-chart.png');

interface SignInButtonProps {
  icon: IconName;
  onPress: () => void;
  title: string;
}
const SignInButton = memo(function SignInButton({
  onPress,
  icon,
  title,
}: SignInButtonProps) {
  const colors = useColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: colors.border.primaryA,
        borderWidth: 2,
        padding: spacing(2),
        marginBottom: spacing(2),
        borderRadius: spacing(10),
      }}
    >
      <Icon
        name={icon}
        style={{ width: '30px', height: '30px' }}
      />
      <Text
        style={{ paddingLeft: spacing(2) }}
        title={title}
        type="h4"
      />
    </TouchableOpacity>
  );
});

interface NavButtonProps {
  inverted?: boolean;
  onPress: () => void;
  title: string;
}
const NavButton = memo(function NavButton({
  onPress,
  title,
  inverted,
}: NavButtonProps) {
  const colors = useColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        justifyContent: 'center',
        borderRadius: spacing(10),
        paddingVertical: spacing(2),
        paddingHorizontal: spacing(2),
        backgroundColor: inverted
          ? colors.background.primaryB
          : colors.background.primaryA,
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

interface HeaderProps {
  height: number;
}

export const Header = memo(function Header({ height }: HeaderProps) {
  const colors = useColors();
  return (
    <View
      style={{
        backgroundColor: colors.background.primaryA,
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: colors.border.primaryA,
        padding: spacing(4),
        borderBottomWidth: 1,
        zIndex: 2,
        height,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={image}
          style={{ width: '30px', height: '30px' }}
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

interface AppIconProps {
  onPress: () => void;
  type: 'google-play' | 'apple';
}

const AppIcon = memo(function AppIcon({ onPress, type }: AppIconProps) {
  const colors = useColors();
  const iconSize = '48px';
  const text = type === 'apple' ? 'Download on the' : 'GET IT ON';
  const store = type === 'apple' ? 'App Store' : 'Google Play';
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '248px',
        justifyContent: 'center',
        borderRadius: spacing(2),
        flexDirection: 'row',
        backgroundColor: colors.background.primaryB,
        paddingVertical: spacing(2),
        paddingHorizontal: spacing(4),
      }}
    >
      <Icon
        color="primaryA"
        name={type}
        style={{ width: iconSize, height: iconSize, alignSelf: 'center' }}
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

interface SectionProps {
  backgroundColor: string;
  children: ReactNode | ReactNode[];
  paddingTop?: number;
}

const Section = memo(function Section({
  paddingTop,
  children,
  backgroundColor,
}: SectionProps) {
  return (
    <View
      style={{
        paddingTop,
        height: '100vh',
        backgroundColor,
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
    { title: 'Core', bold: true, type: 'h2' },
  ];
  const passwordSentence: SentenceType[] = [
    { title: 'Or use your password to ' },
    {
      title: 'sign up ',
      bold: true,
      onPress: () => undefined,
    },
    { title: 'or ' },
    {
      title: 'sign in ',
      bold: true,
      onPress: () => undefined,
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
          style={{ paddingVertical: spacing(8), alignSelf: 'center' }}
        />
        <View style={{ width: '400px', alignSelf: 'center' }}>
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
        <View style={{ flex: 1 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
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
        <View style={{ flex: 1 }} />
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

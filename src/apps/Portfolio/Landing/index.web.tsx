import React, {memo, ReactNode} from 'react';
import {Image, View} from 'react-native';
import {
  Icon,
  Sentence,
  Text,
  TouchableOpacity,
  Word,
} from '../../../components';
import {useColor} from '../../../hooks';
import {config} from '../../../utils';

const missingCallback = () => undefined;

interface SignInButtonProps {
  onPress: () => void;
  icon: string;
  title: string;
}
const SignInButton = memo(function SignInButton({
  onPress,
  icon,
  title,
}: SignInButtonProps) {
  const color = useColor();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: color.text,
        borderWidth: 2,
        padding: config.padding(2),
        marginBottom: config.padding(2),
        borderRadius: config.padding(10),
      }}>
      <Icon name={icon} style={{width: '30px', height: '30px'}} />
      <Text style={{paddingLeft: config.padding(2)}} title={title} type="h4" />
    </TouchableOpacity>
  );
});

interface NavButtonProps {
  onPress: () => void;
  inverted?: boolean;
  title: string;
}
const NavButton = memo(function NavButton({
  onPress,
  title,
  inverted,
}: NavButtonProps) {
  const color = useColor();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        justifyContent: 'center',
        borderRadius: config.padding(10),
        paddingVertical: config.padding(2),
        paddingHorizontal: config.padding(2),
        backgroundColor: inverted ? color.text : color.background,
      }}>
      <Text bold inverse={inverted} title={title} type="h5" />
    </TouchableOpacity>
  );
});

interface HeaderProps {
  height: number;
}

export const Header = memo(function Header({height}: HeaderProps) {
  const color = useColor();
  return (
    <View
      style={{
        backgroundColor: color.background,
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: color.secondary,
        padding: config.padding(4),
        borderBottomWidth: 1,
        zIndex: 2,
        height,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={image} style={{width: '30px', height: '30px'}} />
        <Text
          bold
          style={{paddingHorizontal: config.padding(4)}}
          title="Core"
          type="h3"
        />
        <NavButton onPress={missingCallback} title="Features" />
        <NavButton onPress={missingCallback} title="Premium" />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <NavButton onPress={missingCallback} title="Sign In" />
        <NavButton inverted onPress={missingCallback} title="Sign Up" />
      </View>
    </View>
  );
});

interface AppIconProps {
  onPress: () => void;
  type: 'google-play' | 'apple';
}

const AppIcon = memo(function AppIcon({onPress, type}: AppIconProps) {
  const color = useColor();
  const iconSize = '48px';
  const text = type === 'apple' ? 'Download on the' : 'GET IT ON';
  const store = type === 'apple' ? 'App Store' : 'Google Play';
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '248px',
        justifyContent: 'center',
        borderRadius: config.padding(2),
        flexDirection: 'row',
        backgroundColor: color.text,
        paddingVertical: config.padding(2),
        paddingHorizontal: config.padding(4),
      }}>
      <Icon
        color={color.background}
        name={type}
        style={{width: iconSize, height: iconSize, alignSelf: 'center'}}
      />
      <View style={{paddingLeft: config.padding(2)}}>
        <Text inverse title={text} type="h5" />
        <Text inverse title={store} type="h3" />
      </View>
    </TouchableOpacity>
  );
});

interface SectionProps {
  children: ReactNode | ReactNode[];
  paddingTop?: number;
  backgroundColor: string;
}

const Section = memo(function Section({
  paddingTop,
  children,
  backgroundColor,
}: SectionProps) {
  return (
    <View
      style={{
        paddingTop: paddingTop,
        height: '100vh',
        backgroundColor: backgroundColor,
      }}>
      {children}
    </View>
  );
});

const image = require('../../../assets/line-chart.png');

export const Landing = memo(function PortfolioLanding() {
  const height = config.padding(18);
  const titleSentence: Word[] = [
    {title: 'Get started with ', type: 'h2'},
    {title: 'Core', bold: true, type: 'h2'},
  ];
  const passwordSentence: Word[] = [
    {title: 'Or use your password to '},
    {
      title: 'sign up ',
      bold: true,
      onPress: () => undefined,
    },
    {title: 'or '},
    {
      title: 'sign in ',
      bold: true,
      onPress: () => undefined,
    },
  ];
  const color = useColor();

  const onNavLinkPress = (url: string) => () => window.open(url, '_blank');

  return (
    <>
      <Header height={height} />
      <Section backgroundColor={color.light} paddingTop={height}>
        <Sentence
          style={{paddingVertical: config.padding(8), alignSelf: 'center'}}
          words={titleSentence}
        />
        <View style={{width: '400px', alignSelf: 'center'}}>
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
            style={{
              alignSelf: 'center',
              paddingVertical: config.padding(4),
            }}
            words={passwordSentence}
          />
        </View>
        <View style={{flex: 1}} />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <AppIcon onPress={missingCallback} type="apple" />
          <AppIcon onPress={missingCallback} type="google-play" />
        </View>
      </Section>
      <Section backgroundColor={color.background}>
        <View style={{flex: 1}} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: config.padding(4),
          }}>
          <NavButton
            onPress={onNavLinkPress('https://www.linkedin.com/in/ethanneff')}
            title="About us"
          />
          <NavButton
            onPress={onNavLinkPress('mailto:ethan.neff@eneff.com')}
            title="Contact us"
          />
          <NavButton onPress={missingCallback} title="Terms of Service" />
          <NavButton onPress={missingCallback} title="Privacy Policy" />
        </View>
      </Section>
    </>
  );
});

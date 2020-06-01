import React, {memo} from 'react';
import {
  Icon,
  Sentence,
  Text,
  TouchableOpacity,
  Word,
} from '../../../../components';
import {Image, View} from 'react-native';
import {useColor} from '../../../../hooks';
import {Theme} from '../../../../utils';

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
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: color.text,
        borderWidth: 2,
        padding: Theme.padding.p02,
        marginBottom: Theme.padding.p02,
        borderRadius: Theme.padding.p10,
      }}
      onPress={onPress}>
      <Icon name={icon} style={{width: '30px', height: '30px'}} />
      <Text title={title} style={{paddingLeft: Theme.padding.p02}} type="h4" />
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
      style={{
        justifyContent: 'center',
        borderRadius: Theme.padding.p10,
        paddingVertical: Theme.padding.p02,
        paddingHorizontal: Theme.padding.p02,
        backgroundColor: inverted ? color.text : color.background,
      }}
      onPress={onPress}>
      <Text title={title} type="h5" bold inverse={inverted} />
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
        padding: Theme.padding.p04,
        borderBottomWidth: 1,
        zIndex: 2,
        height,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={image} style={{width: '30px', height: '30px'}} />
        <Text
          title="Core"
          type="h3"
          bold
          style={{paddingHorizontal: Theme.padding.p04}}
        />
        <NavButton title="Features" onPress={() => undefined} />
        <NavButton title="Premium" onPress={() => undefined} />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <NavButton title="Sign In" onPress={() => undefined} />
        <NavButton inverted title="Sign Up" onPress={() => undefined} />
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
        borderRadius: Theme.padding.p02,
        flexDirection: 'row',
        backgroundColor: color.text,
        paddingVertical: Theme.padding.p02,
        paddingHorizontal: Theme.padding.p04,
      }}>
      <Icon
        name={type}
        color={color.background}
        style={{width: iconSize, height: iconSize, alignSelf: 'center'}}
      />
      <View style={{paddingLeft: Theme.padding.p02}}>
        <Text type="h5" title={text} inverse />
        <Text type="h3" title={store} inverse />
      </View>
    </TouchableOpacity>
  );
});

interface SectionProps {
  children: any;
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

const image = require('../../../../assets/line-chart.png');
export default memo(function PortfolioLanding() {
  const height = Theme.padding.p18;
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

  return (
    <View>
      <Header height={height} />
      <Section paddingTop={height} backgroundColor={color.light}>
        <Sentence
          style={{paddingVertical: Theme.padding.p08, alignSelf: 'center'}}
          words={titleSentence}
        />
        <View style={{width: '400px', alignSelf: 'center'}}>
          <SignInButton
            icon="apple"
            title="Continue with Apple"
            onPress={() => undefined}
          />
          <SignInButton
            icon="google"
            title="Continue with Google"
            onPress={() => undefined}
          />
          <SignInButton
            icon="facebook"
            title="Continue with Facebook"
            onPress={() => undefined}
          />
          <Sentence
            style={{
              alignSelf: 'center',
              paddingVertical: Theme.padding.p04,
            }}
            words={passwordSentence}
          />
        </View>
        <View style={{flex: 1}} />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <AppIcon onPress={() => undefined} type="apple" />
          <AppIcon onPress={() => undefined} type="google-play" />
        </View>
      </Section>
      <Section backgroundColor={color.background}>
        <View style={{flex: 1}} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: Theme.padding.p04,
          }}>
          <NavButton
            title="About us"
            onPress={() =>
              window.open('https://www.linkedin.com/in/ethanneff', '_blank')
            }
          />
          <NavButton
            title="Contact us"
            onPress={() => window.open('mailto:ethan.neff@eneff.com', '_blank')}
          />
          <NavButton title="Terms of Service" onPress={() => undefined} />
          <NavButton title="Privacy Policy" onPress={() => undefined} />
        </View>
      </Section>
    </View>
  );
});

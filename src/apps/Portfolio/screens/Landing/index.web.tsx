import React, {memo} from 'react';
import {Text as OriginalText, ViewStyle, StyleProp} from 'react-native';
import {Text, TouchableOpacity, Icon} from '../../../../components';
import {View, Image} from 'react-native';
import {useColor} from '../../../../hooks';
import {Theme} from '../../../../utils';
import {FontType} from '../../../../components/Text/utils';

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

type Word = {
  title: string;
  bold?: boolean;
  type?: FontType;
  functionality?: 'link' | 'text';
  onPress?: () => void;
};
interface SentenceProps {
  words: Word[];
  style: StyleProp<ViewStyle>;
}
const Sentence = memo(function Sentence({words, style}: SentenceProps) {
  return (
    <OriginalText style={style}>
      {words.map((word) => (
        <Text
          type={word.type}
          key={word.title}
          title={word.title}
          bold={word.bold}
          onPress={word.onPress}
        />
      ))}
    </OriginalText>
  );
});

const image = require('../../../../assets/line-chart.png');
export default memo(function PortfolioLanding() {
  const color = useColor();
  const titleSentence: Word[] = [
    {title: 'Get started with ', type: 'h2'},
    {title: 'Core', bold: true, type: 'h2'},
  ];
  const passwordSentence: Word[] = [
    {title: 'Or use your password to '},
    {
      title: 'sign up ',
      functionality: 'link',
      bold: true,
      onPress: () => undefined,
    },
    {title: 'or '},
    {
      title: 'sign in ',
      functionality: 'link',
      bold: true,
      onPress: () => undefined,
    },
  ];

  return (
    <View style={{height: '100vh'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderColor: color.secondary,
          padding: Theme.padding.p04,
          borderBottomWidth: 1,
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
      <View style={{flex: 1}}>
        <Sentence
          style={{paddingVertical: Theme.padding.p08, alignSelf: 'center'}}
          words={titleSentence}
        />

        <View style={{width: '400px', alignSelf: 'center'}}>
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
      </View>
    </View>
  );
});

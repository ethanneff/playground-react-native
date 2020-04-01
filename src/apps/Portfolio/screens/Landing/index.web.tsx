import React, {memo} from 'react';
import {Text as OriginalText, ViewStyle, StyleProp} from 'react-native';
import {Text, TouchableOpacity, Icon} from '../../../../components';
import {View, Image} from 'react-native';
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
      <Text title={title} style={{paddingLeft: Theme.padding.p02}} h4 />
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
      <Text title={title} h5 bold inverse={inverted} />
    </TouchableOpacity>
  );
});

type Word = {
  title: string;
  bold?: boolean;
  type?: 'link' | 'text';
  onPress?: () => void;
};
interface SentenceProps {
  sentence: Word[];
  style: StyleProp<ViewStyle>;
}
const Sentence = memo(function Sentence({sentence, style}: SentenceProps) {
  return (
    <OriginalText style={style}>
      {sentence.map((word) => (
        <Text
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
  const passwordSentence: Word[] = [
    {title: 'Or use your password to '},
    {
      title: 'sign up ',
      type: 'link',
      bold: true,
      onPress: () => undefined,
    },
    {title: 'or '},
    {
      title: 'sign in ',
      type: 'link',
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
            h3
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
        <Text
          title="Get started with Core"
          h2
          center
          bold
          style={{paddingVertical: Theme.padding.p08}}
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
            sentence={passwordSentence}
          />
        </View>
        <View style={{flex: 1}}></View>

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

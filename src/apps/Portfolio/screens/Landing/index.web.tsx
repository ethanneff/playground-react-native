import React, {memo} from 'react';
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
        borderRadius: Theme.padding.p10,
      }}
      onPress={onPress}>
      <Icon name={icon} />
      <Text title={title} />
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
        paddingHorizontal: Theme.padding.p04,
        backgroundColor: inverted ? color.text : color.background,
      }}
      onPress={onPress}>
      <Text title={title} h5 bold inverse={inverted} />
    </TouchableOpacity>
  );
});

const image = require('../../../../assets/line-chart.png');
export default memo(function PortfolioLanding() {
  const color = useColor();
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderColor: color.secondary,
          padding: Theme.padding.p04,
          borderBottomWidth: 1,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={image} style={{width: '50px', height: '50px'}} />
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
      <Text title="Get started with Core" h1 />
      <View style={{width: '200'}}>
        <SignInButton
          icon="google"
          title="continue with google"
          onPress={() => undefined}
        />
        <SignInButton
          icon="facebook"
          title="continue with facebook"
          onPress={() => undefined}
        />
      </View>
      <Text title="Or use your password to sign up or sign in" />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
  );
});

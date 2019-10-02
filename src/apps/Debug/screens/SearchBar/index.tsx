import React from "react";
import {
  Animated,
  EmitterSubscription,
  FlatList,
  Keyboard,
  Platform,
  StyleSheet,
  View
} from "react-native";
import { connect } from "react-redux";
import { Icon, Screen, Text, TextInput } from "../../../../components";
import { NavigationScreen, navigate } from "../../../../models";
import { Config, Theme, colorWithOpacity } from "../../../../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: Theme.color.light,
    height: Theme.padding.p20,
    justifyContent: "center",
    padding: Theme.padding.p02
  },
  item: {
    borderBottomColor: Theme.color.light,
    borderWidth: 0.2,
    padding: Theme.padding.p06
  },
  text: {
    fontSize: Theme.padding.p06
  },
  textContainer: {
    alignItems: "center",
    backgroundColor: Theme.color.background,
    flexDirection: "row",
    height: "100%",
    padding: Theme.padding.p02
  },
  textInput: {
    flex: 1,
    marginLeft: Theme.padding.p02
  }
});

const DATA = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
  { id: 5, name: "5" },
  { id: 6, name: "6" },
  { id: 7, name: "7" },
  { id: 8, name: "8" },
  { id: 9, name: "9" },
  { id: 10, name: "10" },
  { id: 11, name: "11" },
  { id: 12, name: "12" },
  { id: 13, name: "13" },
  { id: 14, name: "14" },
  { id: 15, name: "15" },
  { id: 16, name: "16" },
  { id: 17, name: "17" },
  { id: 18, name: "18" },
  { id: 19, name: "19" }
];

interface State {
  input: string;
  iconName: string;
  animation: Animated.Value;
}

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = DispatchProps;

class Container extends React.PureComponent<Props, State> {
  public iconSearch = "magnify";
  public state: State = {
    animation: new Animated.Value(0),
    iconName: this.iconSearch,
    input: ""
  };
  private iconBack = "arrow-left";
  private textInputPlaceHolder = "Search";
  private animationDuration = 400;
  private translateIcon = this.state.animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, -60, 1]
  });
  private fadeContainer = this.state.animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      Theme.color.background,
      colorWithOpacity(Theme.color.secondary)
    ]
  });
  private iconChangeTimeout?: any;
  private keyboardDidShowListener: EmitterSubscription;
  private keyboardDidHideListener: EmitterSubscription;
  private keyboardWillShowListener: EmitterSubscription;
  private keyboardWillHideListener: EmitterSubscription;

  public constructor(props: Props) {
    super(props);
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );
  }

  public componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
    clearTimeout(this.iconChangeTimeout);
  }
  public render() {
    const { iconName, input } = this.state;
    return (
      <Screen onLeftPress={this.nav("debug")}>
        <View style={styles.header}>
          <View style={styles.textContainer}>
            <Animated.View
              style={{
                transform: [{ translateX: this.translateIcon }]
              }}
            >
              <Icon name={iconName} style={styles.text} />
            </Animated.View>
            <TextInput
              value={input}
              onChangeText={(value: string) => this.setState({ input: value })}
              placeholder={this.textInputPlaceHolder}
              containerStyle={[styles.textInput, styles.text]}
            />
          </View>
        </View>
        <Animated.View style={{ flex: 1, backgroundColor: this.fadeContainer }}>
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={DATA}
            renderItem={({ item }) => 
              <Text subtitle2 style={styles.item} title={item.name} />
            }
          />
        </Animated.View>
      </Screen>
    );
  }

  private nav = (to: NavigationScreen) => () => this.props.navigate(to);

  private onSearchBarFocus() {
    this.animate(1);
    this.changeIcon(this.iconBack);
  }

  private animate(value: number) {
    Animated.timing(this.state.animation, {
      duration: this.animationDuration,
      toValue: value
    }).start();
  }

  private changeIcon(iconName: string) {
    this.iconChangeTimeout = setTimeout(() => {
      clearTimeout(this.iconChangeTimeout);
      this.setState({ iconName });
    }, this.animationDuration / 2);
  }

  private onSearchBarUnFocus() {
    this.animate(0);
    this.changeIcon(this.iconSearch);
  }

  private keyboardWillShow = () => {
    if (Platform.OS !== Config.os.ios) {
      return;
    }
    this.onSearchBarFocus();
  };

  private keyboardWillHide = () => {
    if (Platform.OS !== Config.os.ios) {
      return;
    }
    this.onSearchBarUnFocus();
  };

  private keyboardDidShow = () => {
    if (Platform.OS !== Config.os.android) {
      return;
    }
    this.onSearchBarFocus();
  };

  private keyboardDidHide = () => {
    if (Platform.OS !== Config.os.android) {
      return;
    }
    this.onSearchBarUnFocus();
  };
}

const mapDispatchToProps: DispatchProps = { navigate };

export default connect(
  null,
  mapDispatchToProps
)(Container);

import * as React from "react";
import { Animated, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Button, Screen } from "../../../../components";
import { RootState } from "../../../../containers";
import {
  NavigationScreen,
  navigate,
  getHeight,
  getWidth
} from "../../../../models";

const styles = StyleSheet.create({
  ball: {
    borderColor: "black",
    borderRadius: 30,
    borderWidth: 30,
    height: 60,
    marginLeft: -30,
    marginTop: -30,
    width: 60
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

interface StateProps {
  height: number;
  width: number;
}

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = StateProps & DispatchProps;

class Container extends React.PureComponent<Props> {
  private ballPosition: Animated.ValueXY;

  constructor(props: Props) {
    super(props);
    const { width, height } = this.props;
    this.ballPosition = new Animated.ValueXY({ x: width / 2, y: height / 2 });
  }

  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
  public render() {
    return (
      <Screen onLeftPress={this.nav(NavigationScreen.Debug)}>
        <Animated.View style={[this.ballPosition.getLayout(), styles.ball]} />
        <View style={styles.button}>
          <Button title="initial" onPress={() => this.animate(0.5, 0.5)} />
          <Button
            title="random"
            onPress={() => this.animate(Math.random(), Math.random())}
          />
        </View>
      </Screen>
    );
  }

  private animate(dx: number, dy: number) {
    const { width, height } = this.props;
    Animated.spring(this.ballPosition, {
      toValue: { x: width * dx, y: height * dy }
    }).start();
  }
}

const mapStateToProps = (state: RootState) => ({
  height: getHeight(state),
  width: getWidth(state)
});

const mapDispatchToProps: DispatchProps = { navigate };

export const Ball = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

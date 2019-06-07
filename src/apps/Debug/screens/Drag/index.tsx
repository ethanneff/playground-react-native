import * as React from "react";
import {
  Animated,
  PanResponder,
  PanResponderInstance,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { Screen, Text } from "../../../../components";
import { RootState } from "../../../../containers";
import {
  getHeight,
  getWidth,
  navigate,
  NavigationScreen
} from "../../../../models";

interface StateProps {
  height: number;
  width: number;
}

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = StateProps & DispatchProps;

class Container extends React.PureComponent<Props> {
  private readonly styles = StyleSheet.create({
    ball: {
      borderColor: "black",
      borderRadius: 30,
      borderWidth: 30,
      height: 60,
      marginLeft: -30,
      marginTop: -30,
      width: 60
    }
  });
  private ballPosition: Animated.ValueXY;
  private panGesture: PanResponderInstance;

  constructor(props: Props) {
    super(props);
    const { width, height } = this.props;
    this.ballPosition = new Animated.ValueXY({ x: width / 2, y: height / 2 });
    this.panGesture = PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (_, gestureState) => {
        Animated.spring(this.ballPosition, {
          toValue: { x: gestureState.moveX, y: gestureState.moveY }
        }).start();
      }
    });
  }
  public render() {
    return (
      <Screen disableScroll onLeftPress={this.nav(NavigationScreen.Debug)}>
        <Text center title="drag the circle" />
        <Animated.View
          style={[this.ballPosition.getLayout(), this.styles.ball]}
          {...this.panGesture.panHandlers}
        />
      </Screen>
    );
  }

  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
}

const mapStateToProps = (state: RootState) => ({
  height: getHeight(state),
  width: getWidth(state)
});

const mapDispatchToProps: DispatchProps = { navigate };

export const Drag = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

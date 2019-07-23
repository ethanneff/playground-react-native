import React from "react";
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
import { GestureHandler } from "./logic";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

interface DispatchProps {
  navigate: typeof navigate;
}

interface StateProps {
  height: number;
  width: number;
}

type Props = StateProps & DispatchProps;

class Container extends React.PureComponent<Props> {
  public state = {
    pinchCount: 0,
    spreadCount: 0
  };
  private panGesture: PanResponderInstance;
  private gestureHandler: GestureHandler;
  private minTouches = 3;
  private title = `pinch or spread the screen with ${this.minTouches} fingers minimum`;

  constructor(props: Props) {
    super(props);
    this.gestureHandler = new GestureHandler({ minTouches: this.minTouches });
    this.panGesture = PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: event => {
        this.gestureHandler.onPanResponderMove(event);
      },
      onPanResponderRelease: () => {
        const { spreadCount, pinchCount } = this.state;
        const outcome = this.gestureHandler.onPanResponderRelease();
        if (outcome.spread) {
          this.setState({ spreadCount: spreadCount + 1 });
        }
        if (outcome.pinch) {
          this.setState({ pinchCount: pinchCount + 1 });
        }
      }
    });
  }

  public render() {
    const { spreadCount, pinchCount } = this.state;
    return (
      <Screen disableScroll onLeftPress={this.nav(NavigationScreen.Debug)}>
        <Text center title={this.title} />
        <Text center title={`spread: ${spreadCount}`} />
        <Text center title={`pinch: ${pinchCount}`} />
        <Animated.View
          style={styles.container}
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

export const PinchSpread = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

import * as React from "react";
import {
  Animated,
  PanResponder,
  PanResponderInstance,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Screen, Text } from "../../../../components";
import { selectHeight, selectWidth } from "../../../../models";
import { RootState } from "../../../../models";
import { GestureHandler } from "./logic";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

interface StateProps {
  height: number;
  width: number;
}

type Props = StateProps & RouteComponentProps;

class Component extends React.PureComponent<Props> {
  public state = {
    spreadCount: 0,
    pinchCount: 0
  };
  private panGesture: PanResponderInstance;
  private gestureHandler: GestureHandler;
  private minTouches = 3;
  private title = `pinch or spread the screen with ${
    this.minTouches
  } fingers minimum`;

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
    const { history } = this.props;
    const { spreadCount, pinchCount } = this.state;
    return (
      <Screen disableScroll onLeftPress={() => history.goBack()}>
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
}

const mapStateToProps = (state: RootState) => ({
  width: selectWidth(state),
  height: selectHeight(state)
});

export const PinchSpread = connect(mapStateToProps)(Component);

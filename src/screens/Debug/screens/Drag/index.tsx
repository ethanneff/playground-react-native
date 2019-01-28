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

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    marginLeft: -30,
    marginTop: -30,
    borderColor: "black"
  }
});

interface StateProps {
  height: number;
  width: number;
}

type Props = StateProps & RouteComponentProps;

class Component extends React.PureComponent<Props> {
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
    const { history } = this.props;
    return (
      <Screen disableScroll onLeftPress={() => history.goBack()}>
        <Text center title="drag the circle" />
        <Animated.View
          style={[this.ballPosition.getLayout(), styles.ball]}
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

export const Drag = connect(mapStateToProps)(Component);

import * as React from "react";
import { Animated, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Button, Screen } from "../../../../components";
import { getHeight, getWidth, RootState } from "../../../../models";

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

type Props = StateProps & RouteComponentProps;

class Component extends React.PureComponent<Props> {
  private ballPosition: Animated.ValueXY;

  constructor(props: Props) {
    super(props);
    const { width, height } = this.props;
    this.ballPosition = new Animated.ValueXY({ x: width / 2, y: height / 2 });
  }

  public render() {
    const { history } = this.props;
    return (
      <Screen onLeftPress={() => history.goBack()}>
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

export const Ball = connect(mapStateToProps)(Component);

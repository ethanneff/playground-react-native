import React from "react";
import { connect } from "react-redux";
import { Screen, Text } from "../../../../components";
import { navigate, NavigationScreen } from "../../../../models";

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = DispatchProps;

const Container = (props: Props) => {
  const nav = (to: NavigationScreen) => () => props.navigate(to);
  return (
    <Screen onLeftPress={nav(NavigationScreen.Debug)}>
      <Text title="swipecell" />
    </Screen>
  );
};

const mapDispatchToProps: DispatchProps = { navigate };

export const SwipeCell = connect(
  null,
  mapDispatchToProps
)(Container);

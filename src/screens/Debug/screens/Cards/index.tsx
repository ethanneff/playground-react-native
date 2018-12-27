import * as React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { RouteComponentProps } from "react-router";
import { Screen } from "../../../../components";

const cardHeight = 250;
const cardTitle = 45;
const cardPadding = 10;

const { height } = Dimensions.get("window");
const cards = [
  {
    name: "Shot",
    color: "#a9d0b6",
    price: "30 CHF"
  },
  {
    name: "Juice",
    color: "#e9bbd1",
    price: "64 CHF"
  },
  {
    name: "Mighty Juice",
    color: "#eba65c",
    price: "80 CHF"
  },
  {
    name: "Sandwich",
    color: "#95c3e4",
    price: "85 CHF"
  },
  {
    name: "Combi",
    color: "#1c1c1c",
    price: "145 CHF"
  },
  {
    name: "Signature",
    color: "#a390bc",
    price: "92 CHF"
  },
  {
    name: "Coffee",
    color: "#fef2a0",
    price: "47 CHF"
  }
];

type Props = RouteComponentProps;

export class Cards extends React.PureComponent<Props> {
  public state = {
    y: new Animated.Value(0)
  };

  public render() {
    const { y } = this.state;
    const { history } = this.props;
    return (
      <Screen disableScroll onLeftPress={() => history.goBack()}>
        <View style={styles.container}>
          <View style={StyleSheet.absoluteFill}>
            {cards.map((card, i) => {
              const inputRange = [-cardHeight, 0];
              const outputRange = [
                cardHeight * i,
                (cardHeight - cardTitle) * -i
              ];
              if (i > 0) {
                inputRange.push(cardPadding * i);
                outputRange.push((cardHeight - cardPadding) * -i);
              }
              const translateY = y.interpolate({
                inputRange,
                outputRange,
                extrapolateRight: "clamp"
              });
              return (
                <Animated.View
                  key={card.name}
                  style={{ transform: [{ translateY }] }}
                >
                  <View
                    style={[styles.card, { backgroundColor: card.color }]}
                  />
                </Animated.View>
              );
            })}
          </View>
          <Animated.ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y }
                }
              }
            ])}
          />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 16
  },
  container: {
    flex: 1
  },
  content: {
    height: height * 2
  },
  card: {
    height: cardHeight,
    borderRadius: 10
  }
});

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
    color: "#a9d0b6",
    name: "Shot",
    price: "30 CHF"
  },
  {
    color: "#e9bbd1",
    name: "Juice",
    price: "64 CHF"
  },
  {
    color: "#eba65c",
    name: "Mighty Juice",
    price: "80 CHF"
  },
  {
    color: "#95c3e4",
    name: "Sandwich",
    price: "85 CHF"
  },
  {
    color: "#1c1c1c",
    name: "Combi",
    price: "145 CHF"
  },
  {
    color: "#a390bc",
    name: "Signature",
    price: "92 CHF"
  },
  {
    color: "#fef2a0",
    name: "Coffee",
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
                extrapolateRight: "clamp",
                inputRange,
                outputRange
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
  card: {
    borderRadius: 10,
    height: cardHeight
  },
  container: {
    flex: 1
  },
  content: {
    height: height * 2
  },
  root: {
    flex: 1,
    margin: 16
  }
});

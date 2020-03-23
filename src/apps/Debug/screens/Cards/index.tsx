import React from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Screen } from '../../../../components';
import { NavigationScreen, navigate } from '../../../../models';

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = DispatchProps;

class Container extends React.PureComponent<Props> {
  public state = {
    y: new Animated.Value(0),
  };
  private readonly cardHeight = 250;
  private readonly cardTitle = 45;
  private readonly cardPadding = 10;
  private readonly height = Dimensions.get('window').height;
  private readonly styles = StyleSheet.create({
    card: {
      borderRadius: 10,
      height: this.cardHeight,
    },
    container: {
      flex: 1,
    },
    content: {
      height: this.height * 2,
    },
    root: {
      flex: 1,
      margin: 16,
    },
  });
  private readonly cards = [
    {
      color: '#a9d0b6',
      name: 'Shot',
      price: '30 CHF',
    },
    {
      color: '#e9bbd1',
      name: 'Juice',
      price: '64 CHF',
    },
    {
      color: '#eba65c',
      name: 'Mighty Juice',
      price: '80 CHF',
    },
    {
      color: '#95c3e4',
      name: 'Sandwich',
      price: '85 CHF',
    },
    {
      color: '#1c1c1c',
      name: 'Combi',
      price: '145 CHF',
    },
    {
      color: '#a390bc',
      name: 'Signature',
      price: '92 CHF',
    },
    {
      color: '#fef2a0',
      name: 'Coffee',
      price: '47 CHF',
    },
  ];
  public render() {
    const { y } = this.state;

    return (
      <Screen onLeftPress={this.nav('debug')} title="Cards">
        <View style={this.styles.container}>
          <View style={StyleSheet.absoluteFill}>
            {this.cards.map((card, i) => {
              const inputRange = [-this.cardHeight, 0];
              const outputRange = [
                this.cardHeight * i,
                (this.cardHeight - this.cardTitle) * -i,
              ];
              if (i > 0) {
                inputRange.push(this.cardPadding * i);
                outputRange.push((this.cardHeight - this.cardPadding) * -i);
              }
              const translateY = y.interpolate({
                extrapolateRight: 'clamp',
                inputRange,
                outputRange,
              });
              return (
                <Animated.View
                  key={card.name}
                  style={{ transform: [{ translateY }] }}
                >
                  <View
                    style={[this.styles.card, { backgroundColor: card.color }]}
                  />
                </Animated.View>
              );
            })}
          </View>
          <Animated.ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={this.styles.content}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y },
                },
              },
            ])}
          />
        </View>
      </Screen>
    );
  }

  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
}

const mapDispatchToProps: DispatchProps = { navigate };

export default connect(null, mapDispatchToProps)(Container);

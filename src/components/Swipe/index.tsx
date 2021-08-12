import React from 'react';
import {View} from 'react-native';

export const Swipe = (): JSX.Element => {
  return <View />;
};
// import React from "react";
// import {
//   View,
//   Animated,
//   PanResponder,
//   Dimensions,
//   LayoutAnimation,
//   UIManager,
//   Platform
// } from "react-native";

// const SCREEN_WIDTH = Dimensions.get("window").width;
// const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
// const SWIPE_OUT_DURATION = 250;

// type Props = {}
// interface State {
//   panResponder: number;
//   position: number;
//   index: number;
// }

// class Swipe extends React.PureComponent<Props, State> {
//   static defaultProps = {
//     onSwipeRight: () => {},
//     onSwipeLeft: () => {},
//     keyProp: "id"
//   };

//   constructor(props: Props) {
//     super(props);

//     const position = new Animated.ValueXY();
//     const panResponder = PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, gesture) => {
//         position.setValue({ x: gesture.dx, y: gesture.dy });
//       },
//       onPanResponderRelease: (_, gesture) => {
//         if (gesture.dx > SWIPE_THRESHOLD) {
//           this.forceSwipe("right");
//         } else if (gesture.dx < -SWIPE_THRESHOLD) {
//           this.forceSwipe("left");
//         } else {
//           this.resetPosition();
//         }
//       }
//     });

//     this.state = { panResponder, position, index: 0 };
//   }

//   componentWillReceiveProps(nextProps: Props) {
//     if (nextProps.data !== this.props.data) {
//       this.setState({ index: 0 });
//     }
//   }

//   componentWillUpdate() {
//     UIManager.setLayoutAnimationEnabledExperimental &&
//       UIManager.setLayoutAnimationEnabledExperimental(true);
//     LayoutAnimation.spring();
//   }

//   forceSwipe(direction) {
//     const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
//     Animated.timing(this.state.position, {
//       toValue: { x, y: 0 },
//       duration: SWIPE_OUT_DURATION
//     }).start(() => this.onSwipeComplete(direction));
//   }

//   onSwipeComplete(direction) {
//     const { onSwipeLeft, onSwipeRight, data } = this.props;
//     const item = data[this.state.index];

//     direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
//     this.state.position.setValue({ x: 0, y: 0 });
//     this.setState({ index: this.state.index + 1 });
//   }

//   resetPosition() {
//     Animated.spring(this.state.position, {
//       toValue: { x: 0, y: 0 }
//     }).start();
//   }

//   getCardStyle() {
//     const { position } = this.state;
//     const rotate = position.x.interpolate({
//       inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
//       outputRange: ["-120deg", "0deg", "120deg"]
//     });

//     return {
//       ...position.getLayout(),
//       transform: [{ rotate }]
//     };
//   }

//   renderCards() {
//     if (this.state.index >= this.props.data.length) {
//       return this.props.renderNoMoreCards();
//     }

//     const deck = this.props.data.map((item, i) => {
//       if (i < this.state.index) {
//         return null;
//       }

//       if (i === this.state.index) {
//         return (
//           <Animated.View
//             key={item[this.props.keyProp]}
//             style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
//             {...this.state.panResponder.panHandlers}
//           >
//             {this.props.renderCard(item)}
//           </Animated.View>
//         );
//       }

//       return (
//         <Animated.View
//           key={item[this.props.keyProp]}
//           style={[
//             styles.cardStyle,
//             { top: 10 * (i - this.state.index), zIndex: -i }
//           ]}
//         >
//           {this.props.renderCard(item)}
//         </Animated.View>
//       );
//     });

//     return Platform.OS === "android" ? deck : deck.reverse();
//   }

//   render() {
//     return <View>{this.renderCards()}</View>;
//   }
// }

// const styles = {
//   cardStyle: {
//     position: "absolute",
//     width: SCREEN_WIDTH
//   }
// };

// export default Swipe;

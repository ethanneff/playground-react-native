// import * as React from "react";

// import {
//   StyleSheet,
//   View,
//   Image,
//   PanResponder,
//   Animated,
//   PanResponderInstance,
//   Value,
//   ValueXY
// } from "react-native";

// import { Screen } from "../../components";

// interface Props {
//   title: string;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF"
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: 10
//   },
//   instructions: {
//     textAlign: "center",
//     color: "#333333",
//     marginBottom: 5
//   }
// });

// interface State {
//   pan: ValueXY;
//   scale: Value;
// }

// export class Debug extends React.PureComponent<Props, State> {
//   panResponder: PanResponderInstance;

//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       pan: new Animated.ValueXY(),
//       scale: new Animated.Value(1)
//     };
//     this.panResponder = PanResponder.create({
//       onMoveShouldSetPanResponderCapture: () => true,
//       onPanResponderGrant: () => {
//         const { pan, scale } = this.state;
//         // Set the initial value to the current state
//         pan.setOffset({
//           x: pan.x._value,
//           y: pan.y._value
//         });
//         pan.setValue({ x: 0, y: 0 });
//         Animated.spring(scale, {
//           toValue: 2
//         }).start();
//       },
//       onPanResponderMove: Animated.event([
//         null,
//         { dx: this.state.pan.x, dy: this.state.pan.y }
//       ]),

//       onPanResponderRelease: () => {
//         // Flatten the offset to avoid erratic behavior
//         const { pan, scale } = this.state;
//         pan.flattenOffset();
//         Animated.spring(scale, { toValue: 1 }).start();
//       }
//     });
//   }

//   componentDidMount() {}

//   render() {
//     // Destructure the value of pan from the state
//     let { pan, scale } = this.state;

//     // Calculate the x and y transform from the pan value
//     let [translateX, translateY] = [pan.x, pan.y];

//     let rotate = "0deg";

//     // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
//     let imageStyle = {
//       transform: [{ translateX }, { translateY }, { rotate }, { scale }]
//     };

//     return (
//       <View>
//         <Animated.View style={[imageStyle]} {...this.panResponder.panHandlers}>
//           <Image
//             style={{ width: 50, height: 50 }}
//             source={require("./placeholder.png")}
//             resizeMode="contain"
//           />
//         </Animated.View>
//       </View>
//     );
//   }
// }

// import * as React from "react";
// import {
//   View,
//   Animated,
//   PanResponder,
//   Dimensions,
//   LayoutAnimation,
//   UIManager
// } from "react-native";

// const SCREEN_WIDTH = Dimensions.get("window").width;
// const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
// const SWIPE_OUT_DURATION = 250;

// export class Debug extends React.PureComponent {
//   static defaultProps = {
//     onSwipeRight: () => {},
//     onSwipeLeft: () => {}
//   };

//   constructor(props) {
//     super(props);

//     const position = new Animated.ValueXY();
//     const panResponder = PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (event, gesture) => {
//         position.setValue({ x: gesture.dx, y: gesture.dy });
//       },
//       onPanResponderRelease: (event, gesture) => {
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

//   componentWillReceiveProps(nextProps) {
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

//     return this.props.data
//       .map((item, i) => {
//         if (i < this.state.index) {
//           return null;
//         }

//         if (i === this.state.index) {
//           return (
//             <Animated.View
//               key={item.id}
//               style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
//               {...this.state.panResponder.panHandlers}
//             >
//               {this.props.renderCard(item)}
//             </Animated.View>
//           );
//         }

//         return (
//           <Animated.View
//             key={item.id}
//             style={[
//               styles.cardStyle,
//               { top: 10 * (i - this.state.index), zIndex: 5 }
//             ]}
//           >
//             {this.props.renderCard(item)}
//           </Animated.View>
//         );
//       })
//       .reverse();
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

import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link, Route, Screen, Switch } from "../../components";
import {
  Ball,
  Buttons,
  Cards,
  Checklist,
  Drag,
  Fonts,
  Input,
  OKRs,
  PinchSpread,
  Questionnaire,
  SearchBar
} from "./screens";

type Props = RouteComponentProps;

export class Debug extends React.PureComponent<Props> {
  public screens: any = {
    Ball,
    Drag,
    Cards,
    Fonts,
    Buttons,
    PinchSpread,
    SearchBar,
    OKRs,
    Input,
    Questionnaire,
    Checklist
  };

  public generateRoutes = () => {
    const { match } = this.props;
    return Object.keys(this.screens).map((screen: string) => (
      <Route
        key={screen}
        path={`${match.path}/${screen}`}
        component={this.screens[screen]}
      />
    ));
  };

  public generateLinks = () => {
    const { match } = this.props;
    return Object.keys(this.screens).map((screen: string) => (
      <Link key={screen} to={`${match.path}/${screen}`} title={screen} />
    ));
  };

  public generateHome = () => {
    const { history } = this.props;
    return () => (
      <Screen onLeftPress={() => history.goBack()}>
        {this.generateLinks()}
      </Screen>
    );
  };

  public render() {
    return (
      <Switch>
        {this.generateRoutes()}
        <Route component={this.generateHome()} />
      </Switch>
    );
  }
}

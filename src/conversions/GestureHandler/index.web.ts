/* eslint-disable no-restricted-imports */
import {
  FlatList as GestureFlatList,
  ScrollView as GestureScrollView,
  Switch as GestureSwitch,
  TextInput as GestureTextInput,
  TouchableHighlight as GestureTouchableHighlight,
  TouchableNativeFeedback as GestureTouchableNativeFeedback,
  TouchableOpacity as GestureTouchableOpacity,
  TouchableWithoutFeedback as GestureTouchableWithoutFeedback,
  View as GestureHandlerProvider,
} from 'react-native';
/* eslint-enable no-restricted-imports */

type GestureNativeViewGestureHandlerProps = Record<string, unknown>;

export {
  GestureFlatList,
  GestureHandlerProvider,
  GestureScrollView,
  GestureSwitch,
  GestureTextInput,
  GestureTouchableHighlight,
  GestureTouchableNativeFeedback,
  GestureTouchableOpacity,
  GestureTouchableWithoutFeedback,
  type GestureNativeViewGestureHandlerProps,
};

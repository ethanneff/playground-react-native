/* eslint-disable no-restricted-imports */
type GestureNativeViewGestureHandlerProperties = Record<string, unknown>;

export { type GestureNativeViewGestureHandlerProperties as GestureNativeViewGestureHandlerProps };

export {
  FlatList as GestureFlatList,
  View as GestureHandlerProvider,
  ScrollView as GestureScrollView,
  Switch as GestureSwitch,
  TextInput as GestureTextInput,
  TouchableHighlight as GestureTouchableHighlight,
  TouchableNativeFeedback as GestureTouchableNativeFeedback,
  TouchableOpacity as GestureTouchableOpacity,
  Pressable as GestureTouchableWithoutFeedback,
} from 'react-native';
/* eslint-enable no-restricted-imports */

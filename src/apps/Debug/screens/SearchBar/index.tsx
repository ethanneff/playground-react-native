import React, {useState, memo, useEffect, useCallback} from 'react';
import {
  Animated,
  FlatList,
  Keyboard,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {Icon, Screen, Text, TextInput} from '../../../../components';
import {Config, Theme, colorWithOpacity} from '../../../../utils';
import {useNav, useColor, useNativeDriver} from '../../../../hooks';

const data = [
  {id: 1, name: '1'},
  {id: 2, name: '2'},
  {id: 3, name: '3'},
  {id: 4, name: '4'},
  {id: 5, name: '5'},
  {id: 6, name: '6'},
  {id: 7, name: '7'},
  {id: 8, name: '8'},
  {id: 9, name: '9'},
  {id: 10, name: '10'},
  {id: 11, name: '11'},
  {id: 12, name: '12'},
  {id: 13, name: '13'},
  {id: 14, name: '14'},
  {id: 15, name: '15'},
  {id: 16, name: '16'},
  {id: 17, name: '17'},
  {id: 18, name: '18'},
  {id: 19, name: '19'},
];

interface State {
  input: string;
  iconName: string;
  animation: Animated.Value;
}

const iconSearch = 'magnify';
const iconBack = 'arrow-left';
const textInputPlaceHolder = 'Search';
const animationDuration = 400;

export default memo(function DebugSearchbar() {
  const nav = useNav();
  const color = useColor();
  const [state, setState] = useState<State>({
    animation: new Animated.Value(0),
    iconName: iconSearch,
    input: '',
  });
  const useDriver = useNativeDriver();
  const translateIcon = state.animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, -60, 1],
  });
  const fadeContainer = state.animation.interpolate({
    inputRange: [0, 1],
    outputRange: [color.background, colorWithOpacity(color.secondary)],
  });
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      backgroundColor: color.light,
      height: Theme.padding.p20,
      justifyContent: 'center',
      padding: Theme.padding.p02,
    },
    item: {
      borderBottomColor: color.light,
      borderWidth: 0.2,
      padding: Theme.padding.p06,
    },
    textContainer: {
      alignItems: 'center',
      backgroundColor: color.background,
      flexDirection: 'row',
      height: '100%',
      padding: Theme.padding.p02,
    },
    textInput: {
      flex: 1,
      marginLeft: Theme.padding.p02,
    },
  });

  const animate = useCallback(
    (value: number) => {
      Animated.timing(state.animation, {
        duration: animationDuration,
        toValue: value,
        useNativeDriver: useDriver,
      }).start();
    },
    [state.animation, useDriver],
  );

  const changeIcon = useCallback(
    (iconName: string) => {
      const iconChangeTimeout = setTimeout(() => {
        clearTimeout(iconChangeTimeout);
        setState({...state, iconName});
      }, animationDuration / 2);
    },
    [state],
  );

  const onSearchBarFocus = useCallback(() => {
    animate(1);
    changeIcon(iconBack);
  }, [animate, changeIcon]);

  const onSearchBarUnFocus = useCallback(() => {
    animate(0);
    changeIcon(iconSearch);
  }, [animate, changeIcon]);

  const keyboardWillShow = useCallback(() => {
    if (Platform.OS !== Config.os.ios) {
      return;
    }
    onSearchBarFocus();
  }, [onSearchBarFocus]);

  const keyboardWillHide = useCallback(() => {
    if (Platform.OS !== Config.os.ios) {
      return;
    }
    onSearchBarUnFocus();
  }, [onSearchBarUnFocus]);

  const keyboardDidShow = useCallback(() => {
    if (Platform.OS !== Config.os.android) {
      return;
    }
    onSearchBarFocus();
  }, [onSearchBarFocus]);

  const keyboardDidHide = useCallback(() => {
    if (Platform.OS !== Config.os.android) {
      return;
    }
    onSearchBarUnFocus();
  }, [onSearchBarUnFocus]);

  useEffect(() => {
    if (process.env.JEST_WORKER_ID) {
      return undefined;
    }
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      keyboardWillShow,
    );
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      keyboardWillHide,
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, [keyboardDidHide, keyboardDidShow, keyboardWillHide, keyboardWillShow]);

  const renderItem = useCallback(
    ({item}) => <Text type="subtitle2" style={styles.item} title={item.name} />,
    [styles.item],
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <Screen onLeftPress={nav.to('debug')}>
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Animated.View
            style={{
              transform: [{translateX: translateIcon}],
            }}>
            <Icon name={state.iconName} />
          </Animated.View>
          <TextInput
            value={state.input}
            onChangeText={(value: string) => setState({...state, input: value})}
            placeholder={textInputPlaceHolder}
            containerStyle={styles.textInput}
          />
        </View>
      </View>
      <Animated.View style={{flex: 1, backgroundColor: fadeContainer}}>
        <FlatList
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
        />
      </Animated.View>
    </Screen>
  );
});

import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Animated, FlatList, StyleSheet, View } from 'react-native';
import { Icon, Input, Screen, Text } from '../../../components';
import {
  colorWithOpacity,
  padding,
  useColor,
  useDriver,
} from '../../../features';
import { useRootSelector } from '../../../redux';

const data = [
  { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
  { id: 4, name: '4' },
  { id: 5, name: '5' },
  { id: 6, name: '6' },
  { id: 7, name: '7' },
  { id: 8, name: '8' },
  { id: 9, name: '9' },
  { id: 10, name: '10' },
  { id: 11, name: '11' },
  { id: 12, name: '12' },
  { id: 13, name: '13' },
  { id: 14, name: '14' },
  { id: 15, name: '15' },
  { id: 16, name: '16' },
  { id: 17, name: '17' },
  { id: 18, name: '18' },
  { id: 19, name: '19' },
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

export const SearchBar = memo(function PlaygroundSearchbar() {
  const { goBack } = useNavigation();
  const color = useColor();
  const [state, setState] = useState<State>({
    animation: new Animated.Value(0),
    iconName: iconSearch,
    input: '',
  });
  const keyboardVisible = useRootSelector(s => s.device.keyboardVisible);
  const useNativeDriver = useDriver();
  const translateIcon = state.animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, -60, 1],
  });
  const fadeContainer = state.animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      color.background.primaryA,
      colorWithOpacity(color.background.secondary),
    ],
  });
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      backgroundColor: color.background.secondary,
      height: padding(20),
      justifyContent: 'center',
      padding: padding(2),
    },
    item: {
      borderBottomColor: color.background.secondary,
      borderWidth: 0.2,
      padding: padding(6),
    },
    textContainer: {
      alignItems: 'center',
      backgroundColor: color.background.primaryA,
      flexDirection: 'row',
      height: '100%',
      padding: padding(2),
    },
    textInput: {
      flex: 1,
      marginLeft: padding(2),
    },
  });

  const animate = useCallback(
    (value: number) => {
      Animated.timing(state.animation, {
        duration: animationDuration,
        toValue: value,
        useNativeDriver,
      }).start();
    },
    [state.animation, useNativeDriver],
  );

  const changeIcon = useCallback(
    (iconName: string) => {
      const iconChangeTimeout = setTimeout(() => {
        clearTimeout(iconChangeTimeout);
        setState({ ...state, iconName });
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

  useEffect(() => {
    if (!keyboardVisible) onSearchBarUnFocus();
    else onSearchBarFocus();
  });

  const renderItem = useCallback(
    ({ item }) => (
      <Text style={styles.item} title={item.name} type="subtitle2" />
    ),
    [styles.item],
  );

  const keyExtractor = useCallback(item => item.id.toString(), []);

  const onChangeText = useCallback(
    (value: string) => setState(prev => ({ ...prev, input: value })),
    [],
  );

  return (
    <Screen onLeftPress={goBack} title="Search Bar">
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Animated.View
            style={{
              transform: [{ translateX: translateIcon }],
            }}
          >
            <Icon name={state.iconName} />
          </Animated.View>
          <Input
            containerStyle={styles.textInput}
            onChangeText={onChangeText}
            placeholder={textInputPlaceHolder}
            removeError
            value={state.input}
          />
        </View>
      </View>
      <Animated.View style={{ flex: 1, backgroundColor: fadeContainer }}>
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps="handled"
          renderItem={renderItem}
        />
      </Animated.View>
    </Screen>
  );
});

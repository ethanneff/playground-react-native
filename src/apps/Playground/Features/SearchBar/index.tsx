import React, { useCallback, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import {
  FlashList,
  Icon,
  Input,
  Screen,
  Text,
  View,
  type FlashListRenderItem,
  type IconName,
} from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { colorWithOpacity, spacing, useColors } from '../../../../features';

type Data = {
  id: number;
  name: string;
};

const data: Data[] = [
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

type State = {
  animation: Animated.Value;
  iconName: IconName;
  input: string;
};

const iconSearch = 'magnify';
const textInputPlaceHolder = 'Search';

export const SearchBar = () => {
  const { goBack } = useNavigation();
  const colors = useColors();
  const [state, setState] = useState<State>({
    animation: new Animated.Value(0),
    iconName: iconSearch,
    input: '',
  });
  const translateIcon = state.animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, -60, 1],
  });
  const fadeContainer = state.animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      colors.background.primaryA,
      colorWithOpacity(colors.background.secondary),
    ],
  });
  const styles = StyleSheet.create({
    header: {
      backgroundColor: colors.background.secondary,
      height: spacing(20),
      justifyContent: 'center',
      padding: spacing(2),
    },
    item: {
      borderBottomColor: colors.background.secondary,
      borderWidth: 0.2,
      padding: spacing(6),
    },
    textContainer: {
      alignItems: 'center',
      backgroundColor: colors.background.primaryA,
      flexDirection: 'row',
      height: '100%',
      padding: spacing(2),
    },
    textInput: {
      flex: 1,
      marginLeft: spacing(2),
    },
  });

  const renderItem = useCallback<FlashListRenderItem<Data>>(
    ({ item }) => (
      <Text
        style={styles.item}
        title={item.name}
        type="subtitle2"
      />
    ),
    [styles.item],
  );

  const keyExtractor = useCallback((item: Data) => item.id.toString(), []);

  const onChangeText = useCallback((value: string) => {
    setState((previous) => ({ ...previous, input: value }));
  }, []);

  return (
    <Screen
      onLeftPress={goBack}
      title="Search Bar"
    >
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
            hideError
            onChangeText={onChangeText}
            placeholder={textInputPlaceHolder}
            value={state.input}
          />
        </View>
      </View>
      <Animated.View style={{ backgroundColor: fadeContainer, flex: 1 }}>
        <FlashList
          data={data}
          estimatedItemSize={65}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </Animated.View>
    </Screen>
  );
};

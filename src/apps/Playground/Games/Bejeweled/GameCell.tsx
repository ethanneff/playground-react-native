import React, { useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Pressable, Text, View } from '../../../../components';
import { spacing, useColors } from '../../../../features';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { getAbleToSwap, selectCell } from './redux';
import { type Vector } from './types';

export const GameCell = ({ x, y }: Vector) => {
  const colors = useColors();
  const dispatch = useAppDispatch();
  const cell = useAppSelector((state) => state.games.bejeweled.board[x][y]);
  const scale = useRef(new Animated.Value(1)).current;

  const selectedAnimation = Animated.loop(
    Animated.sequence([
      Animated.timing(scale, {
        duration: 200,
        toValue: 1.15,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        duration: 200,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]),
  );

  const handlePress = useCallback(() => {
    const ableToSwap = dispatch(getAbleToSwap({ x, y }));
    console.log(ableToSwap);

    // check if distance === 1 and previous selected
    // if so, animate swap
    // animate swap cells

    // check for matches
    // animate removal
    // add new gems
    // animate new gems
    // loop until no matches

    dispatch(selectCell({ x, y }));
    //
  }, [dispatch, x, y]);

  useEffect(() => {
    if (cell.selected) {
      selectedAnimation.start();
    } else {
      selectedAnimation.stop();
      Animated.timing(scale, {
        duration: 200,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [cell.selected, scale, selectedAnimation]);

  return (
    <Pressable onPressIn={handlePress}>
      <View
        borderColor={cell.selected ? colors.border.secondary : 'transparent'}
        borderRadius={spacing(2)}
        borderWidth={2}
        padding={2}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <Text
            center
            title={cell.gem}
            type="h6"
          />
        </Animated.View>
      </View>
    </Pressable>
  );
};

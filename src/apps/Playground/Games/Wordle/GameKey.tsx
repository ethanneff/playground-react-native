import React from 'react';
import { Pressable, Text, View } from '../../../../components';
import { spacing, useColors } from '../../../../features';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { wordleActions } from './redux';
import { type Key } from './types';
import { getBackgroundColor } from './utils';

type Properties = {
  readonly value: Key;
};

export const GameKey = ({ value }: Properties) => {
  const colors = useColors();
  const dispatch = useAppDispatch();
  const item = useAppSelector(
    (state) => state.games.wordle.keyboard.keys[value],
  );
  const backgroundColor = getBackgroundColor(item.type, colors);
  const color =
    backgroundColor === colors.background.primaryB ? 'primaryB' : 'primaryA';

  const handleKey = (key: string) => () => {
    switch (key) {
      case 'BACKSPACE': {
        dispatch(wordleActions.pressBackspace());
        return;
      }
      case 'ENTER': {
        dispatch(wordleActions.pressEnter());
        return;
      }
      default: {
        dispatch(wordleActions.pressKey(key));
      }
    }
  };

  return (
    <Pressable onPress={handleKey(item.value)}>
      <View
        alignItems="center"
        backgroundColor={backgroundColor}
        padding={spacing(1.5)}
        withDropShadow
      >
        <View
          absoluteFillObject={item.value !== 'ENTER'}
          alignItems="center"
          justifyContent="center"
        >
          {item.value === 'ENTER' ? (
            <Text
              color={color}
              title="ENTER"
            />
          ) : item.value === 'BACKSPACE' ? (
            <Text
              color={color}
              title="⌫"
            />
          ) : (
            <Text
              color={color}
              title={item.value}
            />
          )}
        </View>
        {item.value === 'ENTER' ? null : (
          <View opacity={0}>
            <Text
              color={color}
              title="⌫"
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};

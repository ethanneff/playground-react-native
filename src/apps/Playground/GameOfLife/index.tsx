import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Screen, Text} from '../../../components';
import {useColor} from '../../../hooks';
import {getSmallestDimension} from '../../../models';
import {config, useRootSelector} from '../../../utils';
import {Buttons} from './Buttons';
import {GameBoard} from './GameBoard';
import {Header} from './Header';
import {Board, determineBoardItem, generateBoard, swapBoardItem} from './utils';

export const GameOfLife = memo(function PlaygroundGameOfLife() {
  const color = useColor();
  const [form, setForm] = useState({
    run: false,
    delay: 16,
    count: 10,
  });
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState<Board>(generateBoard(form.count, 0.5));
  const runRef = useRef(form.run);
  const delayRef = useRef(form.delay);
  const timeoutRef = useRef<number | null>(null);
  const smallest = useRootSelector(getSmallestDimension);
  const size = smallest / form.count;
  const {goBack} = useNavigation();

  const onClear = useCallback(() => setBoard(generateBoard(form.count)), [
    form.count,
  ]);

  const onItemPress = useCallback(
    (x: number, y: number) => () => {
      setBoard(s =>
        s.map((rows, i) =>
          rows.map((item, j) => swapBoardItem(item, x, y, i, j)),
        ),
      );
    },
    [],
  );

  const onRandom = useCallback(() => setBoard(generateBoard(form.count, 0.5)), [
    form.count,
  ]);

  const loop = useCallback(() => {
    if (!runRef.current) return;

    setBoard(s =>
      s.map((rows, i) => rows.map((_, j) => determineBoardItem(s, i, j))),
    );

    timeoutRef.current = setTimeout(loop, delayRef.current);
  }, []);

  const onStart = useCallback(() => {
    setForm(s => ({...s, run: !s.run}));
    runRef.current = !runRef.current;
    loop();
  }, [loop]);

  const onCountSlide = useCallback((value: number) => {
    setForm(s => ({...s, count: value}));
    setBoard(generateBoard(value, 0.5));
  }, []);

  const onDelaySlide = useCallback((value: number) => {
    setForm(s => ({...s, delay: value}));
    delayRef.current = value;
  }, []);

  useEffect(() => {
    setLoading(false);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [timeoutRef]);
  const navBack = useCallback(() => goBack(), [goBack]);

  return (
    <Screen dropShadow onLeftPress={navBack} title="Game of life">
      <ScrollView
        style={{backgroundColor: color.surface, padding: config.padding(4)}}>
        {loading ? (
          <Text emphasis="medium" title="loading..." type="h5" />
        ) : (
          <View>
            <Header
              count={form.count}
              delay={form.delay}
              onCountSlide={onCountSlide}
              onDelaySlide={onDelaySlide}
            />
            <Buttons
              onClear={onClear}
              onRandom={onRandom}
              onStart={onStart}
              run={form.run}
            />
            <GameBoard board={board} onItemPress={onItemPress} size={size} />
          </View>
        )}
      </ScrollView>
    </Screen>
  );
});

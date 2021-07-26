import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen} from '../../../components';
import {useColor} from '../../../hooks';
import {ButtonRound} from './ButtonRound';
import {ButtonsRow} from './ButtonsRow';
import {LapsTable} from './LapsTable';
import {Timer} from './Timer';

interface State {
  laps: number[];
  now: number;
  start: number;
}

export const StopWatch = memo(function PlaygroundStopWatch() {
  const {goBack} = useNavigation();
  const [state, setState] = useState<State>({
    laps: [],
    now: 0,
    start: 0,
  });
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsed = state.now - state.start;
  const interval =
    state.laps.reduce((total, curr) => total + curr, 0) + elapsed;
  const color = useColor();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: color.background.primaryB,
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 130,
    },
    timer: {
      color: color.text.primaryB,
      fontFamily: 'Courier',
      fontSize: 54,
      fontWeight: '200',
    },
  });

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [timer]);

  const lap = useCallback(() => {
    const timestamp = new Date().getTime();
    const {laps, now, start} = state;
    const [firstLap, ...other] = laps;
    setState({
      laps: [0, firstLap + now - start, ...other],
      now: timestamp,
      start: timestamp,
    });
  }, [state]);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);

    const {laps, now, start} = state;
    const [firstLap, ...other] = laps;
    setState({laps: [firstLap + now - start, ...other], now: 0, start: 0});
  }, [timer, state]);

  const reset = useCallback(() => {
    setState({laps: [], now: 0, start: 0});
  }, []);

  const run = useCallback(() => {
    timer.current = setInterval(() => {
      setState(prev => ({...prev, now: new Date().getTime()}));
    }, 100);
  }, []);

  const start = useCallback(() => {
    const now = new Date().getTime();
    setState({laps: [0], now, start: now});
    run();
  }, [run]);

  const resume = useCallback(() => {
    const now = new Date().getTime();
    setState(prev => ({
      ...prev,
      now,
      start: now,
    }));
    run();
  }, [run]);

  return (
    <Screen onLeftPress={goBack} title="Stop Watch">
      <View style={styles.container}>
        <Timer interval={interval} style={styles.timer} />
        {state.laps.length === 0 && (
          <ButtonsRow>
            <ButtonRound
              background={color.background.disabled}
              color="disabled"
              disabled
              onPress={lap}
              title="Lap"
            />
            <ButtonRound
              background={color.background.positive}
              color="primaryA"
              onPress={start}
              title="Start"
            />
          </ButtonsRow>
        )}
        {state.start > 0 && (
          <ButtonsRow>
            <ButtonRound
              background={color.background.disabled}
              color="primaryA"
              onPress={lap}
              title="Lap"
            />
            <ButtonRound
              background={color.background.negative}
              color="primaryA"
              onPress={stop}
              title="Stop"
            />
          </ButtonsRow>
        )}
        {state.laps.length > 0 && state.start === 0 && (
          <ButtonsRow>
            <ButtonRound
              background={color.background.negative}
              color="primaryA"
              onPress={reset}
              title="Reset"
            />
            <ButtonRound
              background={color.background.positive}
              color="primaryA"
              onPress={resume}
              title="Start"
            />
          </ButtonsRow>
        )}
        <LapsTable laps={state.laps} timer={elapsed} />
      </View>
    </Screen>
  );
});

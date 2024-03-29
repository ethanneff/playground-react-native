import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Screen, View } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { useColors } from '../../../../features';
import { ButtonRound } from './ButtonRound';
import { ButtonsRow } from './ButtonsRow';
import { LapsTable } from './LapsTable';
import { Timer } from './Timer';

type State = {
  laps: number[];
  now: number;
  start: number;
};

export const AppleStopwatch = () => {
  const { goBack } = useNavigation();
  const [state, setState] = useState<State>({
    laps: [],
    now: 0,
    start: 0,
  });
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsed = state.now - state.start;
  const interval =
    state.laps.reduce((total, current) => total + current, 0) + elapsed;
  const colors = useColors();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.background.primaryB,
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 130,
    },
    timer: {
      color: colors.text.primaryB,
      fontFamily: 'Courier',
      fontSize: 54,
      fontWeight: '200',
    },
  });

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [timer],
  );

  const lap = useCallback(() => {
    const timestamp = Date.now();
    const { laps, now, start } = state;
    const [firstLap, ...other] = laps;
    setState({
      laps: [0, firstLap + now - start, ...other],
      now: timestamp,
      start: timestamp,
    });
  }, [state]);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);

    const { laps, now, start } = state;
    const [firstLap, ...other] = laps;
    setState({ laps: [firstLap + now - start, ...other], now: 0, start: 0 });
  }, [timer, state]);

  const reset = useCallback(() => {
    setState({ laps: [], now: 0, start: 0 });
  }, []);

  const run = useCallback(() => {
    timer.current = setInterval(() => {
      setState((previous) => ({ ...previous, now: Date.now() }));
    }, 100);
  }, []);

  const start = useCallback(() => {
    const now = Date.now();
    setState({ laps: [0], now, start: now });
    run();
  }, [run]);

  const resume = useCallback(() => {
    const now = Date.now();
    setState((previous) => ({
      ...previous,
      now,
      start: now,
    }));
    run();
  }, [run]);

  return (
    <Screen
      onLeftPress={goBack}
      title="Stop Watch"
    >
      <View style={styles.container}>
        <Timer
          interval={interval}
          style={styles.timer}
        />
        {state.laps.length === 0 && (
          <ButtonsRow>
            <ButtonRound
              background={colors.background.disabled}
              color="disabled"
              disabled
              onPress={lap}
              title="Lap"
            />
            <ButtonRound
              background={colors.background.positive}
              color="primaryA"
              onPress={start}
              title="Start"
            />
          </ButtonsRow>
        )}
        {state.start > 0 && (
          <ButtonsRow>
            <ButtonRound
              background={colors.background.disabled}
              color="primaryA"
              onPress={lap}
              title="Lap"
            />
            <ButtonRound
              background={colors.background.negative}
              color="primaryA"
              onPress={stop}
              title="Stop"
            />
          </ButtonsRow>
        )}
        {state.laps.length > 0 && state.start === 0 ? (
          <ButtonsRow>
            <ButtonRound
              background={colors.background.negative}
              color="primaryA"
              onPress={reset}
              title="Reset"
            />
            <ButtonRound
              background={colors.background.positive}
              color="primaryA"
              onPress={resume}
              title="Start"
            />
          </ButtonsRow>
        ) : null}
        <LapsTable
          laps={state.laps}
          timer={elapsed}
        />
      </View>
    </Screen>
  );
};

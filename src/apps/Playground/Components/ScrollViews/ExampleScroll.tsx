import React, { useCallback, useEffect, useRef, useState } from 'react';
import { type LayoutRectangle } from 'react-native';
import {
  ScrollButton,
  ScrollView,
  View,
  VisibilitySensor,
  type ScrollViewRef,
  type VisibilitySensorChange,
} from '../../../../components';
import { spacing, useColors } from '../../../../features';

type Props = {
  horizontal?: boolean;
};

const getSize = (size: number, horizontal?: boolean) => {
  return horizontal ? { width: size } : { height: size };
};

export const ExampleScroll = ({ horizontal }: Props) => {
  const [visibility, setVisibility] = useState<VisibilitySensorChange | null>(
    null,
  );
  const [container, setContainer] = useState<LayoutRectangle | null>(null);
  const scrollViewRef = useRef<ScrollViewRef>(null);
  const colors = useColors();

  const handleChange = useCallback(
    (props: VisibilitySensorChange) => {
      setVisibility(props);
    },
    [setVisibility],
  );

  useEffect(() => {
    if (!scrollViewRef.current) return;

    // @ts-expect-error measure does not exist on ScrollView
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    scrollViewRef.current.measure(
      (
        _x: number,
        _y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number,
        // eslint-disable-next-line max-params
      ) => {
        setContainer({ height, width, x: pageX, y: pageY });
      },
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing(2),
          paddingVertical: spacing(4),
        }}
        horizontal={horizontal}
        onRef={scrollViewRef}
        style={{
          backgroundColor: colors.background.secondary,
          flex: 1,
        }}
      >
        <View
          style={{
            ...getSize(200, horizontal),
            backgroundColor: colors.background.tertiary,
          }}
        />
        <View
          style={{
            ...getSize(400, horizontal),
            backgroundColor: colors.background.primaryA,
          }}
        />
        <View
          style={{
            ...getSize(100, horizontal),
            backgroundColor: colors.background.tertiary,
          }}
        />
        <View
          style={{
            ...getSize(300, horizontal),
            backgroundColor: colors.background.primaryA,
          }}
        />
        <View
          style={{
            ...getSize(200, horizontal),
            backgroundColor: colors.background.tertiary,
          }}
        />
        <View
          style={{
            ...getSize(200, horizontal),
            backgroundColor: colors.background.primaryA,
          }}
        />
        <View
          style={{
            ...getSize(400, horizontal),
            backgroundColor: colors.background.tertiary,
          }}
        />

        <View
          style={{
            ...getSize(300, horizontal),
            backgroundColor: colors.background.tertiary,
          }}
        />
        <View
          style={{
            ...getSize(200, horizontal),
            backgroundColor: colors.background.primaryA,
          }}
        />
        <View
          style={{
            ...getSize(200, horizontal),
            backgroundColor: colors.background.tertiary,
          }}
        />
        <VisibilitySensor
          container={container}
          onChange={handleChange}
          style={{ backgroundColor: colors.background.positive }}
        >
          <View style={{ ...getSize(100, horizontal) }} />
        </VisibilitySensor>
        <View
          style={{
            ...getSize(400, horizontal),
            backgroundColor: colors.background.primaryA,
          }}
        />
        <View
          style={{
            ...getSize(100, horizontal),
            backgroundColor: colors.background.tertiary,
          }}
        />
        <View
          style={{
            ...getSize(300, horizontal),
            backgroundColor: colors.background.primaryA,
          }}
        />
        <View
          style={{
            ...getSize(200, horizontal),
            backgroundColor: colors.background.tertiary,
          }}
        />
        <View
          style={{
            ...getSize(200, horizontal),
            backgroundColor: colors.background.primaryA,
          }}
        />
        <View
          style={{
            ...getSize(400, horizontal),
            backgroundColor: colors.background.tertiary,
          }}
        />
        <View
          style={{
            ...getSize(100, horizontal),
            backgroundColor: colors.background.primaryA,
          }}
        />
        <View
          style={{
            ...getSize(300, horizontal),
            backgroundColor: colors.background.tertiary,
          }}
        />
        <View
          style={{
            ...getSize(200, horizontal),
            backgroundColor: colors.background.primaryA,
          }}
        />
      </ScrollView>
      <ScrollButton
        backgroundColor="accent"
        position={horizontal ? 'left' : 'top'}
        title="scroll to item"
        visible={
          !visibility?.visible &&
          (visibility?.direction === 'top' || visibility?.direction === 'left')
        }
      />
      <ScrollButton
        backgroundColor="accent"
        position={horizontal ? 'right' : 'bottom'}
        title="scroll to item"
        visible={
          !visibility?.visible &&
          (visibility?.direction === 'bottom' ||
            visibility?.direction === 'right')
        }
      />
    </View>
  );
};

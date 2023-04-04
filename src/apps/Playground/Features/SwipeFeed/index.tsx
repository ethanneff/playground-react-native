import dayjs, { type Dayjs } from 'dayjs';
import React, { memo, useCallback, useRef, useState } from 'react';
import {
  Animated,
  Image,
  PanResponder,
  type ImageSourcePropType,
  type LayoutChangeEvent,
} from 'react-native';
import { v4 } from 'uuid';
import {
  Button,
  Card,
  Icon,
  Screen,
  ScrollView,
  Spacing,
  Text,
  View,
  type IconName,
} from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { spacing, useColors, useDriver } from '../../../../features';
import { getWidth, useRootSelector } from '../../../../redux';
import { formatRelativeDate } from './utils';

type SwipeItem = {
  body: string;
  button: string;
  date: Dayjs;
  icon: IconName;
  id: string;
  image: ImageSourcePropType | null;
  onPress: () => void;
  title: string;
};
type SwipeCardProps = {
  height: number;
  index: number;
  item: SwipeItem;
  onSwipe: (value: boolean) => void;
  onSwipeComplete: () => void;
  onSwipePercentChange: (percent: number) => void;
};

const SwipeCard = memo(function SwipeCard({
  height,
  item,
  onSwipe,
  onSwipeComplete,
  onSwipePercentChange,
}: SwipeCardProps) {
  const { body, button, date, icon, image, title } = item;
  const cardWidth = useRef(0);
  const colors = useColors();

  const useNativeDriver = useDriver();
  const width = useRootSelector(getWidth);
  const imageHeight = height / 1.5;
  const swipeThreshold = width / 3;
  const touchThreshold = 50;
  const position = new Animated.ValueXY();

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      cardWidth.current = event.nativeEvent.layout.width;
    },
    [cardWidth],
  );

  const setCardWidth = useCallback(
    (dx: number) => {
      onSwipePercentChange(1 - dx / cardWidth.current);
    },
    [cardWidth, onSwipePercentChange],
  );

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > touchThreshold ||
        Math.abs(gesture.dy) > touchThreshold,
      onPanResponderMove: (_, gesture) => {
        setCardWidth(gesture.dx);
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        const x =
          gesture.dx > swipeThreshold
            ? width
            : gesture.dx < -swipeThreshold
            ? -width
            : 0;
        Animated.spring(position, {
          toValue: { x, y: 0 },
          useNativeDriver,
        }).start();
        onSwipe(false);
      },
      onPanResponderStart: () => {
        onSwipe(true);
      },
      onStartShouldSetPanResponder: () => true,
    }),
  ).current;

  return (
    <Animated.View
      onLayout={onLayout}
      {...panResponder.panHandlers} // eslint-disable-line react/jsx-props-no-spreading
      style={{
        backgroundColor: colors.background.primaryA,
        borderColor: colors.border.secondary,
        borderRadius: spacing(1),
        borderWidth: 1,
        height,
        left: position.x,
        overflow: 'hidden',
        position: 'absolute',
        width: '100%',
      }}
    >
      <View
        flex={1}
        flexShrink={1}
      >
        <View flexDirection="row">
          {image ? (
            <Image
              source={image}
              style={{
                alignSelf: 'center',
                height: imageHeight,
                width: imageHeight,
              }}
            />
          ) : null}
          <View
            flexShrink={1}
            style={{ padding: spacing(2) }}
          >
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Icon
                name={icon}
                size={15}
              />
              <Text
                bold
                style={{ paddingHorizontal: spacing(1) }}
                title={title}
                type="overline"
              />
              <Text title={formatRelativeDate(date)} />
            </View>
            <Spacing padding={spacing(2)} />
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              title={body}
            />
            <Spacing padding={spacing(2)} />
            <Button
              color="positive"
              noPadding
              onPress={onSwipeComplete}
              title={button.toUpperCase()}
            />
          </View>
        </View>
      </View>
    </Animated.View>
  );
});

const initialItems: SwipeItem[] = [
  {
    body: 'BABA is down 4.41% to $204.433.',
    button: 'View BABA',
    date: dayjs().subtract(5, 'minute'),
    icon: 'arrow-bottom-right',
    id: v4(),
    image: null,
    onPress: () => undefined,
    title: 'Price Movement',
  },
  {
    body: 'Disney heiress Abigail Disney and other superrich American demand the 1% pay higher taxes than other Americans.',
    button: 'View Article',
    date: dayjs().subtract(11, 'hour'),
    icon: 'file-document-edit-outline',
    id: v4(),
    image: null,
    onPress: () => undefined,
    title: 'Marketwatch',
  },
  {
    body: "Amazon files motion to halt Microsoft's work on Pentagon's JEDI contract",
    button: 'View Article',
    date: dayjs().subtract(1, 'day'),
    icon: 'book',
    id: v4(),
    image: null,
    onPress: () => undefined,
    title: 'Reuters',
  },
  {
    body: "You're invited! Start trading Bitcoin & Ethereum",
    button: 'Get Started',
    date: dayjs(),
    icon: 'star-outline',
    id: v4(),
    image: require('./placeholder.png') as ImageSourcePropType,
    onPress: () => undefined,
    title: 'Congratulations',
  },
  {
    body: "Invite your friends! When they sign up, you'll both get a free stock",
    button: 'Invite friends',
    date: dayjs(),
    icon: 'star-outline',
    id: v4(),
    image: require('./placeholder.png') as ImageSourcePropType,
    onPress: () => undefined,
    title: 'Enjoying robinhood?',
  },
  {
    body: 'Swipe through cards to see your personalized notifications and news stories.',
    button: 'Swipe to dismiss',
    date: dayjs(),
    icon: 'lightbulb-outline',
    id: v4(),
    image: null,
    onPress: () => undefined,
    title: 'Introducing cards',
  },
];

type BadgeProps = {
  count: number;
  percent: number;
};

const Badge = memo(function Badge({ count, percent }: BadgeProps) {
  const size = spacing(6);
  const badgeSize = size * percent;
  const colors = useColors();
  return (
    <View
      style={{
        alignItems: 'center',
        height: size,
        justifyContent: 'center',
        margin: spacing(1),
        position: 'absolute',
        right: 0,
        width: size,
        zIndex: count * 10,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          backgroundColor: colors.background.negative,
          borderRadius: size,
          height: badgeSize,
          justifyContent: 'center',
          width: badgeSize,
        }}
      >
        <Text
          adjustsFontSizeToFit
          color="primaryB"
          title={`${count}`}
        />
      </View>
    </View>
  );
});

type SwipeCardsProps = {
  height?: number;
  items: SwipeItem[];
  onSwipe: (value: boolean) => void;
};

const SwipeCards = memo(function SwipeCardList({
  height = 125,
  items,
  onSwipe,
}: SwipeCardsProps) {
  const [feed, setFeed] = useState({
    items,
    percent: 1,
  });

  const onSwipeComplete = useCallback(() => {
    setFeed((state) => ({
      ...state,
      items: state.items.filter((_, i) => i !== state.items.length - 1),
      percent: 1,
    }));
  }, []);

  const onSwipePercentChange = useCallback((percent: number) => {
    setFeed((state) => ({
      ...state,
      percent,
    }));
  }, []);

  return feed.items.length ? (
    <View style={{ height }}>
      {feed.items.map((item, index) => (
        <SwipeCard
          height={height}
          index={index}
          item={item}
          key={item.id}
          onSwipe={onSwipe}
          onSwipeComplete={onSwipeComplete}
          onSwipePercentChange={onSwipePercentChange}
        />
      ))}
      <Badge
        count={feed.items.length}
        percent={feed.percent}
      />
    </View>
  ) : null;
});

const placeholder = require('./placeholder.png') as ImageSourcePropType;

const ImagePlaceholder = memo(function ImagePlaceholder() {
  return (
    <Card>
      <Image
        source={placeholder}
        style={{ borderRadius: 4, height: 100, width: '100%' }}
      />
    </Card>
  );
});

export const SwipeFeed = memo(function SwipeFeed() {
  const { goBack } = useNavigation();
  const colors = useColors();
  const [swiping, setSwiping] = useState(false);

  const onSwipe = useCallback((value: boolean) => {
    setSwiping(value);
  }, []);

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Swipe Feed"
    >
      <ScrollView
        contentContainerStyle={{
          gap: spacing(4),
          padding: spacing(4),
        }}
        scrollEnabled={!swiping}
        style={{
          backgroundColor: colors.background.secondary,
        }}
      >
        <ImagePlaceholder />
        <ImagePlaceholder />
        <SwipeCards
          items={initialItems}
          onSwipe={onSwipe}
        />
        <ImagePlaceholder />
        <ImagePlaceholder />
        <ImagePlaceholder />
        <ImagePlaceholder />
        <ImagePlaceholder />
        <ImagePlaceholder />
      </ScrollView>
    </Screen>
  );
});

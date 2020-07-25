import React, {memo, useCallback, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  PanResponder,
  View,
} from 'react-native';
import dayjs, {Dayjs} from 'dayjs';
import {v4} from 'uuid';
import {Card, Icon, Screen, Text, TouchableOpacity} from '../../../components';
import {useColor, useDropShadow, useNativeDriver, useNav} from '../../../hooks';
import {getWidth} from '../../../models';
import {Theme, useRootSelector} from '../../../utils';
import 'react-native-get-random-values';

interface SwipeCard extends SwipeItem {
  index: number;
  height: number;
  onSwipeComplete(): void;
  onSwipePercentChange(percent: number): void;
}

export const formatRelativeDate = (date: Dayjs) => {
  const now = dayjs();
  const years = now.diff(date, 'year');
  const weeks = now.diff(date, 'week');
  const days = now.diff(date, 'day');
  const hours = now.diff(date, 'hour');
  const minutes = now.diff(date, 'minute');
  return years
    ? `${years}y`
    : weeks
    ? `${weeks}w`
    : days
    ? `${days}d`
    : hours
    ? `${hours}h`
    : minutes
    ? `${minutes}m`
    : '';
};

const SwipeCard = memo(function SwipeCard({
  image,
  height,
  icon,
  title,
  date,
  body,
  button,
  onSwipeComplete,
  onSwipePercentChange,
}: SwipeCard) {
  const cardWidth = useRef(0);
  const color = useColor();
  const useDriver = useNativeDriver();
  const width = useRootSelector(getWidth);
  const dropShadow = useDropShadow();
  const imageHeight = height / 1.5;
  const swipeThreshold = width / 3;
  const touchThreshold = 50;
  const position = new Animated.ValueXY();

  const onLayout = useCallback(
    (event) => {
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

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gesture) =>
      Math.abs(gesture.dx) > touchThreshold ||
      Math.abs(gesture.dy) > touchThreshold,
    onPanResponderMove: (_, gesture) => {
      setCardWidth(gesture.dx);
      position.setValue({x: gesture.dx, y: gesture.dy});
    },
    onPanResponderRelease: (_, gesture) => {
      const x =
        gesture.dx > swipeThreshold
          ? width
          : gesture.dx < -swipeThreshold
          ? -width
          : 0;
      Animated.spring(position, {
        toValue: {x, y: 0},
        useNativeDriver: useDriver,
      }).start();
    },
  });

  return (
    <Animated.View
      onLayout={onLayout}
      {...panResponder.panHandlers}
      style={{
        position: 'absolute',
        width: '100%',
        left: position.x,
        height: height,
        backgroundColor: color.background,
        borderRadius: Theme.padding.p01,
        borderColor: color.brand,
        ...dropShadow(4),
      }}>
      <TouchableOpacity onPress={onSwipeComplete} style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {image && (
            <Image
              source={image}
              style={{
                height: imageHeight,
                width: imageHeight,
                alignSelf: 'center',
              }}
            />
          )}
          <View style={{flex: 1, padding: Theme.padding.p02}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon name={icon} size={15} />
              <Text
                bold
                style={{paddingHorizontal: Theme.padding.p01}}
                title={title}
                type="overline"
              />
              <Text title={formatRelativeDate(date)} />
            </View>
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={{flex: 1, paddingTop: Theme.padding.p02}}
              title={body}
            />
            <Text style={{color: color.primary}} title={button.toUpperCase()} />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

interface SwipeItem {
  id: string;
  image: ImageSourcePropType | null;
  title: string;
  icon: string;
  date: Dayjs;
  body: string;
  button: string;
  onPress(): void;
}

const initialItems: SwipeItem[] = [
  {
    id: v4(),
    image: null,
    title: 'Price Movement',
    icon: 'arrow-bottom-right',
    date: dayjs().subtract(5, 'minute'),
    body: 'BABA is down 4.41% to $204.433.',
    button: 'View BABA',
    onPress: () => undefined,
  },
  {
    id: v4(),
    image: null,
    title: 'Marketwatch',
    icon: 'file-document-box-outline',
    date: dayjs().subtract(11, 'hour'),
    body:
      'Disney heiress Abigail Disney and other superrich American demand the 1% pay higher taxes than other Americans.',
    button: 'View Article',
    onPress: () => undefined,
  },
  {
    id: v4(),
    image: null,
    title: 'Reuters',
    icon: 'book',
    date: dayjs().subtract(1, 'day'),
    body:
      "Amazon files motion to halt Microsoft's work on Pentagon's JEDI contract",
    button: 'View Article',
    onPress: () => undefined,
  },
  {
    id: v4(),
    image: require('./placeholder.png'),
    title: 'Congratulations',
    icon: 'star-outline',
    date: dayjs(),
    body: "You're invited! Start trading Bitcoin & Ethereum",
    button: 'Get Started',
    onPress: () => undefined,
  },
  {
    id: v4(),
    image: require('./placeholder.png'),
    title: 'Enjoying robinhood?',
    icon: 'star-outline',
    date: dayjs(),
    body:
      "Invite your friends! When they sign up, you'll both get a free stock",
    button: 'Invite friends',
    onPress: () => undefined,
  },
  {
    id: v4(),
    image: null,
    title: 'Introducing cards',
    icon: 'lightbulb-outline',
    date: dayjs(),
    body:
      'Swipe through cards to see your personalized notifications and news stories.',
    button: 'Swipe to dismiss',
    onPress: () => undefined, // complete
  },
];

interface BadgeProps {
  count: number;
  percent: number;
}

const Badge = memo(function Badge({count, percent}: BadgeProps) {
  const size = Theme.padding.p06;
  const badgeSize = size * percent;
  const color = useColor();
  return (
    <View
      style={{
        position: 'absolute',
        right: 0,
        width: size,
        height: size,
        margin: Theme.padding.p01,
        zIndex: count * 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: badgeSize,
          height: badgeSize,
          borderRadius: size,
          backgroundColor: color.danger,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          adjustsFontSizeToFit
          style={{color: color.background}}
          title={`${count}`}
        />
      </View>
    </View>
  );
});

interface SwipeCardsProps {
  height?: number;
  items: SwipeItem[];
}

const SwipeCards = memo(function SwipeCardList({
  height = 100,
  items,
}: SwipeCardsProps) {
  const [feed, setFeed] = useState({
    items,
    percent: 1,
  });

  const onSwipeComplete = useCallback(() => {
    setFeed((state) => ({
      ...state,
      percent: 1,
      items: state.items.filter((_, i) => i !== state.items.length - 1),
    }));
  }, []);

  const onSwipePercentChange = useCallback((percent: number) => {
    setFeed((state) => ({
      ...state,
      percent,
    }));
  }, []);

  return !feed.items.length ? null : (
    <View style={{height}}>
      {feed.items.map((item, index) => (
        <SwipeCard
          {...item}
          height={height}
          index={index}
          key={item.id}
          onSwipeComplete={onSwipeComplete}
          onSwipePercentChange={onSwipePercentChange}
        />
      ))}
      <Badge count={feed.items.length} percent={feed.percent} />
    </View>
  );
});

const ImagePlaceholder = memo(function ImagePlaceholder() {
  return (
    <Card noPadding>
      <Image
        source={require('./placeholder.png')}
        style={{width: '100%', height: 100, borderRadius: 4}}
      />
    </Card>
  );
});

export default memo(function SwipeFeed() {
  const nav = useNav();
  const navBack = useCallback(nav('playground'), [nav]);
  return (
    <Screen onLeftPress={navBack} title="Swipe Feed">
      <View style={{padding: Theme.padding.p04}}>
        <ImagePlaceholder />
        <ImagePlaceholder />
        <SwipeCards items={initialItems} />
        <ImagePlaceholder />
        <ImagePlaceholder />
        <ImagePlaceholder />
        <ImagePlaceholder />
        <ImagePlaceholder />
        <ImagePlaceholder />
      </View>
    </Screen>
  );
});

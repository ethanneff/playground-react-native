import React, { memo, useState, useCallback, useRef } from "react";
import {
  View,
  Image,
  ImageSourcePropType,
  PanResponder,
  Animated,
  TouchableOpacity
} from "react-native";
import {
  Screen,
  Text,
  Icon,
  Card,
  EllipsizeMode
} from "../../../../components";
import { useColor, useNav, useDropShadow } from "../../../../hooks";
import { Theme, useRootSelector } from "../../../../utils";
import dayjs, { Dayjs } from "dayjs";
import "react-native-get-random-values";
import { v4 } from "uuid";
import { getWidth } from "../../../../models";

interface SwipeCard extends SwipeItem {
  index: number;
  height: number;
  onSwipeComplete(): void;
  onSwipePercentChange(percent: number): void;
}

export const formatRelativeDate = (date: Dayjs) => {
  const now = dayjs();
  const years = now.diff(date, "year");
  const weeks = now.diff(date, "week");
  const days = now.diff(date, "day");
  const hours = now.diff(date, "hour");
  const minutes = now.diff(date, "minute");
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
    : "";
};

const SwipeCard = memo(function SwipeCard(props: SwipeCard) {
  const cardWidth = useRef(0);
  const color = useColor();
  const width = useRootSelector(getWidth);
  const dropShadow = useDropShadow(4);
  const imageHeight = props.height / 1.5;
  const swipeThreshold = width / 3;
  const touchThreshold = 50;
  const position = new Animated.ValueXY();

  const onLayout = useCallback(
    event => {
      cardWidth.current = event.nativeEvent.layout.width;
    },
    [cardWidth]
  );

  const setCardWidth = useCallback(
    (dx: number) => {
      props.onSwipePercentChange(1 - dx / cardWidth.current);
    },
    [cardWidth, props]
  );

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
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
        toValue: { x, y: 0 }
      }).start();
    }
  });

  return (
    <Animated.View
      onLayout={onLayout}
      {...panResponder.panHandlers}
      style={{
        position: "absolute",
        width: "100%",
        left: position.x,
        zIndex: props.index,
        height: props.height,
        backgroundColor: color.background,
        ...dropShadow,
        borderRadius: Theme.padding.p01,
        borderColor: color.brand
      }}
    >
      <TouchableOpacity style={{ flex: 1 }} onPress={props.onSwipeComplete}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {props.image && 
            <Image
              source={props.image}
              style={{
                height: imageHeight,
                width: imageHeight,
                alignSelf: "center"
              }}
            />
          }
          <View style={{ flex: 1, padding: Theme.padding.p02 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Icon name={props.icon} size={15} />
              <Text
                title={props.title}
                overline
                bold
                style={{ paddingHorizontal: Theme.padding.p01 }}
              />
              <Text title={formatRelativeDate(props.date)} />
            </View>
            <Text
              style={{ flex: 1, paddingTop: Theme.padding.p02 }}
              title={props.body}
              numberOfLines={2}
              ellipsizeMode={EllipsizeMode.Tail}
            />
            <Text
              title={props.button.toUpperCase()}
              style={{ color: color.primary }}
            />
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
    title: "Price Movement",
    icon: "arrow-bottom-right",
    date: dayjs().subtract(5, "minute"),
    body: "BABA is down 4.41% to $204.433.",
    button: "View BABA",
    onPress: () => undefined
  },
  {
    id: v4(),
    image: null,
    title: "Marketwatch",
    icon: "file-document-box-outline",
    date: dayjs().subtract(11, "hour"),
    body:
      "Disney heiress Abigail Disney and other superrich American demand the 1% pay higher taxes than other Americans.",
    button: "View Article",
    onPress: () => undefined
  },
  {
    id: v4(),
    image: null,
    title: "Reuters",
    icon: "book",
    date: dayjs().subtract(1, "day"),
    body:
      "Amazon files motion to halt Microsoft's work on Pentagon's JEDI contract",
    button: "View Article",
    onPress: () => undefined
  },
  {
    id: v4(),
    image: require("./placeholder.png"),
    title: "Congratulations",
    icon: "star-outline",
    date: dayjs(),
    body: "You're invited! Start trading Bitcoin & Ethereum",
    button: "Get Started",
    onPress: () => undefined
  },
  {
    id: v4(),
    image: require("./placeholder.png"),
    title: "Enjoying robinhood?",
    icon: "star-outline",
    date: dayjs(),
    body:
      "Invite your friends! When they sign up, you'll both get a free stock",
    button: "Invite friends",
    onPress: () => undefined
  },
  {
    id: v4(),
    image: null,
    title: "Introducing cards",
    icon: "lightbulb-outline",
    date: dayjs(),
    body:
      "Swipe through cards to see your personalized notifications and news stories.",
    button: "Swipe to dismiss",
    onPress: () => undefined // complete
  }
];

interface BadgeProps {
  count: number;
  percent: number;
}

const Badge = memo((props: BadgeProps) => {
  const size = Theme.padding.p06;
  const badgeSize = size * props.percent;
  const color = useColor();
  return (
    <View
      style={{
        position: "absolute",
        right: 0,
        width: size,
        height: size,
        margin: Theme.padding.p01,
        zIndex: props.count * 10,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <View
        style={{
          width: badgeSize,
          height: badgeSize,
          borderRadius: size,
          backgroundColor: color.danger,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text
          title={`${props.count}`}
          style={{ color: color.background }}
          adjustsFontSizeToFit
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
  items
}: SwipeCardsProps) {
  const [feed, setFeed] = useState({
    items,
    percent: 1
  });

  const onSwipeComplete = useCallback(() => {
    setFeed(state => ({
      ...state,
      percent: 1,
      items: state.items.filter((_, i) => i !== state.items.length - 1)
    }));
  }, []);

  const onSwipePercentChange = useCallback((percent: number) => {
    setFeed(state => ({
      ...state,
      percent
    }));
  }, []);

  return !feed.items.length ? null : 
    <View style={{ height }}>
      {feed.items.map((item, index) => 
        <SwipeCard
          {...item}
          height={height}
          key={item.id}
          index={index}
          onSwipeComplete={onSwipeComplete}
          onSwipePercentChange={onSwipePercentChange}
        />
      )}
      <Badge count={feed.items.length} percent={feed.percent} />
    </View>
  ;
});

const ImagePlaceholder = memo(function ImagePlaceholder() {
  return (
    <Card noPadding>
      <Image
        source={require("./placeholder.png")}
        style={{ width: "100%", height: 100, borderRadius: 4 }}
      />
    </Card>
  );
});

export default memo(function SwipeFeed() {
  const nav = useNav();
  return (
    <Screen onLeftPress={nav.to("debug")}>
      <View style={{ padding: Theme.padding.p04 }}>
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

import React, { memo, useState } from "react";
import {
  View,
  Image,
  ImageSourcePropType,
  // TouchableOpacity,
  ScrollView,
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
import uuid from "uuid";
import relativeTime from "dayjs/plugin/relativeTime";
import { getWidth } from "../../../../models";
dayjs.extend(relativeTime);

interface SwipeCard extends SwipeItem {
  index: number;
  height: number;
  onSwipeComplete(): void;
}

export const formatRelativeDate = (date: Dayjs) => {
  const relative = date.fromNow(true);
  let formatted = "";
  let spaceCount = 0;
  for (let i = 0; i < relative.length; i++) {
    const ch = relative[i];
    if (ch === "n") {
      continue;
    } else if (ch === "a") {
      formatted += "1";
    } else if (spaceCount === 0 && ch !== " ") {
      formatted += ch;
    } else if (ch === " ") {
      spaceCount++;
    } else if (ch === "f") {
      return "";
    } else if (ch !== " ") {
      formatted += ch;
      if (ch === "m" && relative[i + 1] === "i") {
        return "";
      }
      if (spaceCount > 0) {
        break;
      }
    }
  }
  return formatted;
};

const SwipeCard = memo(function SwipeCard(props: SwipeCard) {
  const color = useColor();
  const width = useRootSelector(getWidth);
  const dropShadow = useDropShadow(4);
  const imageHeight = props.height / 1.5;
  const swipeThreshold = width / 3;
  const touchThreshold = 50;
  const position = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gesture) =>
      Math.abs(gesture.dx) > touchThreshold ||
      Math.abs(gesture.dy) > touchThreshold,
    onPanResponderMove: (_, gesture) => {
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
          {props.image && (
            <Image
              source={props.image}
              style={{
                height: imageHeight,
                width: imageHeight,
                alignSelf: "center"
              }}
            />
          )}
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
  image?: ImageSourcePropType;
  title: string;
  icon: string;
  date: Dayjs;
  body: string;
  button: string;
  onPress(): void;
}

const initialItems: SwipeItem[] = [
  {
    id: uuid.v4(),
    image: undefined,
    title: "Price Movement",
    icon: "arrow-bottom-right",
    date: dayjs().subtract(5, "minute"),
    body: "BABA is down 4.41% to $204.433.",
    button: "View BABA",
    onPress: () => undefined
  },
  {
    id: uuid.v4(),
    image: undefined,
    title: "Marketwatch",
    icon: "file-document-box-outline",
    date: dayjs().subtract(11, "hour"),
    body:
      "Disney heiress Abigail Disney and other superrich American demand the 1% pay higher taxes than other Americans.",
    button: "View Article",
    onPress: () => undefined
  },
  {
    id: uuid.v4(),
    image: undefined,
    title: "Reuters",
    icon: "book",
    date: dayjs().subtract(1, "day"),
    body:
      "Amazon files motion to halt Microsoft's work on Pentagon's JEDI contract",
    button: "View Article",
    onPress: () => undefined
  },
  {
    id: uuid.v4(),
    image: require("./placeholder.png"),
    title: "Congratulations",
    icon: "star-outline",
    date: dayjs(),
    body: "You're invited! Start trading Bitcoin & Ethereum",
    button: "Get Started",
    onPress: () => undefined
  }
];

interface SwipeCardListProps {
  height?: number;
}

interface BadgeProps {
  count: number;
}
const Badge = memo((props: BadgeProps) => {
  const size = Theme.padding.p06;
  const color = useColor();
  return (
    <View
      style={{
        position: "absolute",
        right: 0,
        margin: Theme.padding.p01,
        zIndex: 100,
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: color.danger,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text title={`${props.count}`} style={{ color: color.background }} />
    </View>
  );
});

const SwipeCardList = memo(function SwipeCardList({
  height = 100
}: SwipeCardListProps) {
  const [feed, setFeed] = useState({
    items: initialItems
  });

  const onSwipeComplete = () => {
    setFeed(state => ({
      ...state,
      items: state.items.filter((_, i) => i !== state.items.length - 1)
    }));
  };

  return !feed.items.length ? null : (
    <View style={{ height }}>
      {feed.items.map((item, index) => (
        <SwipeCard
          {...item}
          height={height}
          key={item.id}
          index={index}
          onSwipeComplete={onSwipeComplete}
        />
      ))}
      <Badge count={feed.items.length} />
    </View>
  );
});

const ImagePlaceholder = memo(() => {
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
        <SwipeCardList />
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

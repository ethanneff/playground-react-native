import moment from "moment";
import React, { memo, useEffect, useRef } from "react";
import { FlatList } from "react-native";
import { ListItem } from "./ListItem";

export interface Item {
  action: string;
  dayOfMonth: string;
  dayOfWeek: string;
  hour: string;
  id: number;
  month: string;
  zone: string;
}

interface Props {
  onItemPress(item: Item): void;
}

const infiniteScrollThreshold = 0.3;
const infiniteScrollRegeneration = 50;
const items: Item[] = [];

export const List = memo(({ onItemPress }: Props) => {
  const listRef = useRef(null);

  useEffect(() => {
    generateMoreItems();
  }, []);

  useEffect(() => {
    if (items.length === 0 || listRef === null) {
      return;
    }
    // listRef.current.scrollToIndex(2);
  }, [listRef]);

  const generateMoreItems = () => {
    // TODO: batch
    for (let i = 0; i < infiniteScrollRegeneration; i++) {
      const lastItem =
        items.length === 0
          ? moment()
              .startOf("day")
              .add(2, "day")
              .valueOf()
          : items[items.length - 1].id;
      const next = moment(lastItem).subtract(1, "hour");
      const id = next.valueOf();
      items.push({
        action: String(Math.random()) + String(Math.random()),
        dayOfMonth: next.format("D"),
        dayOfWeek: next.format("ddd"),
        hour: next.format("h"),
        id,
        month: next.format("MMM"),
        zone: next.format("a")
      });
    }
  };

  const renderItem = ({ item, index }: { item: Item; index: number }) => {
    const firstItemOfDay =
      index < 1 ? false : item.dayOfMonth !== items[index - 1].dayOfMonth;
    return (
      <ListItem
        item={item}
        showSection={firstItemOfDay}
        onItemPress={onItemPress}
      />
    );
  };

  const keyExtractor = (item: Item) => String(item.id);

  return items.length < 0 ? null : (
    <FlatList
      inverted
      //   initialScrollIndex={20} // TODO:
      ref={listRef}
      keyExtractor={keyExtractor}
      data={items}
      onEndReached={generateMoreItems}
      onEndReachedThreshold={infiniteScrollThreshold}
      renderItem={renderItem}
    />
  );
});

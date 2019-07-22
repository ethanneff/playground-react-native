import moment from "moment";
import React, { memo, useEffect, useRef } from "react";
import { FlatList } from "react-native";
import { ListItem } from "./ListItem";

export interface Item {
  id: number;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
  hour: string;
  zone: string;
  action: string;
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
    if (items.length === 0 || listRef === null) { return; }
    // listRef.current.scrollToIndex(2);
  }, [items, listRef]);

  const generateMoreItems = () => {
    // TODO: batch
    for (let i = 0; i < infiniteScrollRegeneration; i++) {
      const lastItem =
        items.length === 0
          ? moment()
              .startOf("day")
              .add(3, "day")
              .valueOf()
          : items[items.length - 1].id;
      const next = moment(lastItem).subtract(1, "hour");
      const id = next.valueOf();
      items.push({
        id,
        dayOfMonth: next.format("D"),
        month: next.format("MMM"),
        dayOfWeek: next.format("ddd"),
        hour: next.format("h"),
        zone: next.format("a"),
        action: String(Math.random()) + String(Math.random())
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

  console.log("list render");
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

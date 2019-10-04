import React, { memo, useRef } from "react";
import { FlatList } from "react-native";
import { ListItem } from "./ListItem";
import { Theme } from "../../../utils";

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
  items: Item[];
  onEndReached(): void;
  onEndReachedThreshold: number;
  onItemPress(item: Item): void;
}

const itemHeight = Theme.padding.p10;
export const List = memo(
  ({ items, onItemPress, onEndReached, onEndReachedThreshold }: Props) => {
    const listRef = useRef<FlatList<Item> | null>(null);

    const getCurrentItem = (item: Item): boolean => {
      const currentTime = new Date();
      const before = currentTime.setHours(currentTime.getHours() - 1);
      const after = currentTime.setHours(currentTime.getHours() + 1);
      if (item.id > before && item.id < after) {
        return true;
      }
      return false;
    };

    // TODO:  move to list item
    const renderItem = ({ item, index }: { item: Item; index: number }) => {
      const firstItemOfDay =
        index < 1 ? false : item.dayOfMonth !== items[index - 1].dayOfMonth;
      return (
        <ListItem
          currentItem={getCurrentItem(item)}
          item={item}
          showSection={firstItemOfDay}
          onItemPress={onItemPress}
        />
      );
    };

    const onLayout = () => {
      if (!listRef || !listRef.current || items.length < 50) {
        return;
      }
      listRef.current.scrollToIndex({ index: 20, animated: false });
    };

    const keyExtractor = (item: Item) => String(item.id);

    const getItemLayout = (_: any, index: number) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index
    });

    return (
      <FlatList
        onLayout={onLayout}
        inverted
        ref={listRef}
        getItemLayout={getItemLayout}
        keyExtractor={keyExtractor}
        data={items}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        renderItem={renderItem}
      />
    );
  }
);

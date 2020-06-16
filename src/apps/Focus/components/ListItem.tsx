import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {Icon, Text, TouchableOpacity} from '../../../components';
import {Theme} from '../../../utils';
import {useColor} from '../../../hooks';
import {Item} from './List';
import {ListSection} from './ListSection';

interface Props {
  showSection: boolean;
  item: Item;
  currentItem: boolean;
  onItemPress(item: Item): void;
}

export const ListItem = memo(function ListItem({
  showSection,
  item,
  onItemPress,
  currentItem,
}: Props) {
  const color = useColor();
  const future = item.id > Date.now();
  const iconColor = future ? color.secondary : color.success;
  const title = currentItem ? 'current' : future ? 'future' : item.action;

  const onPress = useCallback(() => onItemPress(item), [item, onItemPress]);

  return (
    <View
      style={{
        borderColor: currentItem ? color.primary : color.background,
        borderLeftWidth: Theme.padding.p01,
        flex: 1,
      }}>
      <TouchableOpacity
        disabled={future}
        onPress={onPress}
        style={{
          flex: 1,
          flexDirection: 'row',
          height: Theme.padding.p10,
          paddingHorizontal: Theme.padding.p04,
          paddingVertical: Theme.padding.p02,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: Theme.padding.p20,
          }}>
          <Icon
            color={iconColor}
            name={future ? 'cancel' : 'checkbox-blank-circle'}
            size={14}
            style={{paddingRight: Theme.padding.p01}}
          />
          <Text title={`${item.hour} ${item.zone}`} />
        </View>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{
            color: color.secondary,
            flex: 1,
          }}
          title={title}
          type="body1"
        />
      </TouchableOpacity>
      {showSection && <ListSection item={item} />}
    </View>
  );
});

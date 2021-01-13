import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {Icon, Text, TouchableOpacity} from '../../components';
import {useColor} from '../../hooks';
import {Config} from '../../utils';
import {ListSection} from './ListSection';
import {Item} from './types';

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
        borderLeftWidth: Config.padding(1),
        flex: 1,
      }}>
      <TouchableOpacity
        disabled={future}
        onPress={onPress}
        style={{
          flex: 1,
          flexDirection: 'row',
          height: Config.padding(10),
          paddingHorizontal: Config.padding(4),
          paddingVertical: Config.padding(2),
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: Config.padding(20),
          }}>
          <Icon
            color={iconColor}
            name={future ? 'cancel' : 'checkbox-blank-circle'}
            size={14}
            style={{paddingRight: Config.padding(1)}}
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

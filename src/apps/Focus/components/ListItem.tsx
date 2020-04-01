import React, {memo} from 'react';
import {View} from 'react-native';
import {Icon, Text, TouchableOpacity} from '../../../components';
import {Theme} from '../../../utils';
import {Item} from './List';
import {ListSection} from './ListSection';
import {useColor} from '../../../hooks';

interface Props {
  showSection: boolean;
  item: Item;
  currentItem: boolean;
  onItemPress(item: Item): void;
}

export const ListItem = memo(
  ({showSection, item, onItemPress, currentItem}: Props) => {
    const color = useColor();
    const future = item.id > Date.now();
    const iconColor = future ? color.secondary : color.success;
    const title = currentItem ? 'current' : future ? 'future' : item.action;
    return (
      <View
        style={{
          borderColor: currentItem ? color.primary : color.background,
          borderLeftWidth: Theme.padding.p01,
          flex: 1,
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            height: Theme.padding.p10,
            paddingHorizontal: Theme.padding.p04,
            paddingVertical: Theme.padding.p02,
          }}
          onPress={() => onItemPress(item)} // TODO: usecallback
          disabled={future}>
          <View
            style={{
              flexDirection: 'row',
              width: Theme.padding.p20,
            }}>
            <Icon
              name={future ? 'cancel' : 'checkbox-blank-circle'}
              size={14}
              color={iconColor}
              style={{paddingRight: Theme.padding.p01}}
            />
            <Text title={`${item.hour} ${item.zone}`} />
          </View>
          <Text
            style={{
              color: color.secondary,
              flex: 1,
            }}
            title={title}
            type="body1"
            numberOfLines={1}
            ellipsizeMode={'tail'}
          />
        </TouchableOpacity>
        {showSection && <ListSection item={item} />}
      </View>
    );
  },
);

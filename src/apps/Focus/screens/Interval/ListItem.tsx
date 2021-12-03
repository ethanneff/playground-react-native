import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import { Icon, Text, TouchableOpacity } from '../../../../components';
import { padding, useColor, useDropShadow } from '../../../../features';
import { AuthStackRoutes, Item } from '../../types';
import { ListSection } from './ListSection';

type Props = {
  currentItem: boolean;
  item: Item;
  showFooter: boolean;
  showHeader: boolean;
};

export const ListItem = memo(function ListItem({
  showHeader,
  item,
  showFooter,
  currentItem,
}: Props) {
  const color = useColor();
  const dropShadow = useDropShadow();
  const future = item.id > Date.now();
  const iconColor = future ? 'tertiary' : 'positive';
  const title = currentItem ? 'current' : future ? 'future' : item.title;
  const { navigate } =
    useNavigation<StackNavigationProp<AuthStackRoutes, 'home'>>();

  const onPress = useCallback(
    () => navigate('interval-detail', { item }),
    [item, navigate],
  );

  return (
    <View
      style={{
        width: '100%',
        overflow: showFooter ? 'visible' : 'hidden',
        paddingHorizontal: padding(4),
      }}
    >
      <View
        style={{
          flex: 1,
          marginTop: showHeader ? padding(4) : padding(0),
          paddingBottom: showFooter ? padding(2) : padding(0),
          backgroundColor: color.background.primaryA,
          borderTopRightRadius: showHeader ? padding(4) : 0,
          borderTopLeftRadius: showHeader ? padding(4) : 0,
          borderBottomRightRadius: showFooter ? padding(4) : 0,
          borderBottomLeftRadius: showFooter ? padding(4) : 0,
          borderColor: currentItem
            ? color.background.accent
            : color.background.primaryA,
          borderLeftWidth: padding(1),
          ...dropShadow(2),
        }}
      >
        {showHeader && <ListSection item={item} />}
        <TouchableOpacity
          disabled={future}
          onPress={onPress}
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: padding(4),
            paddingVertical: padding(2),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              width: padding(20),
            }}
          >
            <Icon
              color={iconColor}
              name={future ? 'cancel' : 'checkbox-blank-circle'}
              size={14}
              style={{ paddingRight: padding(1) }}
            />
            <Text title={`${item.hour} ${item.zone}`} />
          </View>
          <Text
            color="secondary"
            ellipsizeMode="tail"
            flex
            numberOfLines={1}
            title={title}
            type="body1"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
});

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, useCallback } from 'react';
import { Icon, Text, TouchableOpacity, View } from '../../../../components';
import { spacing, useColors, useDropShadow } from '../../../../features';
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
  const colors = useColors();
  const dropShadow = useDropShadow();
  const future = item.id > Date.now();
  const iconColor = future ? 'tertiary' : 'positive';
  const title = currentItem ? 'current' : future ? 'future' : item.title;
  const { navigate } =
    useNavigation<StackNavigationProp<AuthStackRoutes, 'home'>>();

  const onPress = useCallback(
    () => navigate('interval-details', { item }),
    [item, navigate],
  );

  return (
    <View
      style={{
        width: '100%',
        overflow: showFooter ? 'visible' : 'hidden',
        paddingHorizontal: spacing(4),
      }}
    >
      <View
        style={{
          flex: 1,
          marginTop: showHeader ? spacing(4) : spacing(0),
          paddingBottom: showFooter ? spacing(2) : spacing(0),
          backgroundColor: colors.background.primaryA,
          borderTopRightRadius: showHeader ? spacing(4) : 0,
          borderTopLeftRadius: showHeader ? spacing(4) : 0,
          borderBottomRightRadius: showFooter ? spacing(4) : 0,
          borderBottomLeftRadius: showFooter ? spacing(4) : 0,
          borderColor: currentItem
            ? colors.background.accent
            : colors.background.primaryA,
          borderLeftWidth: spacing(1),
          ...dropShadow(2),
        }}
      >
        {showHeader ? <ListSection item={item} /> : null}
        <TouchableOpacity
          disabled={future}
          onPress={onPress}
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: spacing(4),
            paddingVertical: spacing(2),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              width: spacing(20),
            }}
          >
            <Icon
              color={iconColor}
              name={future ? 'cancel' : 'checkbox-blank-circle'}
              size={14}
              style={{ paddingRight: spacing(1) }}
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

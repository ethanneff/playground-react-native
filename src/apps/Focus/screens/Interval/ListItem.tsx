import React, { useCallback } from 'react';
import { Icon, Pressable, Text, View } from '../../../../components';
import {
  type StackNavigationProperty,
  useNavigation,
} from '../../../../conversions';
import { spacing, useColors, useDropShadow } from '../../../../features';
import { type AuthStackRoutes, type Item } from '../../types';
import { ListSection } from './ListSection';

type Properties = {
  readonly currentItem: boolean;
  readonly item: Item;
  readonly showFooter: boolean;
  readonly showHeader: boolean;
};

export const ListItem = ({
  currentItem,
  item,
  showFooter,
  showHeader,
}: Properties) => {
  const colors = useColors();
  const dropShadow = useDropShadow();
  const future = item.id > Date.now();
  const iconColor = future ? 'tertiary' : 'positive';
  const title = currentItem ? 'current' : future ? 'future' : item.title;
  const { navigate } =
    useNavigation<StackNavigationProperty<AuthStackRoutes, 'home'>>();

  const onPress = useCallback(() => {
    navigate('interval-details', { item });
  }, [item, navigate]);

  return (
    <View
      style={{
        overflow: showFooter ? 'visible' : 'hidden',
        paddingHorizontal: spacing(4),
        width: '100%',
      }}
    >
      <View
        style={{
          backgroundColor: colors.background.primaryA,
          borderBottomLeftRadius: showFooter ? spacing(4) : 0,
          borderBottomRightRadius: showFooter ? spacing(4) : 0,
          borderColor: currentItem
            ? colors.background.accent
            : colors.background.primaryA,
          borderLeftWidth: spacing(1),
          borderTopLeftRadius: showHeader ? spacing(4) : 0,
          borderTopRightRadius: showHeader ? spacing(4) : 0,
          flex: 1,
          marginTop: showHeader ? spacing(4) : spacing(0),
          paddingBottom: showFooter ? spacing(2) : spacing(0),
          ...dropShadow(2),
        }}
      >
        {showHeader ? <ListSection item={item} /> : null}
        <Pressable
          contentStyle={{
            flexDirection: 'row',
            paddingHorizontal: spacing(4),
            paddingVertical: spacing(2),
          }}
          disabled={future}
          onPress={onPress}
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
        </Pressable>
      </View>
    </View>
  );
};

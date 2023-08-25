import React, { useCallback } from 'react';
import { Image, type ImageSourcePropType } from 'react-native';
import { Card, RelativeDate, Text, View } from '../../../../components';
import { spacing } from '../../../../features';
import { useAppDispatch } from '../../../../redux';
import { setActiveChatMessage, type Message } from './Messages';

type Props = {
  readonly item: Message;
  readonly marginBottom: boolean;
};

const image =
  require('../../../../assets/line-chart.png') as ImageSourcePropType;
export const Item = ({ item, marginBottom }: Props) => {
  const dispatch = useAppDispatch();

  const handleLongPress = useCallback(() => {
    dispatch(setActiveChatMessage(item.id));
  }, [dispatch, item.id]);

  return (
    <Card
      contentStyle={{
        flexDirection: 'row',
        marginBottom: marginBottom ? spacing(4) : 0,
      }}
      onLongPress={handleLongPress}
    >
      <View
        flex={1}
        justifyContent="center"
      >
        <Image
          source={image}
          style={{
            alignSelf: 'center',
            height: 25,
            paddingTop: spacing(4),
            resizeMode: 'contain',
            width: 25,
          }}
        />
      </View>
      <View flex={5}>
        <View flexDirection="row">
          <Text
            bold
            emphasis="medium"
            style={{ paddingRight: spacing(2) }}
            title={item.userId}
          />
          <RelativeDate
            date={item.createdAt}
            emphasis="medium"
          />
        </View>
        <Text
          style={{ paddingTop: spacing(1) }}
          title={item.message}
        />
      </View>
    </Card>
  );
};

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { memo } from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { RelativeDate, Text, View } from '../../../../components';
import { spacing, useColors } from '../../../../features';
import { Message } from './Messages';
dayjs.extend(relativeTime);

type Props = {
  item: Message;
  marginBottom: boolean;
};

export const Item = memo(function ChatMessage({ item, marginBottom }: Props) {
  const colors = useColors();
  const image =
    require('../../../../assets/line-chart.png') as ImageSourcePropType;

  return (
    <View
      key={item.id}
      style={{
        padding: spacing(2),
        borderRadius: spacing(4),
        flexDirection: 'row',
        marginBottom: marginBottom ? spacing(4) : 0,
        backgroundColor: colors.background.primaryA,
      }}
    >
      <View style={{ width: 40 }}>
        <Image
          source={image}
          style={{
            alignSelf: 'center',
            height: 20,
            paddingTop: spacing(4),
            resizeMode: 'contain',
            width: 20,
          }}
        />
      </View>
      <View flex>
        <View row>
          <Text
            bold
            style={{ paddingRight: spacing(2) }}
            title={item.userId}
          />
          <RelativeDate date={item.createdAt} />
        </View>
        <Text
          style={{ paddingTop: spacing(1) }}
          title={item.message}
          type="body1"
        />
      </View>
    </View>
  );
});

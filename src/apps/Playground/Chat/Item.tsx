import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, {memo} from 'react';
import {Image, View} from 'react-native';
import {RelativeDate, Text} from '../../../components';
import {padding, useColor} from '../../../features';
import {Message} from './Messages';
dayjs.extend(relativeTime);

interface Props {
  item: Message;
  marginBottom: boolean;
}

export const Item = memo(function ChatMessage({item, marginBottom}: Props) {
  const color = useColor();
  const image = require('../../../assets/line-chart.png');

  return (
    <View
      key={item.id}
      style={{
        padding: padding(2),
        borderRadius: padding(4),
        flexDirection: 'row',
        marginBottom: marginBottom ? padding(6) : 0,
        backgroundColor: color.background.primaryA,
      }}>
      <View style={{width: 40}}>
        <Image
          source={image}
          style={{
            alignSelf: 'center',
            height: 20,
            paddingTop: padding(4),
            resizeMode: 'contain',
            width: 20,
          }}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Text bold style={{paddingRight: padding(2)}} title={item.userId} />
          <RelativeDate date={item.createdAt} />
        </View>
        <Text
          style={{paddingTop: padding(1)}}
          title={item.message}
          type="body1"
        />
      </View>
    </View>
  );
});

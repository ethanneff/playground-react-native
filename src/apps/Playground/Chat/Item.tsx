import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, {memo} from 'react';
import {Image, View} from 'react-native';
import {RelativeDate, Text} from '../../../components';
import {useColor} from '../../../hooks';
import {Theme} from '../../../utils';
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
        padding: Theme.padding.p02,
        borderRadius: Theme.padding.p04,
        flexDirection: 'row',
        marginBottom: marginBottom ? Theme.padding.p06 : 0,
        backgroundColor: color.background,
      }}>
      <View style={{width: 40}}>
        <Image
          source={image}
          style={{
            alignSelf: 'center',
            height: 20,
            paddingTop: Theme.padding.p04,
            resizeMode: 'contain',
            width: 20,
          }}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            bold
            style={{paddingRight: Theme.padding.p02}}
            title={item.userId}
          />
          <RelativeDate date={item.createdAt} />
        </View>
        <Text
          style={{paddingTop: Theme.padding.p01}}
          title={item.message}
          type="body1"
        />
      </View>
    </View>
  );
});

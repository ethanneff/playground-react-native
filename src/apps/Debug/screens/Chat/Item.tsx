import React, {memo} from 'react';
import {Image, View} from 'react-native';
import {Text, RelativeDate} from '../../../../components';
import {Theme} from '../../../../utils';
import {Message} from './Messages';
import {useColor} from '../../../../hooks';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
dayjs.extend(relativeTime);

interface Props {
  item: Message;
}

export const Item = memo(function ChatMessage({item}: Props) {
  const color = useColor();
  const image = require('../../../../assets/line-chart.png');

  return (
    <View
      key={item.id}
      style={{
        padding: Theme.padding.p01,
        borderRadius: Theme.padding.p04,
        flexDirection: 'row',
        marginBottom: Theme.padding.p06,
        backgroundColor: color.light,
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
            title={item.userId}
            bold
            style={{paddingRight: Theme.padding.p02}}
          />
          <RelativeDate date={item.createdAt} />
        </View>
        <Text title={item.message} body1 style={{paddingTop: 5}} />
      </View>
    </View>
  );
});

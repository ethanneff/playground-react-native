import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';
import {Screen, Text} from '../../../components';
import {ScrollView} from '../../../conversions';
import {useColor} from '../../../hooks';
import {getWidth} from '../../../models';
import {config, useRootSelector} from '../../../utils';

// https://support.apple.com/en-us/HT211028

interface SectionProps {
  index: number;
  paddingHorizontal: number;
  title: string;
  description?: string;
  image?: ImageSourcePropType;
  imageRatio?: number;
}
const Section = ({
  index,
  title,
  description,
  image,
  paddingHorizontal,
  imageRatio = 0,
}: SectionProps) => {
  const color = useColor();
  const width = useRootSelector(getWidth);
  const leftWidth = config.padding(12);
  const imageWidth = width - leftWidth - 2 * paddingHorizontal;
  return (
    <View
      style={{
        paddingVertical: config.padding(8),
        borderBottomColor: color.surface,
        borderBottomWidth: 2,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{width: leftWidth, color: color.primary}}
          title={String(index)}
          type="h2"
        />
        <View style={{flex: 1}}>
          <Text title={title} type="h5" />
          <Text title={description} type="subtitle1" />
          {image && (
            <Image
              source={image}
              style={{
                flex: 1,
                width: imageWidth,
                height: imageWidth / imageRatio,
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export const AppleMask = memo(function AppleMask() {
  const {goBack} = useNavigation();

  const sections = [
    {
      title: 'Align your preferred slots on the face shield and forehead band',
      description: 'Either side of the face shield can act as the front.',
      image: require('./one.png'),
      imageRatio: 1560 / 750,
    },
    {
      title:
        'Remove thin protective films from the face shield and forehead band by peeling from either edge',
      image: require('./two.gif'),
      imageRatio: 1560 / 1750,
    },
    {
      title: 'Thread the strap through the slots and pull to adjust',
      image: require('./three.gif'),
      imageRatio: 1560 / 950,
    },
    {title: 'Repeat on other side'},
    {
      title: 'Adjust your face shield',
      image: require('./four.gif'),
      imageRatio: 1560 / 950,
    },
    {
      title:
        'Wear the face shield in addition to other personal protective equipment',
    },
  ];

  const color = useColor();
  const paddingHorizontal = config.padding(4);
  const navBack = useCallback(() => goBack(), [goBack]);
  return (
    <Screen dropShadow onLeftPress={navBack} title="Apple Mask">
      <ScrollView
        style={{
          paddingHorizontal: config.padding(4),
          backgroundColor: color.surface,
        }}>
        <Text title="Assemble and adjust your Face Shield" type="h2" />
        <Text
          style={{paddingTop: config.padding(4)}}
          title="To assemble your face shield, follow these steps."
          type="subtitle1"
        />
        {sections.map(({title, description, image, imageRatio}, index) => (
          <Section
            description={description}
            image={image}
            imageRatio={imageRatio}
            index={index + 1}
            key={title}
            paddingHorizontal={paddingHorizontal}
            title={title}
          />
        ))}
      </ScrollView>
    </Screen>
  );
});

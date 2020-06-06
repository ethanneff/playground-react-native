import React, {memo} from 'react';
import {Image, ImageSourcePropType, ScrollView, View} from 'react-native';
import {Screen, Text} from '../../../../components';
import {useColor, useNav} from '../../../../hooks';
import {Theme, useRootSelector} from '../../../../utils';
import {getWidth} from '../../../../models';

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
  const leftWidth = Theme.padding.p12;
  const imageWidth = width - leftWidth - 2 * paddingHorizontal;
  return (
    <View
      style={{
        paddingVertical: Theme.padding.p08,
        borderBottomColor: color.surface,
        borderBottomWidth: 2,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text
          type="h1"
          title={String(index)}
          style={{width: leftWidth, color: color.primary}}
        />
        <View style={{flex: 1}}>
          <Text type="h3" title={title} />
          <Text type="subtitle1" title={description} />
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

export default memo(function AppleMask() {
  const nav = useNav();

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

  const paddingHorizontal = Theme.padding.p04;
  return (
    <Screen onLeftPress={nav.to('playground')}>
      <ScrollView contentContainerStyle={{paddingHorizontal}}>
        <Text type="h2" title="Assemble and adjust your Face Shield" />
        <Text
          type="subtitle1"
          title="To assemble your face shield, follow these steps."
          style={{paddingTop: Theme.padding.p04}}
        />
        {sections.map(({title, description, image, imageRatio}, index) => (
          <Section
            paddingHorizontal={paddingHorizontal}
            key={title}
            index={index + 1}
            title={title}
            description={description}
            image={image}
            imageRatio={imageRatio}
          />
        ))}
      </ScrollView>
    </Screen>
  );
});

import React, { memo } from 'react';
import { Image, type ImageSourcePropType } from 'react-native';
import { Screen, ScrollView, Text, View } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { spacing, useColors } from '../../../../features';
import { getWidth, useAppSelector } from '../../../../redux';

// https://support.apple.com/en-us/HT211028

type SectionProps = {
  description?: string;
  image?: ImageSourcePropType;
  imageRatio?: number;
  index: number;
  paddingHorizontal: number;
  title: string;
};

const Section = ({
  description,
  image,
  imageRatio = 0,
  index,
  paddingHorizontal,
  title,
}: SectionProps) => {
  const colors = useColors();
  const width = useAppSelector(getWidth);
  const leftWidth = spacing(12);
  const imageWidth = width - leftWidth - 2 * paddingHorizontal;
  return (
    <View
      style={{
        borderBottomColor: colors.border.tertiary,
        borderBottomWidth: 2,
        paddingVertical: spacing(8),
      }}
    >
      <View flexDirection="row">
        <Text
          color="accent"
          style={{ width: leftWidth }}
          title={String(index)}
          type="h2"
        />
        <View flex={1}>
          <Text
            style={{ marginBottom: spacing(4) }}
            title={title}
            type="h5"
          />
          <Text
            style={{ marginBottom: spacing(4) }}
            title={description}
            type="subtitle1"
          />
          {image ? (
            <Image
              source={image}
              style={{
                flex: 1,
                height: imageWidth / imageRatio,
                width: imageWidth,
              }}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

export const AppleMask = memo(function AppleMask() {
  const { goBack } = useNavigation();

  const sections = [
    {
      description: 'Either side of the face shield can act as the front.',
      image: require('./one.png') as ImageSourcePropType,
      imageRatio: 1560 / 750,
      title: 'Align your preferred slots on the face shield and forehead band',
    },
    {
      image: require('./two.gif') as ImageSourcePropType,
      imageRatio: 1560 / 1750,
      title:
        'Remove thin protective films from the face shield and forehead band by peeling from either edge',
    },
    {
      image: require('./three.gif') as ImageSourcePropType,
      imageRatio: 1560 / 950,
      title: 'Thread the strap through the slots and pull to adjust',
    },
    { title: 'Repeat on other side' },
    {
      image: require('./four.gif') as ImageSourcePropType,
      imageRatio: 1560 / 950,
      title: 'Adjust your face shield',
    },
    {
      title:
        'Wear the face shield in addition to other personal protective equipment',
    },
  ];

  const colors = useColors();
  const paddingHorizontal = spacing(4);

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Apple Mask"
    >
      <ScrollView
        style={{
          backgroundColor: colors.background.secondary,
          paddingHorizontal: spacing(4),
        }}
      >
        <Text
          title="Assemble and adjust your Face Shield"
          type="h2"
        />
        <Text
          style={{ paddingTop: spacing(4) }}
          title="To assemble your face shield, follow these steps."
          type="subtitle1"
        />
        {sections.map(({ description, image, imageRatio, title }, index) => (
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

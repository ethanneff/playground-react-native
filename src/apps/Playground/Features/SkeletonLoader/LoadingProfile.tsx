import React from 'react';
import { View } from 'react-native';
import { Card, SkeletonLoader } from '../../../../components';
import { padding, useColors } from '../../../../features';

export const LoadingProfile = (): JSX.Element => {
  const colors = useColors();
  const banner = padding(24);

  return (
    <Card
      noPadding
      style={{
        marginBottom: padding(4),
        paddingBottom: padding(20),
      }}
    >
      <View
        style={{
          borderTopLeftRadius: padding(2),
          borderTopRightRadius: padding(2),
          backgroundColor: colors.background.tertiary,
          flex: 1,
          height: banner,
        }}
      />
      <View
        style={{
          alignItems: 'center',
          width: '100%',
          position: 'absolute',
          left: 0,
          top: banner * 0.5,
          zIndex: 1,
        }}
      >
        <SkeletonLoader
          borderRadius={banner}
          height={banner}
          width={banner}
        />
      </View>
      <View style={{ marginTop: banner * 0.5, alignItems: 'center' }}>
        <View style={{ paddingVertical: padding(4) }}>
          <SkeletonLoader
            borderRadius={0}
            height={padding(6)}
            width={padding(16) * 4}
          />
        </View>
        <SkeletonLoader
          borderRadius={0}
          height={padding(6)}
          width={padding(16) * 3}
        />
      </View>
    </Card>
  );
};

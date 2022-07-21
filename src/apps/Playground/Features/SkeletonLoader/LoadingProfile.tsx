import React from 'react';
import { Card, SkeletonLoader, View } from '../../../../components';
import { spacing, useColors } from '../../../../features';

export const LoadingProfile = (): JSX.Element => {
  const colors = useColors();
  const banner = spacing(24);

  return (
    <Card
      noPadding
      style={{
        marginBottom: spacing(4),
        paddingBottom: spacing(20),
      }}
    >
      <View
        style={{
          borderTopLeftRadius: spacing(2),
          borderTopRightRadius: spacing(2),
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
        <View style={{ paddingVertical: spacing(4) }}>
          <SkeletonLoader
            borderRadius={0}
            height={spacing(6)}
            width={spacing(16) * 4}
          />
        </View>
        <SkeletonLoader
          borderRadius={0}
          height={spacing(6)}
          width={spacing(16) * 3}
        />
      </View>
    </Card>
  );
};

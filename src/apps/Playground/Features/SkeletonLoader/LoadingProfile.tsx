import React from 'react';
import { Card, SkeletonLoader, View } from '../../../../components';
import { spacing, useColors } from '../../../../features';

export const LoadingProfile = () => {
  const colors = useColors();
  const banner = spacing(24);

  return (
    <Card>
      <View
        style={{
          backgroundColor: colors.background.tertiary,
          borderTopLeftRadius: spacing(2),
          borderTopRightRadius: spacing(2),
          flex: 1,
          height: banner,
        }}
      />
      <View
        style={{
          alignItems: 'center',
          left: 0,
          position: 'absolute',
          top: banner * 0.5,
          width: '100%',
          zIndex: 1,
        }}
      >
        <SkeletonLoader
          borderRadius={banner}
          height={banner}
          width={banner}
        />
      </View>
      <View style={{ alignItems: 'center', marginTop: banner * 0.5 }}>
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

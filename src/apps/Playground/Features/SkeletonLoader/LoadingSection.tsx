import React from 'react';
import { Card, SkeletonLoader, View } from '../../../../components';
import { spacing } from '../../../../features';

export const LoadingSection = (): JSX.Element => {
  return (
    <Card style={{ marginBottom: spacing(4) }}>
      <View>
        <View flexDirection="row">
          <SkeletonLoader
            borderRadius={spacing(24)}
            height={spacing(24)}
            width={spacing(24)}
          />
          <View
            style={{
              justifyContent: 'space-between',
              padding: spacing(4),
            }}
          >
            <SkeletonLoader
              borderRadius={0}
              height={spacing(6)}
              width={spacing(20)}
            />
            <SkeletonLoader
              borderRadius={0}
              height={spacing(6)}
              width={spacing(20) * 2}
            />
          </View>
        </View>
        <View style={{ paddingVertical: spacing(4) }}>
          <SkeletonLoader
            borderRadius={0}
            height={spacing(6)}
            width={spacing(19) * 4}
          />
        </View>
        <View style={{ paddingBottom: spacing(4) }}>
          <SkeletonLoader
            borderRadius={0}
            height={spacing(6)}
            width={spacing(20) * 4}
          />
        </View>
        <SkeletonLoader
          borderRadius={0}
          height={spacing(6)}
          width={spacing(18) * 4}
        />
      </View>
    </Card>
  );
};

import React from 'react';
import { View } from 'react-native';
import { Card, SkeletonLoader } from '../../../components';
import { padding } from '../../../features';

export const LoadingSection = (): JSX.Element => {
  return (
    <Card style={{ marginBottom: padding(4) }}>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <SkeletonLoader
            borderRadius={padding(24)}
            height={padding(24)}
            width={padding(24)}
          />
          <View
            style={{
              padding: padding(4),
              justifyContent: 'space-between',
            }}
          >
            <SkeletonLoader
              borderRadius={0}
              height={padding(6)}
              width={padding(20)}
            />
            <SkeletonLoader
              borderRadius={0}
              height={padding(6)}
              width={padding(20) * 2}
            />
          </View>
        </View>
        <View style={{ paddingVertical: padding(4) }}>
          <SkeletonLoader
            borderRadius={0}
            height={padding(6)}
            width={padding(19) * 4}
          />
        </View>
        <View style={{ paddingBottom: padding(4) }}>
          <SkeletonLoader
            borderRadius={0}
            height={padding(6)}
            width={padding(20) * 4}
          />
        </View>
        <SkeletonLoader
          borderRadius={0}
          height={padding(6)}
          width={padding(18) * 4}
        />
      </View>
    </Card>
  );
};

import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Card, Screen, SkeletonLoader, Text} from '../../../components';
import {ScrollView} from '../../../conversions';
import {useColor} from '../../../hooks';
import {Theme} from '../../../utils';

const LoadingProfile = () => {
  const color = useColor();
  const banner = Theme.padding.p24;

  return (
    <Card
      noPadding
      style={{
        marginBottom: Theme.padding.p04,
        paddingBottom: Theme.padding.p20,
      }}>
      <View
        style={{
          borderTopLeftRadius: Theme.sizing.borderRadius,
          borderTopRightRadius: Theme.sizing.borderRadius,
          backgroundColor: color.light,
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
        }}>
        <SkeletonLoader borderRadius={banner} height={banner} width={banner} />
      </View>
      <View style={{marginTop: banner * 0.5, alignItems: 'center'}}>
        <View style={{paddingVertical: Theme.padding.p04}}>
          <SkeletonLoader
            borderRadius={0}
            height={Theme.padding.p06}
            width={Theme.padding.p16 * 4}
          />
        </View>
        <SkeletonLoader
          borderRadius={0}
          height={Theme.padding.p06}
          width={Theme.padding.p16 * 3}
        />
      </View>
    </Card>
  );
};

const LoadingSection = () => {
  return (
    <Card style={{marginBottom: Theme.padding.p04}}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <SkeletonLoader
            borderRadius={Theme.padding.p24}
            height={Theme.padding.p24}
            width={Theme.padding.p24}
          />
          <View
            style={{
              padding: Theme.padding.p04,
              justifyContent: 'space-between',
            }}>
            <SkeletonLoader
              borderRadius={0}
              height={Theme.padding.p06}
              width={Theme.padding.p20}
            />
            <SkeletonLoader
              borderRadius={0}
              height={Theme.padding.p06}
              width={Theme.padding.p20 * 2}
            />
          </View>
        </View>
        <View style={{paddingVertical: Theme.padding.p04}}>
          <SkeletonLoader
            borderRadius={0}
            height={Theme.padding.p06}
            width={Theme.padding.p19 * 4}
          />
        </View>
        <View style={{paddingBottom: Theme.padding.p04}}>
          <SkeletonLoader
            borderRadius={0}
            height={Theme.padding.p06}
            width={Theme.padding.p21 * 4}
          />
        </View>
        <SkeletonLoader
          borderRadius={0}
          height={Theme.padding.p06}
          width={Theme.padding.p20 * 4}
        />
      </View>
    </Card>
  );
};

export const SkeletonLoading = memo(function PlaygroundTemplate() {
  const {goBack} = useNavigation();
  const navBack = useCallback(() => goBack(), [goBack]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Screen onLeftPress={navBack} title="Skeleton Loading">
      <ScrollView contentContainerStyle={{padding: Theme.padding.p04}}>
        {loading ? (
          <View>
            <LoadingProfile />
            <LoadingSection />
            <LoadingSection />
            <LoadingSection />
            <LoadingSection />
          </View>
        ) : (
          <Text title="loaded" />
        )}
      </ScrollView>
    </Screen>
  );
});

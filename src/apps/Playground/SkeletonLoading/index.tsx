import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Card, Screen, SkeletonLoader, Text} from '../../../components';
import {ScrollView} from '../../../conversions';
import {useColor} from '../../../hooks';
import {Config} from '../../../utils';

const LoadingProfile = () => {
  const color = useColor();
  const banner = Config.padding(24);

  return (
    <Card
      noPadding
      style={{
        marginBottom: Config.padding(4),
        paddingBottom: Config.padding(20),
      }}>
      <View
        style={{
          borderTopLeftRadius: Config.sizing.borderRadius,
          borderTopRightRadius: Config.sizing.borderRadius,
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
        <View style={{paddingVertical: Config.padding(4)}}>
          <SkeletonLoader
            borderRadius={0}
            height={Config.padding(6)}
            width={Config.padding(16) * 4}
          />
        </View>
        <SkeletonLoader
          borderRadius={0}
          height={Config.padding(6)}
          width={Config.padding(16) * 3}
        />
      </View>
    </Card>
  );
};

const LoadingSection = () => {
  return (
    <Card style={{marginBottom: Config.padding(4)}}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <SkeletonLoader
            borderRadius={Config.padding(24)}
            height={Config.padding(24)}
            width={Config.padding(24)}
          />
          <View
            style={{
              padding: Config.padding(4),
              justifyContent: 'space-between',
            }}>
            <SkeletonLoader
              borderRadius={0}
              height={Config.padding(6)}
              width={Config.padding(20)}
            />
            <SkeletonLoader
              borderRadius={0}
              height={Config.padding(6)}
              width={Config.padding(20) * 2}
            />
          </View>
        </View>
        <View style={{paddingVertical: Config.padding(4)}}>
          <SkeletonLoader
            borderRadius={0}
            height={Config.padding(6)}
            width={Config.padding(19) * 4}
          />
        </View>
        <View style={{paddingBottom: Config.padding(4)}}>
          <SkeletonLoader
            borderRadius={0}
            height={Config.padding(6)}
            width={Config.padding(21) * 4}
          />
        </View>
        <SkeletonLoader
          borderRadius={0}
          height={Config.padding(6)}
          width={Config.padding(20) * 4}
        />
      </View>
    </Card>
  );
};

export const SkeletonLoading = memo(function PlaygroundTemplate() {
  const {goBack} = useNavigation();
  const color = useColor();
  const navBack = useCallback(() => goBack(), [goBack]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const onRetry = useCallback(() => {
    setLoading(true);
    load();
  }, [load]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Screen dropShadow onLeftPress={navBack} title="Skeleton Loading">
      <ScrollView
        contentContainerStyle={{padding: Config.padding(4)}}
        style={{backgroundColor: color.surface}}>
        {loading ? (
          <View>
            <LoadingProfile />
            <LoadingSection />
            <LoadingSection />
            <LoadingSection />
            <LoadingSection />
          </View>
        ) : (
          <View>
            <Text center title="loaded" />
            <Button center onPress={onRetry} title="retry" />
          </View>
        )}
      </ScrollView>
    </Screen>
  );
});

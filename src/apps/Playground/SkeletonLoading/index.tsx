import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Card, Screen, SkeletonLoader, Text} from '../../../components';
import {ScrollView} from '../../../conversions';
import {useColor} from '../../../hooks';
import {padding} from '../../../utils';

const LoadingProfile = () => {
  const color = useColor();
  const banner = padding(24);

  return (
    <Card
      noPadding
      style={{
        marginBottom: padding(4),
        paddingBottom: padding(20),
      }}>
      <View
        style={{
          borderTopLeftRadius: padding(2),
          borderTopRightRadius: padding(2),
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
        <View style={{paddingVertical: padding(4)}}>
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

const LoadingSection = () => {
  return (
    <Card style={{marginBottom: padding(4)}}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <SkeletonLoader
            borderRadius={padding(24)}
            height={padding(24)}
            width={padding(24)}
          />
          <View
            style={{
              padding: padding(4),
              justifyContent: 'space-between',
            }}>
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
        <View style={{paddingVertical: padding(4)}}>
          <SkeletonLoader
            borderRadius={0}
            height={padding(6)}
            width={padding(19) * 4}
          />
        </View>
        <View style={{paddingBottom: padding(4)}}>
          <SkeletonLoader
            borderRadius={0}
            height={padding(6)}
            width={padding(21) * 4}
          />
        </View>
        <SkeletonLoader
          borderRadius={0}
          height={padding(6)}
          width={padding(20) * 4}
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
        contentContainerStyle={{padding: padding(4)}}
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

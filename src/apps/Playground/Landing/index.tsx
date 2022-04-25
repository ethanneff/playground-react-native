import { useNavigation } from '@react-navigation/native';
import React, { memo, ReactNode, useCallback } from 'react';
import { View } from 'react-native';
import {
  Card,
  FlatList,
  Screen,
  Text,
  TouchableOpacity,
} from '../../../components';
import { padding, useColors } from '../../../features';
import { PortfolioNavigation, PortfolioRoutes } from '../../Portfolio/types';
import { stackParams } from '../navParams';

const screens = Object.keys(stackParams);

type TitleProps = { title: string };

const Title = ({ title }: TitleProps) => {
  return (
    <>
      <Text emphasis="medium" title={title} type="h5" />
      <View style={{ padding: padding(1) }} />
    </>
  );
};

type RowProps = { children: ReactNode };
const Row = ({ children }: RowProps) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: padding(4),
      }}
    >
      {children}
    </View>
  );
};

export const Landing = memo(function Playground() {
  const colors = useColors();
  const { goBack, navigate } = useNavigation<PortfolioNavigation>();
  const navToItem = useCallback(
    (item: keyof PortfolioRoutes) => () => navigate(item),
    [navigate],
  );
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity key={item} onPress={navToItem(item)}>
        <View style={{ paddingVertical: padding(2) }}>
          <Text bold title={item} type="body2" />
        </View>
      </TouchableOpacity>
    ),
    [navToItem],
  );
  const keyExtractor = useCallback((item: string) => item, []);

  return (
    <Screen dropShadow onLeftPress={goBack} title="Playground">
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background.secondary,
          paddingVertical: padding(2),
        }}
      >
        <Row>
          <Card flex>
            <Title title="components" />

            <FlatList
              data={screens}
              keyExtractor={keyExtractor}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
            />
          </Card>
          <View style={{ padding: padding(2) }} />
          <Card flex>
            <Title title="features" />

            <FlatList
              data={screens}
              keyExtractor={keyExtractor}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
            />
          </Card>
        </Row>
        <Row>
          <Card flex>
            <Title title="games" />
            <FlatList
              data={screens}
              keyExtractor={keyExtractor}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
            />
          </Card>
          <View style={{ padding: padding(2) }} />
          <Card flex>
            <Title title="random" />
            <FlatList
              data={screens}
              keyExtractor={keyExtractor}
              keyboardShouldPersistTaps="handled"
              renderItem={renderItem}
            />
          </Card>
        </Row>
      </View>
    </Screen>
  );
});

import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useRef, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {
  Button,
  RecyclerFlatList,
  RecyclerFlatListRef,
  Screen,
  Text,
  TextInput,
} from '../../../components';
import {KeyboardAwareScrollView} from '../../../conversions';
import {
  ColorTheme,
  colorWithOpacity,
  padding,
  useColor,
} from '../../../features';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis pulvinar massa, a aliquet libero pellentesque id. Maecenas ut euismod ligula. Maecenas in odio id ex porttitor tempor sit amet tincidunt elit. Duis eu imperdiet augue. Suspendisse dignissim tempor nisi vitae lobortis. Morbi nec tempus massa, et vestibulum enim. Quisque tempus euismod leo, vel semper leo pellentesque vitae. Praesent semper rhoncus enim mattis auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet metus maximus, pharetra ligula ut, luctus tortor. Etiam ut congue tellus. Praesent turpis justo, egestas vitae arcu ut, condimentum eleifend sem. Suspendisse sit amet augue sed enim maximus sollicitudin ac vel risus. Maecenas eu dui euismod, aliquam nibh non, mattis diam. Donec accumsan id lorem eget porttitor. Pellentesque non placerat dolor. Pellentesque tincidunt, neque sed suscipit varius, odio augue lobortis eros, ac aliquet erat mauris sed dolor. Curabitur massa nulla, dapibus pharetra turpis sed, viverra lobortis risus. Nulla rhoncus ipsum eu tellus semper lacinia. Pellentesque sed odio sed tellus ultricies tincidunt sed sed ipsum. Nam sed tincidunt eros. Praesent fermentum metus nec risus finibus placerat. Vestibulum est leo, accumsan sit amet enim a, tempor pharetra neque. Etiam id diam nulla. Curabitur sit amet lacus cursus lacus finibus rutrum. Maecenas commodo mauris non dignissim efficitur. In dictum elit vitae neque cursus pharetra at non nisl. Donec luctus ornare purus, eget pellentesque tellus imperdiet id. Suspendisse mollis gravida arcu a volutpat. Aliquam laoreet varius arcu, non tempor elit ultricies vel. Integer commodo ante et nisi condimentum, in ullamcorper sapien mollis. Integer nec ipsum nunc. Integer posuere, erat ut gravida accumsan, mauris lacus varius erat, eget fermentum est ex id risus. Curabitur lectus diam, egestas ac nibh at, sagittis interdum justo. Praesent vel purus et felis ullamcorper porta eget sit amet nisi. Aliquam erat volutpat. Nam id justo ligula. Integer maximus convallis enim eget consequat. Duis eget nunc at augue convallis fermentum non nec massa. Etiam aliquet lorem non nibh finibus laoreet. Fusce dictum tincidunt augue id fermentum. Phasellus varius arcu leo, non euismod ex varius id. Integer et orci nunc. Nulla facilisi. Aliquam nec lectus nunc. Vestibulum sit amet convallis risus. Vestibulum laoreet, odio non cursus mattis, tortor mauris auctor ex, ac semper eros nunc in neque. Integer non sodales felis.';

type Data = {id: string; name: string; color: string};

const generateItems = (
  color: ColorTheme,
  n: number,
  min = 0.4,
  max = 0.6,
): Data[] => {
  const output = [];
  for (let i = 0; i < n; i++) {
    const random = Math.random() * (max - min) + min;
    output.push({
      id: String(i),
      name: String(i),
      color: colorWithOpacity(color.text.accent, random),
    });
  }
  return output;
};
export const KeyboardScroll = memo(function KeyboardScroll() {
  const {goBack} = useNavigation();
  const color = useColor();
  const [message, setMessage] = useState('');

  const width = Dimensions.get('window').width;
  const [loading, setLoading] = useState(false);
  const onEndReached = useCallback(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefetch = useCallback(() => {
    setRefreshing(true);
    const timeout = setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const onRowRender = useCallback((item: Data) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: item.color,
          marginBottom: padding(2),
        }}>
        <Text title={item.name} />
      </View>
    );
  }, []);

  const [data, setData] = useState<Data[]>(() => generateItems(color, 200000));

  const onChangeText = useCallback(v => {
    setMessage(v);
  }, []);

  const listRef = useRef<RecyclerFlatListRef>(null);

  const onSubmit = useCallback(() => {
    const date = Date.now().toString();
    setData(p => [...p, {id: date, name: date, color: color.text.accent}]);
    listRef.current?.scrollToEnd(true);
  }, [color.text.accent]);

  return (
    <Screen onLeftPress={goBack} title="Keyboard">
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text title={lorem} />
        <Text title="Header" type="h3" />
        <View
          style={{
            height: 200,
            backgroundColor: color.background.secondary,
            padding: padding(2),
          }}>
          <RecyclerFlatList
            data={data}
            itemHeight={40}
            itemWidth={width}
            loading={loading}
            onEndReached={onEndReached}
            onRef={listRef}
            onRefetch={onRefetch}
            onRowRender={onRowRender}
            refreshing={refreshing}
          />
        </View>
        <TextInput
          onChangeText={onChangeText}
          placeholder="Username"
          value={message}
        />
        <Button onPress={onSubmit} title="Submit" />
        <Text title={lorem} />
      </KeyboardAwareScrollView>
    </Screen>
  );
});

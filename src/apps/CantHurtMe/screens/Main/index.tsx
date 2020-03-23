import React, { memo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Card, Dialog, Screen, Icon } from '../../../../components';
import { getLandscapeOrientation } from '../../../../models';
import { Theme, useRootSelector } from '../../../../utils';
import { DailyProgress, Header, ProfileLevel } from '../../components';
import { app } from '../../data';
import { useNav } from '../../../../hooks';
import { Item } from './Item';

const initialState = { settings: false, profile: false };

export default memo(function CantHurtMeMain() {
  const [showModal, setShowModal] = useState(initialState);
  const landscape = useRootSelector(state => getLandscapeOrientation(state));
  const columns = landscape ? 4 : 2;
  const nav = useNav();
  const keyExtractor = (id: string) => app.goals.byId[id].id;

  const handleModalBackgroundPress = () => setShowModal(initialState);
  const handleProfilePress = () =>
    setShowModal({ ...initialState, profile: true });
  const handleSettingsPress = () =>
    setShowModal({ ...initialState, settings: true });

  return (
    <>
      <Screen
        border
        onLeftPress={nav.to('portfolioLanding')}
        title="Can't Hurt Me"
      >
        <View style={{ marginHorizontal: Theme.padding.p04 }}>
          <FlatList
            keyExtractor={keyExtractor}
            key={columns}
            data={app.goals.orderById}
            renderItem={Item}
            numColumns={columns}
            ListHeaderComponent={
              <View>
                <Header title="Progress" />
                <Card>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <ProfileLevel onPress={handleProfilePress} />
                    <Icon name="settings" onPress={handleSettingsPress} />
                  </View>
                  <DailyProgress />
                </Card>
                <Header title="Challenges" />
              </View>
            }
            ListFooterComponent={
              <View style={{ paddingBottom: Theme.padding.p04 }} />
            }
          />
        </View>
      </Screen>
      {showModal.profile && (
        <Dialog
          duration={2000}
          title="profile"
          onBackgroundPress={handleModalBackgroundPress}
        />
      )}
      {showModal.settings && (
        <Dialog
          title="settings"
          onBackgroundPress={handleModalBackgroundPress}
        />
      )}
    </>
  );
});

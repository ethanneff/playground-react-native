import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';

export const useAdminNavBack = () => {
  const { goBack } = useNavigation();
  const admin = Config.APP === 'admin' || __DEV__;

  const onLeftPress = admin ? goBack : undefined;

  return { admin, onLeftPress };
};

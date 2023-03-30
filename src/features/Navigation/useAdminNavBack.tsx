import Config from 'react-native-config';
import { useNavigation } from '../../conversions';

export const useAdminNavBack = () => {
  const { goBack } = useNavigation();
  const admin = Config.APP === 'admin' || __DEV__;

  const onLeftPress = admin ? goBack : undefined;

  return { admin, onLeftPress };
};

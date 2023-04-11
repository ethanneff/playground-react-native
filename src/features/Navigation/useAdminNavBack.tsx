import Config from 'react-native-config';
import { useNavigation } from '../../conversions';
import { Globals } from '../Config';

export const useAdminNavBack = () => {
  const { goBack } = useNavigation();
  const admin = Config.APP === 'admin' || Globals.environment === 'dev';

  const onLeftPress = admin ? goBack : undefined;

  return { admin, onLeftPress };
};

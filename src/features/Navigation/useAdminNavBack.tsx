import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';

type UseAdminNavBack = { onLeftPress: (() => void) | undefined };

export const useAdminNavBack = (): UseAdminNavBack => {
  const { goBack } = useNavigation();
  const admin = Config.APP === 'admin';

  const onLeftPress = admin ? goBack : undefined;
  return { onLeftPress };
};

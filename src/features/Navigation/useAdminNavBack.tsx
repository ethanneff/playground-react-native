import { useNavigation } from '@react-navigation/native';

export const useAdminNavBack = () => {
  const { goBack } = useNavigation();
  const admin = true; // Config.APP === 'admin';

  const onLeftPress = admin ? goBack : undefined;
  return { admin, onLeftPress };
};

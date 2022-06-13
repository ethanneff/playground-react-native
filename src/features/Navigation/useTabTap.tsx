import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { SoundManager } from '../Sound';

export const useTabTap = (): void => {
  // eslint-disable-next-line jest/unbound-method
  const { addListener } = useNavigation();
  useEffect(() => {
    return addListener('tabPress', () => {
      SoundManager.play('tap');
    });
  }, [addListener]);
};

import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { SoundManager } from '../Sound';

export const useTabTap = (): void => {
  const { addListener } = useNavigation();
  useEffect(() => {
    return addListener('tabPress', () => {
      SoundManager.play('tap');
    });
  }, [addListener]);
};

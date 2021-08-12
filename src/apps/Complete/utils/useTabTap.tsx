import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {SoundManager} from '../../../features';

export const useTabTap = (): void => {
  const {addListener} = useNavigation();
  useEffect(() => {
    const unsubscribe = addListener('tabPress', () => {
      SoundManager.play('tap');
    });
    return unsubscribe;
  }, [addListener]);
};

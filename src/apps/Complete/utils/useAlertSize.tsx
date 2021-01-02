import {useRootSelector} from '../../../utils';
import {config} from '../configs';

type UseAlertSize = {width: number; height: number};

export const useAlertSize = (): UseAlertSize => {
  const dimensions = useRootSelector((s) => s.dimension.screen);
  const width = dimensions.width * config.alert.width;
  const height = dimensions.height * config.alert.height;
  return {width, height};
};

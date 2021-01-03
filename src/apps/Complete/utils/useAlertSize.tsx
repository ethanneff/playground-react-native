import {useRootSelector} from '../../../utils';
import {config} from '../configs';

type UseAlertSize = {width: number; maxHeight: number};

export const useAlertSize = (): UseAlertSize => {
  const dimensions = useRootSelector((s) => s.dimension.screen);
  const width = dimensions.width * config.alert.width;
  const maxHeight = dimensions.height * config.alert.height;
  return {width, maxHeight};
};

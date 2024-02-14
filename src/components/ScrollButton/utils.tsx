import { type IconName } from '../Icon';

type Position = 'bottom' | 'left' | 'right' | 'top';

export const getIcon = (position: Position): IconName => {
  switch (position) {
    case 'bottom': {
      return 'chevron-down';
    }
    case 'top': {
      return 'chevron-up';
    }
    case 'left': {
      return 'chevron-left';
    }
    default: {
      return 'chevron-right';
    }
  }
};

export const getPlacement = (position: Position) => {
  switch (position) {
    case 'bottom': {
      return { bottom: 0 };
    }
    case 'top': {
      return { top: 0 };
    }
    case 'left': {
      return { left: 0 };
    }
    default: {
      return { right: 0 };
    }
  }
};

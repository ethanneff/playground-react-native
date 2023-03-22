import { type RootAction } from 'root-types';
import { type DeepReadonly } from 'ts-essentials';
import { createAction, getType } from 'typesafe-actions';
import { calendarUtils } from './calendarUtils';
import { daysOfWeek } from './constants';
import { type CalendarState } from './types';

// INTERFACES
type State = DeepReadonly<CalendarState>;

// ACTIONS
const nav = createAction('calendar/month/nav')<-1 | 0 | 1>();
const select = createAction('calendar/day/select')<Date>();
const init = createAction('calendar/init')();
export const calendarActions = { init, nav, select };

// CONSTANTS
const initialState: State = {
  activeMonth: calendarUtils.getFormat(new Date(), 'YYYY-MM'),
  days: {},
  loading: true,
  months: {},
};

// REDUCER
export const calendarReducer = (
  state: State = initialState,
  action: RootAction,
): State => {
  switch (action.type) {
    case getType(calendarActions.init): {
      const today = new Date();
      const key = calendarUtils.getFormat(today, 'YYYY-MM');
      const { days, months } = calendarUtils.getMonthAndDays(today);
      daysOfWeek.forEach((dayOfWeek) => {
        days[dayOfWeek] = {
          display: dayOfWeek,
          isHeader: true,
          isSelected: false,
          isWithinMonth: false,
          value: new Date(0),
        };
      });
      return { activeMonth: key, days, loading: false, months };
    }
    case getType(calendarActions.nav): {
      if (action.payload === 0) {
        const today = new Date();
        const key = calendarUtils.getFormat(today, 'YYYY-MM');
        return { ...state, activeMonth: key };
      }
      const nextMonth = calendarUtils.addMonths(
        state.activeMonth,
        action.payload,
      );
      const key = calendarUtils.getFormat(nextMonth, 'YYYY-MM');
      if (key in state.months) {
        return { ...state, activeMonth: key };
      }
      const { days, months } = calendarUtils.getMonthAndDays(nextMonth);
      return {
        ...state,
        activeMonth: key,
        days: { ...state.days, ...days },
        months: { ...state.months, ...months },
      };
    }
    case getType(calendarActions.select): {
      const key = calendarUtils.getFormat(action.payload, 'YYYY-MM-DD');
      return {
        ...state,
        days: {
          ...state.days,
          [key]: {
            ...state.days[key],
            isSelected: !state.days[key].isSelected,
          },
        },
      };
    }
    default:
      return state;
  }
};

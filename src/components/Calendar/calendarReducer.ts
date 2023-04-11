import { format } from 'date-fns';
import { type RootAction } from 'root-types';
import { type DeepReadonly } from 'ts-essentials';
import { createAction, getType } from 'typesafe-actions';
import { calendarUtils } from './calendarUtils';
import { daysOfWeek, keyOfDay, keyOfMonth } from './constants';
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
  activeMonth: new Date(),
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
      const { days, months } = calendarUtils.getMonthAndDays(today);
      daysOfWeek.forEach((dayOfWeek) => {
        days[dayOfWeek] = {
          display: dayOfWeek,
          isHeader: true,
          isSelected: false,
          value: new Date(0),
        };
      });
      return { activeMonth: today, days, loading: false, months };
    }
    case getType(calendarActions.nav): {
      if (action.payload === 0) {
        const today = new Date();
        return { ...state, activeMonth: today };
      }
      const nextMonth = calendarUtils.addMonths(
        state.activeMonth,
        action.payload,
      );
      const key = format(nextMonth, keyOfMonth);
      if (key in state.months) {
        return { ...state, activeMonth: nextMonth };
      }
      const { days, months } = calendarUtils.getMonthAndDays(nextMonth);
      return {
        ...state,
        activeMonth: nextMonth,
        days: { ...state.days, ...days },
        months: { ...state.months, ...months },
      };
    }
    case getType(calendarActions.select): {
      const key = format(action.payload, keyOfDay);
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

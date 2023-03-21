import { type RootAction } from 'root-types';
import { type DeepReadonly } from 'ts-essentials';
import { createAction, getType } from 'typesafe-actions';
import { calendarUtils } from './calendarUtils';
import { type CalendarState } from './types';

// INTERFACES
type State = DeepReadonly<CalendarState>;

// ACTIONS
const nav = createAction('calendar/month/nav')<-1 | 0 | 1>();
const select = createAction('calendar/day/select')<Date>();
const init = createAction('calendar/init')();
export const calendarActions = { init, nav, select };

// CONSTANTS
const day = new Date();
const initialState: State = {
  loading: true,
  months: {},
  selected: day,
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
      const month = calendarUtils.getMonthMatrix(today);
      return { loading: false, months: { [key]: month }, selected: today };
    }
    case getType(calendarActions.nav): {
      if (action.payload === 0) {
        const today = new Date();
        return { ...state, selected: today };
      }
      const newMonth = calendarUtils.addMonths(state.selected, action.payload);
      const key = calendarUtils.getFormat(newMonth, 'YYYY-MM');
      if (key in state.months) {
        return { ...state, selected: newMonth };
      }
      const month = calendarUtils.getMonthMatrix(newMonth);
      return {
        ...state,
        months: { ...state.months, [key]: month },
        selected: newMonth,
      };
    }
    case getType(calendarActions.select): {
      const monthKey = calendarUtils.getFormat(state.selected, 'YYYY-MM');
      const dayKey = calendarUtils.getFormat(action.payload, 'YYYY-MM-DD');
      const location = state.months[monthKey].indexDays[dayKey];
      const month = { ...state.months[monthKey], selected: location };
      // TODO: NOT WORKING
      month.days[location.row][location.col].isSelected = true;

      return { ...state, months: { ...state.months, [monthKey]: month } };
    }
    default:
      return state;
  }
};

import {RootAction} from 'root-types';
import {ActionType, createAction} from 'typesafe-actions';

/* ACTIONS */
export const createResponse = createAction('responses/CREATE')<Response>();
export const updateResponse = createAction('responses/UPDATE')<Response>();
export const removeResponse = createAction('responses/REMOVE')<string>();

/* INTERFACES */
interface Response {
  id: string;
  userId: string;
  responses: {[questionId: string]: readonly string[]};
  createdAt: string;
}

export interface Responses {
  [id: string]: Response;
}

export type ResponsesActions = ActionType<
  typeof createResponse | typeof updateResponse | typeof removeResponse
>;

/* REDUCERS */
const responsesInitialState = {};

export const responsesReducer = (
  state: Responses = responsesInitialState,
  action: RootAction,
): Responses => {
  switch (action.type) {
    default:
      return state;
  }
};

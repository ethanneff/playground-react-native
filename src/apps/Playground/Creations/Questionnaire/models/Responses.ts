import { RootAction } from 'root-types';
import { createAction } from 'typesafe-actions';

/* ACTIONS */
export const createResponse = createAction('responses/CREATE')<Response>();
export const updateResponse = createAction('responses/UPDATE')<Response>();
export const removeResponse = createAction('responses/REMOVE')<string>();
export const responsesActions = {
  createResponse,
  updateResponse,
  removeResponse,
};

/* INTERFACES */
interface Response {
  createdAt: string;
  id: string;
  responses: { [questionId: string]: string[] };
  userId: string;
}

export interface Responses {
  [id: string]: Response;
}

/* REDUCERS */
const responsesInitialState = {};

export const responsesReducer = (
  state: Responses = responsesInitialState,
  action: RootAction,
): Responses => {
  switch (action.type) {
    case 'responses/CREATE':
    case 'responses/UPDATE':
    case 'responses/REMOVE':
    default:
      return state;
  }
};

import { type RootAction } from 'root-types';
import { type DeepReadonly } from 'ts-essentials';
import { createAction } from 'typesafe-actions';

/* INTERFACES */
type Response = DeepReadonly<{
  createdAt: string;
  id: string;
  responses: Record<string, string[]>;
  userId: string;
}>;

type Responses = Record<string, Response>;

/* ACTIONS */
export const createResponse = createAction('responses/CREATE')<Response>();
export const updateResponse = createAction('responses/UPDATE')<Response>();
export const removeResponse = createAction('responses/REMOVE')<string>();
export const responsesActions = {
  createResponse,
  removeResponse,
  updateResponse,
};

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

import { ActionType, createStandardAction } from "typesafe-actions";
import { RootAction } from "../../../../../containers";

/* INTERFACES */
interface Response {
  id: string;
  userId: string;
  responses: { [questionId: string]: ReadonlyArray<string> };
  createdAt: string;
}

export interface Responses {
  [id: string]: Response;
}

export type ResponsesActions = ActionType<
  typeof createResponse | typeof updateResponse | typeof removeResponse
>;

/* ACTIONS */
export const createResponse = createStandardAction("responses/CREATE")<
  Response
>();
export const updateResponse = createStandardAction("responses/UPDATE")<
  Response
>();
export const removeResponse = createStandardAction("responses/REMOVE")<
  string
>();

/* REDUCERS */
const responsesInitialState = {};

export const responsesReducer = (
  state: Responses = responsesInitialState,
  action: RootAction
): Responses => {
  switch (action.type) {
    default:
      return state;
  }
};

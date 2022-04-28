import { createSelector } from 'reselect';
import { RootAction, RootState } from 'root-types';
import { createAction, getType } from 'typesafe-actions';

/* ACTIONS */
export const createChatMessage = createAction('chat/create')<Message>();
export const updateChatMessage = createAction('chat/update')<Message>();
export const deleteChatMessage = createAction('chat/delete')<string>();
export const typeChatMessage = createAction('chat/type')<string>();
export const chatMessageActions = {
  createChatMessage,
  updateChatMessage,
  deleteChatMessage,
  typeChatMessage,
};

/* SELECTORS */
export const getChatMessages = (state: RootState): Messages =>
  state.chatMessage.items;
export const getActiveChatMessagesOrderByCreatedAt = createSelector(
  [getChatMessages],
  (messages) =>
    Object.values(messages)
      .filter((item) => item.active)
      .sort((a, b) => b.createdAt - a.createdAt),
);

export const getChatSubmittable = (state: RootState): boolean =>
  state.chatMessage.textField.trim().length > 0;

/* INTERFACES */
export type ChatMessageReducer = {
  items: Messages;
  textField: string;
};
export type Message = {
  active: boolean;
  // history?: string[];
  // attachments?:string[]
  conversationId: string;
  createdAt: number;
  id: string;
  message: string;
  updatedAt: number;
  userId: string; // Need name and id
};
type Messages = { [key: string]: Message };

/* REDUCER */
const initialState: ChatMessageReducer = {
  textField: '',
  items: {},
};
export const chatMessageReducer = (
  state: ChatMessageReducer = initialState,
  action: RootAction,
): ChatMessageReducer => {
  switch (action.type) {
    case getType(typeChatMessage):
      return { ...state, textField: action.payload };
    case getType(createChatMessage):
      return {
        ...state,
        textField: '',
        items: {
          ...state.items,
          [action.payload.id]: action.payload,
        },
      };
    case getType(updateChatMessage):
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...state.items[action.payload.id],
            ...action.payload,
            updatedAt: Date.now(),
          },
        },
      };
    case getType(deleteChatMessage):
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            ...state.items[action.payload],
            active: false,
            updatedAt: Date.now(),
          },
        },
      };
    default:
      return state;
  }
};

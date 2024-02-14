import { createSelector } from 'reselect';
import { type RootAction, type RootState } from 'root-types';
import { createAction, getType } from 'typesafe-actions';

/* INTERFACES */
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
type Messages = Record<string, Message>;
type ChatMessageReducer = {
  active: string | null;
  items: Messages;
  textField: string;
};

/* ACTIONS */
export const createChatMessage = createAction('chat/create')<Message>();
export const updateChatMessage = createAction('chat/update')<Message>();
export const deleteChatMessage = createAction('chat/delete')<string>();
export const setActiveChatMessage = createAction('chat/active')<
  string | null
>();
export const typeChatMessage = createAction('chat/type')<string>();
export const chatMessageActions = {
  createChatMessage,
  deleteChatMessage,
  setActiveChatMessage,
  typeChatMessage,
  updateChatMessage,
};

/* SELECTORS */
const getChatMessages = (state: RootState): Messages => state.chatMessage.items;
export const getActiveChatMessagesOrderByCreatedAt = createSelector(
  [getChatMessages],
  (messages) =>
    Object.values(messages)
      .filter((item) => item.active)
      .sort((a, b) => b.createdAt - a.createdAt),
);

export const getChatSubmittable = (state: RootState): boolean =>
  state.chatMessage.textField.trim().length > 0;
export const getActiveChatMessage = (state: RootState): Message | null => {
  if (!state.chatMessage.active) return null;
  if (!(state.chatMessage.active in state.chatMessage.items)) return null;
  return state.chatMessage.items[state.chatMessage.active];
};

/* REDUCER */
const initialState: ChatMessageReducer = {
  active: null,
  items: {},
  textField: '',
};
export const chatMessageReducer = (
  state: ChatMessageReducer = initialState,
  action: RootAction,
): ChatMessageReducer => {
  switch (action.type) {
    case getType(setActiveChatMessage): {
      return { ...state, active: action.payload };
    }
    case getType(typeChatMessage): {
      return { ...state, textField: action.payload };
    }
    case getType(createChatMessage): {
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: action.payload,
        },
        textField: '',
      };
    }
    case getType(updateChatMessage): {
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
    }
    case getType(deleteChatMessage): {
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
    }
    default: {
      return state;
    }
  }
};

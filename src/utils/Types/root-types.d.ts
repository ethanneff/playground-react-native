declare module 'root-types' {
  import {ThunkAction} from 'redux-thunk';
  import {DeepReadonly} from 'utility-types';
  import {
    ChecklistItemReducer,
    ChecklistReducer,
    ItemActions,
    ListActions,
  } from '../../apps/Checklists/models';
  import {
    CompleteBoardActions,
    CompleteBoardReducer,
    CompleteItemActions,
    CompleteItemReducer,
    CompleteListActions,
    CompleteListReducer,
    CompleteUserActions,
    CompleteUserReducer,
  } from '../../apps/Complete/models';
  import {
    ChatMessageActions,
    ChatMessageReducer,
  } from '../../apps/Playground/Chat/Messages';
  import {
    Choices,
    ChoicesActions,
    Questionnaires,
    QuestionnairesActions,
    Questions,
    QuestionsActions,
    Responses,
    ResponsesActions,
  } from '../../apps/Playground/Questionnaire/models';
  import {
    AuthActions,
    AuthState,
    DeviceActions,
    DeviceState,
    DimensionActions,
    DimensionState,
    NetworkActions,
    NetworkState,
    Theme,
    ThemeActions,
  } from '../../models';

  export type RootState = DeepReadonly<{
    auth: AuthState;
    dimension: DimensionState;
    device: DeviceState;
    checklistItem: ChecklistItemReducer;
    checklist: ChecklistReducer;
    chatMessage: ChatMessageReducer;
    network: NetworkState;
    questions: Questions;
    choices: Choices;
    responses: Responses;
    questionnaires: Questionnaires;
    theme: Theme;
    completeItem: CompleteItemReducer;
    completeList: CompleteListReducer;
    completeBoard: CompleteBoardReducer;
    completeUser: CompleteUserReducer;
  }>;

  export type RootAction =
    | DimensionActions
    | DeviceActions
    | AuthActions
    | ChatMessageActions
    | ListActions
    | ItemActions
    | NetworkActions
    | QuestionnairesActions
    | QuestionsActions
    | ChoicesActions
    | ResponsesActions
    | ThemeActions
    | ItemActions
    | CompleteItemActions
    | CompleteListActions
    | CompleteBoardActions
    | CompleteUserActions;

  export type RootThunkAction<R> = ThunkAction<R, RootState, any, RootAction>;
}

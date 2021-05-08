import { ActionReducerMap } from '@ngrx/store';

import * as fromNotes from '../home/store/notes.reducer';

export interface AppState {
  notes: fromNotes.State;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  notes: fromNotes.noteReducer,
};

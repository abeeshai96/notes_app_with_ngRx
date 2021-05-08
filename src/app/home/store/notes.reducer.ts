import { Note } from '../note.model';

import * as NotesActions from './notes.actions';

export interface State {
  notes: Note[];
}

const initialState: State = {
  notes: [],
};

export function noteReducer(
  state = initialState,
  action: NotesActions.NotesActions
) {
  switch (action.type) {
    case NotesActions.SET_NOTES:
      return {
        ...state,
        notes: [...action.payload],
      };
    case NotesActions.ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case NotesActions.UPDATE_NOTE:
      const updatedNote = {
        ...state.notes[action.payload.index],
        ...action.payload.newNote,
      };

      const updatedNotes = [...state.notes];
      updatedNotes[action.payload.index] = updatedNote;

      return {
        ...state,
        notes: updatedNotes,
      };
    case NotesActions.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note, index) => {
          return index !== action.payload;
        }),
      };
    default:
      return state;
  }
}

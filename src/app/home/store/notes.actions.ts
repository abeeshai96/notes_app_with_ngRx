import { Action } from '@ngrx/store';

import { Note } from '../note.model';

export const SET_NOTES = '[Notes] Set Notes';
export const FETCH_NOTES = '[Notes] Fetch Notes';
export const ADD_NOTE = '[Notes] Add Note';
export const UPDATE_NOTE = '[Notes] Update Note';
export const DELETE_NOTE = '[Notes] Delete Note';
export const STORE_NOTES = '[Notes] Store Notes';

export class SetNotes implements Action {
  readonly type = SET_NOTES;

  constructor(public payload: Note[]) {}
}

export class FetchNotes implements Action {
  readonly type = FETCH_NOTES;
}

export class AddNote implements Action {
  readonly type = ADD_NOTE;

  constructor(public payload: Note) {}
}

export class UpdateNote implements Action {
  readonly type = UPDATE_NOTE;

  constructor(public payload: { index: number; newNote: Note }) {}
}

export class DeleteNote implements Action {
  readonly type = DELETE_NOTE;

  constructor(public payload: number) {}
}

export class StoreNotes implements Action {
  readonly type = STORE_NOTES;
}

export type NotesActions =
  | SetNotes
  | FetchNotes
  | AddNote
  | UpdateNote
  | DeleteNote
  | StoreNotes;

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as NotesActions from './notes.actions';
import { Note } from '../note.model';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class NotesEffects {
  fetchNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.FETCH_NOTES),
      switchMap(() => {
        return this.http.get<Note[]>(
          'https://notes-app-angular-poc-default-rtdb.firebaseio.com/notes.json'
        );
      }),
      map((notes) => {
        return notes.map((note) => {
          return {
            ...note,
          };
        });
      }),
      map((notes) => {
        return new NotesActions.SetNotes(notes);
      })
    )
  );

  storeNotes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NotesActions.STORE_NOTES, NotesActions.DELETE_NOTE),
        withLatestFrom(this.store.select('notes')),
        switchMap(([actionData, notesState]) => {
          return this.http.put(
            'https://notes-app-angular-poc-default-rtdb.firebaseio.com/notes.json',
            notesState.notes
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}

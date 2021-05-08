import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Note } from './note.model';
import * as fromApp from '../store/app.reducer';
import * as NotesActions from '../home/store/notes.actions';

@Injectable({
  providedIn: 'root',
})
export class NotesResolverService implements Resolve<Note[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('notes').pipe(
      take(1),
      map((notesState) => {
        return notesState.notes;
      }),
      switchMap((notes) => {
        if (notes.length === 0) {
          this.store.dispatch(new NotesActions.FetchNotes());
          return this.actions$.pipe(ofType(NotesActions.SET_NOTES), take(1));
        } else {
          return of(notes);
        }
      })
    );
  }
}

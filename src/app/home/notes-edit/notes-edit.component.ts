import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Note } from '../note.model';
import * as fromApp from '../../store/app.reducer';
import * as NotesActions from '../store/notes.actions';

@Component({
  selector: 'app-notes-edit',
  templateUrl: './notes-edit.component.html',
  styleUrls: ['./notes-edit.component.css'],
})
export class NotesEditComponent implements OnInit, AfterViewInit, OnDestroy {
  id: number;
  note: any;
  editMode = false;
  formEditFlag = false;

  private storeSub: Subscription;

  @ViewChild('f', { static: false }) notesForm: NgForm;
  defaultType = 'personal';
  defaultPriority = 'medium';
  types = ['personal', 'office', 'misc'];
  priorities = ['low', 'medium', 'high'];
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.storeSub = this.store
        .select('notes')
        .pipe(
          map((noteState) => {
            return noteState.notes.find((note, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe((note) => {
          console.log(note);
          this.note = note;
        });
    });
  }

  ngAfterViewInit() {
    this.initForm();
  }

  onSubmit() {
    this.submitted = true;
    const formValue = this.notesForm.value;
    const newNote = new Note(
      formValue.title,
      formValue.description,
      formValue.date,
      formValue.type,
      formValue.priority
    );

    if (this.editMode) {
      if (this.formChanged()) {
        this.formEditFlag = false;
        this.store.dispatch(
          new NotesActions.UpdateNote({ index: this.id, newNote: newNote })
        );
        this.toastr.info('Updated the note successfully!');
        this.store.dispatch(new NotesActions.StoreNotes());

        this.onCancel();
      } else {
        this.formEditFlag = true;
      }
    } else {
      this.store.dispatch(new NotesActions.AddNote(newNote));
      this.toastr.success('Added the note successfully!');
      this.store.dispatch(new NotesActions.StoreNotes());
      this.onCancel();
    }
  }

  onCancel() {
    this.notesForm.reset();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  initForm() {
    if (this.editMode) {
      setTimeout(() => {
        this.notesForm.setValue({
          title: this.note.title,
          description: this.note.description,
          date: this.note.date,
          type: this.note.type,
          priority: this.note.priority,
        });
      });
    }
  }

  formChanged() {
    if (
      this.note.title === this.notesForm.form.value.title &&
      this.note.description === this.notesForm.form.value.description &&
      this.note.date === this.notesForm.form.value.date &&
      this.note.type === this.notesForm.form.value.type &&
      this.note.priority === this.notesForm.form.value.priority
    ) {
      return false;
    } else {
      return true;
    }
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}

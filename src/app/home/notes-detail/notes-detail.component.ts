import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Note } from '../note.model';
import * as fromApp from '../../store/app.reducer';
import * as NotesActions from '../store/notes.actions';

@Component({
  selector: 'app-notes-detail',
  templateUrl: './notes-detail.component.html',
  styleUrls: ['./notes-detail.component.css'],
})
export class NotesDetailComponent implements OnInit {
  modalRef: BsModalRef;
  note: any;
  id: number;

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('notes');
        }),
        map((notesState) => {
          console.log('Note State', notesState);
          return notesState.notes.find((note, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe((note) => {
        console.log(note);
        this.note = note;
      });
  }

  onEditNote() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onConfirmBox(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onDeleteNote() {
    this.modalRef.hide();
    this.store.dispatch(new NotesActions.DeleteNote(this.id));
    this.toastr.error('Deleted the note successfully!');
    this.router.navigate(['/notes']);
  }
}

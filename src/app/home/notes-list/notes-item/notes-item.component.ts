import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../../note.model';

@Component({
  selector: 'app-notes-item',
  templateUrl: './notes-item.component.html',
  styleUrls: ['./notes-item.component.css'],
})
export class NotesItemComponent implements OnInit {
  @Input() note: Note;
  @Input() index: number;

  constructor() {}

  ngOnInit(): void {}
}

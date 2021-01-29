import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.styl']
})
export class TrashComponent implements OnInit {
  notes: Note[]

  constructor(
    public notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.notesService.ReadNote();
    this.notes = this.notesService.trash
  }

  empty(){
    this.notes = [];
    this.notesService.trash = this.notes;
    localStorage.setItem('trash', JSON.stringify(this.notes))
  }

}

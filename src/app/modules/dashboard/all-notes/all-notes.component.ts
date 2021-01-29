import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.styl']
})
export class AllNotesComponent implements OnInit {
  notes: Note[]

  constructor(
    public notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.notesService.ReadNote();
    this.notes = this.notesService.notes
  }

}

import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.styl']
})
export class AllNotesComponent implements OnInit {
  search: string

  constructor(
    public notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.notesService.listNotes();
  }

  searchNote(){
    this.notesService.listNotes();
    if(this.search){
      this.notesService.notes = this.notesService.notes.filter((e)=> e.title.indexOf(this.search) == 0 || e.text.indexOf(this.search) == 0 )
    }
  }

}

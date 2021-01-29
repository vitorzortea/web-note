import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.styl']
})
export class NoteComponent implements OnInit {

  note: Note
  id: string

  constructor(
    public noteService: NotesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    (this.id) ? this.note = this.noteService.notes[this.id] : this.note = {title: '', resume: '', text: '', date: new Date()}
    console.log('Note select', this.id)
  }

  send(){
    (this.id)
      ? this.noteService.updateNote(this.id, this.note)
      : this.noteService.createNote(this.note)
  }

}

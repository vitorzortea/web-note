import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { User } from 'src/app/models/user.model';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.styl']
})
export class TrashComponent implements OnInit {

  constructor(
    public notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.notesService.listNotes();
  }

  empty(){
    const user = JSON.parse(localStorage.getItem('user')) as User
    this.notesService.trash = [];
    this.notesService.allTrash.filter((e)=>e.idUser !== user.id);
    localStorage.setItem('trash', JSON.stringify(this.notesService.allTrash))
  }

}

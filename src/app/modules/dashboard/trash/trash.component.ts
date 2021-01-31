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
  search: string

  constructor(
    public notesService: NotesService
  ) { }

  ngOnInit(): void { this.notesService.trash = this.notesService.listTrash() }

  empty(){
    const user = JSON.parse(localStorage.getItem('user')) as User
    const allTrash = JSON.parse(localStorage.getItem('trash')) as Note[]
    const newTrash = allTrash.filter((e)=>e.idUser.some((eSome)=> eSome == user.id));
    this.notesService.trash = [];
    localStorage.setItem('trash', JSON.stringify(newTrash))
  }

  searchNote(){
    this.notesService.trash = this.notesService.listTrash();
    if(this.search){
      this.notesService.trash = this.notesService.trash.filter((e)=> e.title.indexOf(this.search) == 0 || e.text.indexOf(this.search) == 0 )
    }
  }

}

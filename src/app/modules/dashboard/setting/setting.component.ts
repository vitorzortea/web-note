import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { User } from 'src/app/models/user.model';
import { NotesService } from 'src/app/service/notes.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.styl']
})
export class SettingComponent implements OnInit {
  users = JSON.parse(localStorage.getItem('users')) as User[];
  user = JSON.parse(localStorage.getItem('user')) as User;
  indexUser = this.users.findIndex((e)=> e.id === this.user.id)
  nameTag: string;
  notesImport = '';

  constructor(
    public userService: UserService,
    public noteService: NotesService
  ){ }

  ngOnInit(): void {}

  public importNotes(fileList: FileList): void {
    const file = fileList[0]
    const fileReader: FileReader = new FileReader()
    const self = this
    fileReader.onloadend = function(x) {
      self.notesImport = fileReader.result as string
      const myNotes = JSON.parse(self.notesImport) as Note[]
      myNotes.map(e=>{ self.noteService.createNote(e, true) })
      alert("All notes successfully imported")
    }
    fileReader.readAsText(file)
  }
  exportAllNotes(){
    this.noteService.listNotes()
    const allNotes = JSON.parse(localStorage.getItem('notes')) as Note[]
    const myNotes = allNotes.map((e)=>{ if(e.idUser == this.user.id){ return e } })

    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(myNotes, null, 2)], {type: "text/plain"}));
    a.setAttribute("download", "My Notes.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  createTags(){
    this.users[this.indexUser].tags.push(this.nameTag);
    this.user.tags.push(this.nameTag);
    localStorage.setItem('users', JSON.stringify(this.users))
    localStorage.setItem('user', JSON.stringify(this.user))
    this.nameTag = '';
    this.userService.user = this.userService.getUser()
  }

  deleteTag(index){
    alert('aqui')
    this.users[this.indexUser].tags.splice(index,1)
    this.user.tags.splice(index,1)
    localStorage.setItem('users', JSON.stringify(this.users))
    localStorage.setItem('user', JSON.stringify(this.user))
    this.userService.user = this.userService.getUser()
  }

}

import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/service/notes.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.styl']
})
export class SettingComponent implements OnInit {
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
    this.userService.setLogin()
    const myNotes = this.noteService.allNotes.map((e)=>{ if(e.idUser == this.userService.user.id){ return e } })

    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(myNotes, null, 2)], {type: "text/plain"}));
    a.setAttribute("download", "My Notes.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

}

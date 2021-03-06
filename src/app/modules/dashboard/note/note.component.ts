import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jsPDF } from "jspdf";
import { Subscription } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import { User } from 'src/app/models/user.model';
import { NotesService } from 'src/app/service/notes.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.styl']
})
export class NoteComponent implements OnInit {

  note: Note
  users: User[]
  user: User
  usercheck: boolean[]
  id: string
  subscription: Subscription
  keyTap = false

  constructor(
    public noteService: NotesService,
    public userService: UserService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    this.subscription = route.params.subscribe(val => {
      this.id = val.id;
      (this.id) ? this.note = this.noteService.getNote(this.id) :  this.note = new Note
    });
  }
  ngOnInit(): void {}

  updateList(){ this.noteService.notes = this.noteService.listNotes() }

  send() {
    if (this.id) {
      this.noteService.updateNote(this.id, this.note)
    } else {
      this.note.date = new Date
      this.noteService.createNote(this.note)
      this.router.navigate(['/dashboard/notes/'])
    }
    this.updateList();
  }

  trash() {
    this.noteService.sendToTrash(this.id)
    this.updateList()
    this.router.navigate(['/dashboard/notes/'])
  }

  savePDF() {
    const doc = new jsPDF('landscape', 'pt', 'a4', true );
    const box = document.querySelector('#pdf') as HTMLElement;
    box.innerHTML = `
      <h1 style="font-size: 1.3em; margin-bottom: 0.5em">${this.note.title}</h1>
      <p style="font-size: .82em; line-height: 1.5em; margin-bottom: 1em">${this.note.text.replace(/\r?\n/g, '</p><p style="font-size: .82em; line-height: 1.5em; margin-bottom: 1em">')}</p>
    `
    doc.html(box, {
      callback: function (doc) {
        doc.save();
        box.innerHTML = ``
      },
      x: 10,
      y: 10,
      filename: this.note.title
   });
  }

  print(){ window.print(); }

  export(){
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(['['+JSON.stringify(this.note, null, 2)+']'], {type: "text/plain"}));
    a.setAttribute("download", this.note.title+".txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  changeKey(){
    this.keyTap = !this.keyTap
    this.users = this.userService.getUsers()
    this.user = this.userService.getUser();
    this.usercheck = this.users.map((eMap, i)=>{
      return (this.note.idUser.some(eSome => eSome === eMap.id)) ? true : false
    })
  }
  sharedUser(){
    this.note.idUser = []
    this.usercheck.forEach((e,i)=>{
      if(e){ this.note.idUser.push(this.users[i].id) }
    })
    this.noteService.updateNote(this.id, this.note, true)
  }

  ngOnDestroy() { this.subscription.unsubscribe() }
}
